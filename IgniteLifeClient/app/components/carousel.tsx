import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useAutoAdvance } from "~/hooks/use-auto-advance";

export type CarouselItem = {
  src: string;
  alt: string;
};

export type CarouselProps = {
  items: [CarouselItem, ...CarouselItem[]];
};

const carouselImageClass =
  "w-full h-auto lg:max-h-[75vh] max-h-[80vh] max-w-3xl  object-cover transition-all duration-300";

export default function Carousel({ items }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const TIMEOUT = 5000;
  const currentItem = items[current]!;

  useAutoAdvance(items.length, TIMEOUT, () => {
    if (!isTransitioning) {
      setPrevious(current);
      setCurrent((prev) => (prev + 1) % items.length);
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  });

  const next = () => {
    if (!isTransitioning) {
      setPrevious(current);
      setCurrent((prev) => (prev + 1) % items.length);
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const prev = () => {
    if (!isTransitioning) {
      setPrevious(current);
      setCurrent((prev) => (prev - 1 + items.length) % items.length);
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== current) {
      setPrevious(current);
      setCurrent(index);
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col items-center">
        <div className="group relative">
          <div className="relative grid place-items-center overflow-hidden rounded-2xl bg-gray-100 shadow-2xl">
            {/* Previous Image - slide out */}
            {previous !== null && items[previous] && (
              <div
                key={`prev-${items[previous].src}`}
                className="slide-out-right col-start-1 row-start-1"
              >
                <img
                  className={carouselImageClass}
                  src={items[previous].src}
                  alt={items[previous].alt}
                />
              </div>
            )}

            {/* Current Image - slide in */}
            <div
              key={`curr-${currentItem.src}`}
              className="slide-in-left col-start-1 row-start-1"
            >
              <img
                className={carouselImageClass}
                src={currentItem.src}
                alt={currentItem.alt}
              />
            </div>
          </div>

          {/* Left Chevron Button */}
          <button
            className="absolute top-1/2 -left-4 -translate-y-1/2 cursor-pointer rounded-full bg-stone-600/95 p-2 text-white opacity-80 shadow-lg backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:bg-stone-700/95 hover:shadow-xl focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:outline-none lg:-left-6 lg:p-3"
            onClick={prev}
            disabled={isTransitioning}
          >
            <ChevronLeftIcon className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>

          {/* Right Chevron Button */}
          <button
            className="absolute top-1/2 -right-4 -translate-y-1/2 cursor-pointer rounded-full bg-stone-600/95 p-2 text-white opacity-80 shadow-lg backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:bg-stone-700/95 hover:shadow-xl focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:outline-none lg:-right-6 lg:p-3"
            onClick={next}
            disabled={isTransitioning}
          >
            <ChevronRightIcon className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="mt-6 flex justify-center space-x-3">
          {items.map((item, index) => (
            <button
              key={item.src}
              className={`h-3.5 w-3.5 cursor-pointer rounded-full shadow-sm transition-all duration-300 hover:scale-125 focus:ring-2 focus:ring-stone-500 focus:ring-offset-1 focus:outline-none ${
                index === current
                  ? "scale-110 bg-stone-600 opacity-90 shadow-md"
                  : "bg-stone-400 opacity-70 hover:bg-stone-500 hover:opacity-90"
              }`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
