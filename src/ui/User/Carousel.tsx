"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type Props = {
  images: string[];
};

const CarouselImages = ({ images }: Props) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {Array.from({ length: images.length }).map((_, index) => (
          <CarouselItem key={index}>
            <Image
              src={images[index]}
              alt={`Image ${index + 1}`}
              width={1000}
              height={1000}
              className="rounded-lg object-cover w-full h-[300px] md:h-[400px] lg:h-[500px]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselImages;
