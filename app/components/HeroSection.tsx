export default function HeroSection({
  bgcolour,
  src,
  alt,
  children,
}: {
  bgcolour: string;
  src: string;
  alt: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      style={{
        backgroundColor: bgcolour,
      }}
    >
      <div
        className="w-full min-h-screen relative container-padding"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundClip: "content-box",
        }}
      >
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
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 flex justify-center items-center min-h-screen">
          {children}
        </div>
      </div>
    </section>
  );
}
