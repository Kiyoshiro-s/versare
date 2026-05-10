"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
  interval?: number;
};

export default function AnimatedIcon({
  images,
  alt,
  interval = 500,
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <Image
      src={images[index]}
      alt={alt}
      width={48}
      height={48}
    />
  );
}
