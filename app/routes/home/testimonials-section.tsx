import Carousel, { type CarouselItem } from "~/components/carousel";

export type TestimonialsSectionProps = {
  carousel: [CarouselItem, ...CarouselItem[]];
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
