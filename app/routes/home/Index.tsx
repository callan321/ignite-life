import { Bowenforall, carousel, faqs, heroSections, treatments } from "./data";
import FAQSection from "./faq-section";
import HeroSection from "./hero-section";
import TestimonialsSection from "./testimonials-section";
import TreatmentsSection from "./treatments-section";

export default function Home() {
  return (
    <>
      {/* SEO & Social Meta Tags */}
      <title>Ignite Life - Bowen Therapy</title>
      <meta
        name="description"
        content="Discover holistic healing through Bowen Therapy at Ignite Life. Our landing page offers personalized treatments for all ages, comprehensive FAQs, client testimonials, and natural pain relief strategies to empower your wellness journey."
      />
      <meta
        name="keywords"
        content="Bowen Therapy, holistic healing, natural pain relief, personalized treatments, wellness, FAQs, client testimonials, Ignite Life"
      />
      <meta
        name="robots"
        content="index, follow"
      />

      {/* Open Graph */}
      <meta
        property="og:title"
        content="Ignite Life - Bowen Therapy for Everyone"
      />
      <meta
        property="og:description"
        content="Explore the benefits of Bowen Therapy at Ignite Life. Learn about tailored treatments, read FAQs, and view client testimonials to guide your path to natural healing and well-being."
      />
      <meta
        property="og:image"
        content="https://www.ignitelife.com.au/images/landing-og.jpg"
      />
      <meta
        property="og:url"
        content="https://www.ignitelife.com.au/"
      />
      <meta
        property="og:type"
        content="website"
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:title"
        content="Ignite Life - Bowen Therapy for Everyone"
      />
      <meta
        name="twitter:description"
        content="Experience holistic healing with Bowen Therapy at Ignite Life. Discover personalized treatments, in-depth FAQs, and testimonials that support your wellness journey."
      />
      <meta
        name="twitter:image"
        content="https://www.ignitelife.com.au/images/landing-twitter.jpg"
      />

      {/* Page Content */}
      <div className="flex flex-col">
        <HeroSection sections={heroSections} />
        <TreatmentsSection
          treatments={treatments}
          content={Bowenforall}
        />
        <FAQSection faqs={faqs} />
        <TestimonialsSection carousel={carousel} />
      </div>
    </>
  );
}
