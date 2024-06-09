import { Button } from "@/components";
import { cn } from "@/lib";
import { Trash } from "lucide-react";
import Image from "next/image";

type ProductImageProps = {
  url: string;
  isMainImage: boolean;
  onChoseMainImage: (url: string) => void;
  onDelete: (url: string) => void;
};

export const ProductImage = ({
  url,
  isMainImage,
  onChoseMainImage,
  onDelete,
}: ProductImageProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden w-full aspect-square rounded-md relative cursor-pointer",
        isMainImage &&
          "after:content-[''] after:block after:h-full after:w-full after:top-0 after:shadow-[inset_0px_0px_9px_4px_#ecc94b] after:z-10 after:absolute"
      )}
      onClick={() => onChoseMainImage(url)}
    >
      <Image
        src={url}
        alt={"Product Image"}
        className="h-auto w-full object-cover transition-all hover:scale-105 aspect-square"
        width={150}
        height={150}
      />
      <Button
        className="w-8 h-8 p-1 bg-destructive absolute top-1 right-1 z-20"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(url);
        }}
      >
        <Trash className="w-6 h-6" />
      </Button>
    </div>
  );
};
