import type { Route } from "../../+types/root";
import HeroSectionCarousel from "~/components/HeroSectionCarousel";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import TreatmentsSection from "~/routes/home/TreatmentsSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const heroSections = [
  {
    title: "Welcome ",
    content: "Your Pathway to Harmonious Healing",
    backgroundImage: "/hero1.jpg",
  },
  {
    title: "Heal Better - Feel Better",
    content:
      "Experience the empowering effect of restorative healing, liberating you from pain and guiding you towards recovery.",
    backgroundImage: "/rocks.jpg",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSectionCarousel sections={heroSections} />
      <TreatmentsSection />
      <FAQSection />
      <TestimonialsSection />
    </div>
  );
}
