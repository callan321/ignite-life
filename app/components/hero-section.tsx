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
        className="relative min-h-screen w-full"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundClip: "content-box",
        }}
      >
        <IgniteLifeSlogan />
        <div className="relative z-10 flex min-h-screen items-center justify-center py-16">
          {children}
        </div>
      </div>
    </section>
  );
}
