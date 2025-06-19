// routes/home/index.tsx
import type { MetaFunction } from "react-router";
import { Bowenforall, carousel, faqs, heroSections, treatments } from "./data";
import FAQSection from "./faq-section";
import HeroSection from "./hero-section";
import TestimonialsSection from "./testimonials-section";
import TreatmentsSection from "./treatments-section";

export const meta: MetaFunction = () => {
  return [
    { title: "Ignite Life - Bowen Therapy" },
    {
      name: "description",
      content:
        "Discover holistic healing through Bowen Therapy at Ignite Life. Our landing page offers personalized treatments for all ages, comprehensive FAQs, client testimonials, and natural pain relief strategies to empower your wellness journey.",
    },
    {
      name: "keywords",
      content:
        "Bowen Therapy, holistic healing, natural pain relief, personalized treatments, wellness, FAQs, client testimonials, Ignite Life",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    // Open Graph
    {
      property: "og:title",
      content: "Ignite Life - Bowen Therapy for Everyone",
    },
    {
      property: "og:description",
      content:
        "Explore the benefits of Bowen Therapy at Ignite Life. Learn about tailored treatments, read FAQs, and view client testimonials to guide your path to natural healing and well-being.",
    },
    {
      property: "og:image",
      content: "https://www.ignitelife.com.au/images/landing-og.jpg",
    },
    {
      property: "og:url",
      content: "https://www.ignitelife.com.au/",
    },
    {
      property: "og:type",
      content: "website",
    },
    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Ignite Life - Bowen Therapy for Everyone",
    },
    {
      name: "twitter:description",
      content:
        "Experience holistic healing with Bowen Therapy at Ignite Life. Discover personalized treatments, in-depth FAQs, and testimonials that support your wellness journey.",
    },
    {
      name: "twitter:image",
      content: "https://www.ignitelife.com.au/images/landing-twitter.jpg",
    },
  ];
};

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
