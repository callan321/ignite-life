import type { MetaFunction } from "react-router";
import {
  BowenForAll,
  carousel,
  faqs,
  faqsSectionContent,
  heroSections,
  treatments,
} from "./data";
import FAQSection from "./faq-section";
import HeroSection from "./hero-section";
import TestimonialsSection from "./testimonials-section";
import TreatmentsSection from "./treatments-section";
export const meta: MetaFunction = () => {
  return [
    // Google-supported tags
    {
      title:
        "Bowen Therapy in Lennox Head & Ballina | Ignite Life – Natural Healing",
    },
    {
      name: "description",
      content:
        "Looking for Bowen Therapy near Ballina or Lennox Head? Ignite Life offers gentle, natural bodywork to ease pain, stress, and tension. A holistic alternative to massage therapy for healing.",
    },
    {
      name: "robots",
      content: "index, follow",
    },

    // Open Graph
    {
      property: "og:title",
      content: "Natural Bowen Therapy in Lennox Head & Ballina | Ignite Life",
    },
    {
      property: "og:description",
      content:
        "Heal naturally with Bowen Therapy at Ignite Life in Lennox Head, near Ballina. Support for pain, injury, fatigue, and emotional well being.",
    },
    {
      property: "og:image",
      content: "https://www.ignitelife.com.au/images/hero/sloganwhitebg.jpg",
    },
    {
      property: "og:image:alt",
      content: "Ignite Life Bowen Therapy logo and slogan on white background",
    },
    {
      property: "og:url",
      content: "https://www.ignitelife.com.au/",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: "Ignite Life Bowen Therapy",
    },

    // Twitter Card
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Bowen Therapy in Lennox Head & Ballina | Ignite Life",
    },
    {
      name: "twitter:description",
      content:
        "Gentle Bowen Therapy supporting healing, mobility, and wellness in Ballina, Lennox Head, and Northern Rivers.",
    },
    {
      name: "twitter:image",
      content: "https://www.ignitelife.com.au/images/hero/sloganwhitebg.jpg",
    },
  ];
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection sections={heroSections} />
      <TreatmentsSection
        treatments={treatments}
        content={BowenForAll}
      />
      <FAQSection
        faqs={faqs}
        content={faqsSectionContent}
      />
      <TestimonialsSection carousel={carousel} />
    </div>
  );
}
