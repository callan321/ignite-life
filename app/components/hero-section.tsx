import IgniteLifeSlogan from "./ignite-life-slogan";

export type HeroSectionProps = {
  bgcolor: string;
  src: string;
  children?: React.ReactNode;
};

export default function HeroSection({
  bgcolor,
  src,
  children,
}: HeroSectionProps) {
  return (
    <section
      style={{
        backgroundColor: bgcolor,
      }}
    >
      <div
        className="relative flex min-h-screen w-full items-center justify-center"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundClip: "content-box",
        }}
      >
        <IgniteLifeSlogan />
        <div className="relative z-10 flex min-h-screen items-center justify-center py-12 md:py-24">
          {children}
        </div>
      </div>
    </section>
  );
}
