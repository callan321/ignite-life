export type HeroSectionProps = {
  bgcolour: string;
  src: string;
  children?: React.ReactNode;
  alt: string;
};

export default function HeroSection({
  bgcolour,
  src,
  children,
  alt,
}: HeroSectionProps) {
  return (
    <section
      style={{
        backgroundColor: bgcolour,
      }}
    >
      <div
        className="relative min-h-screen w-full"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundClip: "content-box",
        }}
      >
        <div className="absolute top-4 right-4 flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-md sm:top-8 sm:right-8 md:top-16 md:right-16 md:h-48 md:w-48 lg:h-72 lg:w-72">
          <img
            src="/slogan.png"
            alt={alt}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          {children}
        </div>
      </div>
    </section>
  );
}
