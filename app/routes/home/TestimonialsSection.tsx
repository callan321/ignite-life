import Carousel from "~/components/Carousel";

const carousel = [
  {
    src: "/testimonials/Evonne.png",
    alt: "",
  },
  {
    src: "/testimonials/Abby.png",
    alt: "",
  },
  {
    src: "/testimonials/Cindy.png",
    alt: "",
  },
  {
    src: "/testimonials/Jen.png",
    alt: "",
  },
  {
    src: "/testimonials/Rosie.png",
    alt: "",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#5A6F5A] section-lg">
      <div className="container-content">
        <Carousel items={carousel} />
      </div>
    </section>
  );
}
