import Image from "next/image";

type ProductImageProps = {
  url: string;
  isMainImage?: boolean;
  onChoseMainImage?: (url: string) => void;
  onDelete?: (url: string) => void;
};

export const ProductImage = ({
  url,
  onChoseMainImage,
  onDelete,
}: ProductImageProps) => {
  return (
    <div className="overflow-hidden w-full aspect-square rounded-md">
      <Image
        src={url}
        alt={"Product Image"}
        className="h-auto w-full object-cover transition-all hover:scale-105 aspect-square"
        width={150}
        height={150}
      />
    </div>
  );
};
