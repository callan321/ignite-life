import Carousel, { type CarouselItem } from "~/components/Carousel";

export type TestimonialsSectionProps = {
  carousel: CarouselItem[];
};

export default function TestimonialsSection({
  carousel,
}: TestimonialsSectionProps) {
  return (
    <section className="container-content">
      <Carousel items={carousel} />
    </section>
  );
}
