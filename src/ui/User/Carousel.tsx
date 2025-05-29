"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
};

const enhanceCloudinaryURL = (url: string): string => {
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return url;

  const prefix = url.slice(0, uploadIndex + 8);
  const suffix = url.slice(uploadIndex + 8);

  // Establece una relación de aspecto constante y calidad
  return `${prefix}c_fill,w_1600,h_900,f_auto,q_auto/${suffix}`;
};

const CarouselImages = ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Cierra modal con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div>
      {/* Carrusel */}
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => {
            const optimizedImage = enhanceCloudinaryURL(image);
            return (
              <CarouselItem key={index}>
                <div
                  onClick={() => setSelectedImage(optimizedImage)}
                  className="relative w-full aspect-[16/9] cursor-pointer"
                >
                  <Image
                    src={optimizedImage}
                    alt={`Imagen ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full rounded-lg hover:brightness-75 transition-all"
                    priority
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Modal de imagen ampliada */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-[98vw] max-h-[98vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Imagen ampliada"
              width={1600}
              height={900}
              className="max-w-[98vw] max-h-[100vh] object-contain rounded-lg shadow-xl"
              priority
            />

            {/* Botón de cierre */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 text-2xl flex items-center justify-center"
              aria-label="Cerrar imagen"
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
