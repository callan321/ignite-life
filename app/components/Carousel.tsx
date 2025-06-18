import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

type CarouselItem = {
  src: string;
  alt: string;
};

export default function Carousel({ items }: { items: CarouselItem[] }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearAndStartInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 3000);
  };

  useEffect(() => {
    clearAndStartInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const next = () => {
    setCurrent((prev) => (prev + 1) % items.length);
    clearAndStartInterval();
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
    clearAndStartInterval();
  };

  return (
    <div className="container-content-sm">
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {/* Left Chevron Button */}
          <button
            className="absolute -left-6 rounded-full bg-gray-800 p-3 text-white shadow-md transition hover:bg-gray-700 focus:outline-none"
            onClick={prev}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div className="max-w-lg">
            <img
              className="rounded-4xl shadow-2xl"
              src={items[current].src}
              alt={items[current].alt}
            />
            <p className="text-body mt-2 text-center">{items[current].alt}</p>
          </div>
          {/* Right Chevron Button */}
          <button
            className="absolute -right-6 rounded-full bg-gray-800 p-3 text-white shadow-md transition hover:bg-gray-700 focus:outline-none"
            onClick={next}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
        {/* Dots Navigation */}
        <div className="mt-4 flex justify-center space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-4 w-4 rounded-full shadow ${
                index === current ? "bg-cyan-950" : "bg-gray-400"
              }`}
              onClick={() => {
                setCurrent(index);
                clearAndStartInterval();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
