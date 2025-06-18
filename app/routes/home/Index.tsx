import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import TreatmentsSection from "~/routes/home/TreatmentsSection";
import HeroSection from "./HeroSection";
import { Bowenforall, carousel, faqs, heroSections, treatments } from "./Data";
import { meta } from "./meta";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection sections={heroSections} />
      <TreatmentsSection treatments={treatments} content={Bowenforall} />
      <FAQSection faqs={faqs} />
      <TestimonialsSection carousel={carousel} />
    </div>
  );
}

export { meta };
