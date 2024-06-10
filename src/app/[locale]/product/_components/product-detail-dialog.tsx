"use client";

import { createCard } from "@/actions";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
} from "@/components";
import { useGlobalStore, useModalLayer1 } from "@/hooks";
import { cn } from "@/lib";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ProductDetailDialog = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { product },
  } = useModalLayer1();
  const [hoverImage, setHoverImage] = useState(product?.mainImage!);
  const [quantity, setQuantity] = useState(1);
  const [isSubmit, setIsSubmit] = useState(false);
  const {
    data: { user },
  } = useGlobalStore();

  useEffect(() => {
    setHoverImage(product?.mainImage!);
    setQuantity(1);
    setIsSubmit(false);
  }, [product]);

  const isModalOpen = isOpen && type === "product-detail";

  if (!product) return <></>;

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You need to login to add product to card");
      return;
    }

    const data = {
      userId: user.id,
      productId: product.id,
      quantity,
    };

    setIsSubmit(true);
    const result = await createCard(data);
    setIsSubmit(false);

    if (result.isSuccess) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-[800px] max-h-[80vh] gap-6 overflow-x-hidden overflow-y-auto`}
      >
        <DialogHeader>
          <DialogTitle>Product Detail</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-5 gap-4">
          <div className="col-span-3">
            <div className="w-full overflow-hidden mb-4">
              <Image
                src={hoverImage}
                alt={"Product Image"}
                className="h-auto w-full object-cover transition-all hover:scale-105 rounded aspect-square"
                width={500}
                height={500}
              />
            </div>
            <Carousel>
              <CarouselContent className="-ml-1 gap-3">
                {product.images.map((image, index) => (
                  <CarouselItem
                    key={image}
                    className={cn(
                      "p-0 md:basis-1/3 lg:basis-1/5 relative",
                      image === hoverImage &&
                        "after:content-[''] after:block after:h-full after:w-full after:top-0 after:shadow-[inset_0px_0px_9px_4px_#ecc94b] after:z-10 after:absolute"
                    )}
                    onMouseEnter={() => setHoverImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`image${index}`}
                      className="object-cover w-full h-full aspect-square rounded"
                      width={300}
                      height={300}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <CarouselPrevious />
              <CarouselNext /> */}
            </Carousel>
          </div>

          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-500 mb-3">{product.description}</p>
            <div className="flex items-center gap-2 px-5 py-4 bg-secondary mb-4">
              <span className="text-lg font-semibold text-destructive">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500">
                - {product.quantity} In stock
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-500">Quantity:</span>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
                className="w-16 h-8 px-2 border rounded-md flex-1"
              />
            </div>
            {user && (
              <Button
                className="ml-auto block"
                disabled={isSubmit}
                onClick={handleSubmit}
              >
                Add to card
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
