import { Button } from "@/components";
import { cn } from "@/lib";
import { ProductTable } from "@/lib/database/types";
import { Edit, ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";

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
          <Button className="w-6 h-6 p-1 bg-destructive">
            <Edit className="w-4 h-4" />
          </Button>
          <Button className="w-6 h-6 p-1 bg-primary">
            <Trash className="w-4 h-4" />
          </Button>
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
