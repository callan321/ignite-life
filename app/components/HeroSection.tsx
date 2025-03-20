import { type ReactNode } from "react";

export default function HeroSection({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <section className="w-screen h-[36rem] md:h-screen bg-amber-900 flex items-center justify-center">
      <div className="w-full px-8 sm:px-12 md:px-16 lg:px-24 xl:px-36  h-full relative ">
        <img
          src="/bowen3.jpg"
          alt="Slogan"
          className="w-full  h-full object-cover"
        />
        <div
          className="
            absolute
            top-4 right-4
            sm:top-8 sm:right-8
            md:top-16 md:right-16
            flex items-center justify-center
            h-36 w-36
            md:h-48 md:w-48
            lg:h-72 lg:w-72
            rounded-full bg-white shadow-md
          "
        >
          <img
            src="/slogan.png"
            alt="Slogan"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {children}
        </div>
      </div>
    </section>
  );
}
