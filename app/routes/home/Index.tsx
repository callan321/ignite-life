import TreatmentsSection from "~/routes/home/TreatmentsSection";
import { Bowenforall, carousel, faqs, heroSections, treatments } from "./Data";
import FAQSection from "./FAQSection";
import HeroSection from "./HeroSection";
import { meta } from "./meta";
import TestimonialsSection from "./TestimonialsSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection sections={heroSections} />
      <TreatmentsSection
        treatments={treatments}
        content={Bowenforall}
      />
      <FAQSection faqs={faqs} />
      <TestimonialsSection carousel={carousel} />
    </div>
  );
}

export { meta };
