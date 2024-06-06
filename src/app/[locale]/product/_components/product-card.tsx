"use client";

import { deleteProduct } from "@/actions";
import { Button } from "@/components";
import { ROLE } from "@/constants";
import { useGlobalStore, useModalLayer2 } from "@/hooks";
import { cn } from "@/lib";
import { ProductTable } from "@/lib/database/types";
import { Edit, ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type ProductCardProps = {
  product: ProductTable;
  width: number;
  height: number;
  aspectRatio?: "portrait" | "square";
};

export const ProductCard = ({
  product,
  aspectRatio = "square",
  height,
  width,
}: ProductCardProps) => {
  const router = useRouter();
  const { onOpen } = useModalLayer2();
  const {
    data: { user },
  } = useGlobalStore();

  const confirmDelete = async () => {
    const result = await deleteProduct(product.id as string);

    if (result.isSuccess) {
      toast.success(result.message);

      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div>
      <div className="overflow-hidden w-full aspect-square rounded-md relative">
        <Image
          src={product.mainImage}
          alt={product.title}
          width={width}
          height={height}
          className={cn(
            "h-auto w-full object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
        <div className="absolute top-1 right-1 flex items-center gap-2">
          {user?.role === ROLE.ADMIN && (
            <>
              <Button
                className="w-8 h-8 p-1 bg-destructive"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <Edit className="w-6 h-6" />
              </Button>
              <Button
                className="w-8 h-8 p-1 bg-primary"
                onClick={() => {
                  onOpen("confirm", {
                    confirmDialog: {
                      title: "Confirm delete Product",
                      description: `This action will delete ${product.title}`,
                      onConfirm: confirmDelete,
                    },
                  });
                }}
              >
                <Trash className="w-6 h-6" />
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center justify-between gap-1">
          <div className="w-[calc(100%-36px)]">
            <h3 className="mb-1 font-medium leading-none truncate">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground">${product.price}</p>
          </div>
          <Button variant="ghost" className="w-8 h-8 p-2" size={"sm"}>
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
