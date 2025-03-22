import { useEffect, useRef, useState } from "react";
import CurvedImage from "./CurvedImage";

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
    <div className="container-content-sm ">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <button className="text-4xl" onClick={prev}>
            ←
          </button>
          <div className="max-w-lg">
            <img
              className=""
              src={items[current].src}
              alt={items[current].alt}
            ></img>
            <p className="text-body">{items[current].alt}</p>
          </div>
          <button className="text-4xl" onClick={next}>
            →
          </button>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-4 w-4 rounded-full ${
                index === current ? "bg-cyan-950" : "bg-gray-300"
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
