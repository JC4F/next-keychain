"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { ScrollArea, ScrollBar } from "@/components";
import { UploadDropzone } from "@uploadthing/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ProductImage } from "./product-image";

type ImageWrapperProps = {
  mainImage: string;
  images: string[];
  setMainImage: Dispatch<SetStateAction<string>>;
  setImages: Dispatch<SetStateAction<string[]>>;
};

export const ImageWrapper = ({
  images,
  mainImage,
  setImages,
  setMainImage,
}: ImageWrapperProps) => {
  const onDeleteImage = (url: string) => {
    if (mainImage === url) setMainImage("");
    setImages((prev) => prev.filter((image) => image !== url));
  };

  useEffect(() => {
    if (images.length > 0 && !mainImage) {
      setMainImage(images[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, mainImage]);

  return (
    <>
      <UploadDropzone<OurFileRouter, keyof OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          const images = res.map((file) => file.url);
          setImages((prev) => [...prev, ...images]);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name);
        }}
        onDrop={(acceptedFiles) => {
          // Do something with the accepted files
          console.log("Accepted files: ", acceptedFiles);
        }}
      />
      <ScrollArea className="w-full rounded-md mt-2">
        <div className="flex items-center lg:gap-6 ">
          {images.map((image) => (
            <div key={image} className="w-[200px]">
              <ProductImage
                url={image}
                isMainImage={image === mainImage}
                onChoseMainImage={setMainImage}
                onDelete={onDeleteImage}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};
