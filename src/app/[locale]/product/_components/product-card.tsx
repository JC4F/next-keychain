"use client";

import { deleteProduct } from "@/actions";
import { BackgroundGradient, Button } from "@/components";
import { ROLE } from "@/constants";
import { useGlobalStore, useModalLayer1, useModalLayer2 } from "@/hooks";
import { cn } from "@/lib";
import { ProductTable } from "@/lib/database/types";
import { Edit, Trash } from "lucide-react";
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
  aspectRatio = "portrait",
  height,
  width,
}: ProductCardProps) => {
  const router = useRouter();
  const { onOpen: onOpenModalV1 } = useModalLayer1();
  const { onOpen: onOpenModalV2 } = useModalLayer2();
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
    <div
      className="cursor-pointer"
      onClick={() => {
        onOpenModalV1("product-detail", { product });
      }}
    >
      <BackgroundGradient
        className="relative rounded-[22px] max-w-sm p-4 bg-white dark:bg-zinc-900"
        animate
      >
        <Image
          src={product.mainImage}
          alt={product.title}
          width={width}
          height={height}
          className={cn(
            "h-auto rounded w-full object-cover",
            aspectRatio === "portrait" ? "aspect-[4/3]" : "aspect-square"
          )}
        />
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {user?.role === ROLE.ADMIN && (
            <>
              <Button
                className="w-7 h-7 p-1 bg-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/product/${product.id}`);
                }}
              >
                <Edit className="w-5 h-5" />
              </Button>
              <Button
                className="w-7 h-7 p-1 bg-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModalV2("confirm", {
                    confirmDialog: {
                      title: "Confirm delete Product",
                      description: `This action will delete ${product.title}`,
                      onConfirm: confirmDelete,
                    },
                  });
                }}
              >
                <Trash className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {product.title}
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {product.description}
        </p>
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Buy now </span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            ${product.price}
          </span>
        </button>
      </BackgroundGradient>
    </div>
  );
};
