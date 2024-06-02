import { Button } from "@/components";
import { cn } from "@/lib";
import { ProductTable } from "@/lib/database/types";
import { ShoppingCart } from "lucide-react";
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
      <div className="overflow-hidden w-full aspect-square rounded-md">
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
      </div>
      <div className="my-1">
        <div className="flex items-center justify-between gap-1">
          <div className="w-full">
            <h3 className="font-medium leading-none truncate">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground">${product.price}</p>
          </div>
          <Button variant={"destructive"} size={"sm"}>
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
