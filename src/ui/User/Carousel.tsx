"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
};

const CarouselImages = ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imageHeight = "h-[400px] md:h-[400px] lg:h-[500px]";

  return (
    <div>
      {/* Carrusel con shadcn/ui */}
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div onClick={() => setSelectedImage(image)}>
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={1000}
                  height={1000}
                  className={`rounded-lg object-cover w-full ${imageHeight} cursor-pointer`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Diálogo modal personalizado */}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            style={{
              maxWidth: "98vw",
              maxHeight: "98vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Image
              src={selectedImage}
              alt="Imagen ampliada"
              width={1920}
              height={1080}
              style={{
                maxWidth: "98vw",
                maxHeight: "98vh",
                objectFit: "contain",
                borderRadius: "0.5rem",
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              }}
              onClick={(e) => e.stopPropagation()}
              priority
            />
            {/* Botón de cerrar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "2.5rem",
                height: "2.5rem",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0.5rem",
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselImages;
