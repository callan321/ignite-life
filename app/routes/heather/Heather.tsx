import HeroSection from "~/components/HeroSection";
import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    // Primary SEO tags
    { title: "Heather's Journey: Transforming Life with Bowen Therapy" },
    {
      name: "description",
      content:
        "Discover Heather's transformative path from fashion to specialized Bowen Therapy. Learn how her passion for healing, compassion, and purpose drives her practice and inspires change.",
    },
    {
      name: "keywords",
      content:
        "Bowen Therapy, Heather, holistic healing, specialized therapist, personal transformation, healing journey, compassionate care",
    },
    { name: "robots", content: "index, follow" },

    // Open Graph tags
    {
      property: "og:title",
      content: "Heather's Journey: Transforming Life with Bowen Therapy",
    },
    {
      property: "og:description",
      content:
        "Read Heather’s personal story and explore how Bowen Therapy reshaped her life. Embrace the healing power of holistic care and experience transformation.",
    },
    {
      property: "og:image",
      content: "https://www.ignitelife.com.au/images/heather-og.jpg",
    },
    { property: "og:url", content: "https://www.ignitelife.com.au/heather" },
    { property: "og:type", content: "website" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Heather's Journey: Transforming Life with Bowen Therapy",
    },
    {
      name: "twitter:description",
      content:
        "Explore Heather’s inspiring journey to healing through Bowen Therapy. Learn how her commitment to compassion and transformation can empower your own path to wellness.",
    },
    {
      name: "twitter:image",
      content: "https://www.ignitelife.com.au/images/heather-twitter.jpg",
    },
  ];
}

export default function Heather() {
  return (
    <>
      <HeroSection bgcolour={"#5A6F5A"} src={"/bowen3.jpg"} alt={"bowen"}>
        <div className="container-content-sm card">
          <div className="text-center">
            <h4 className="text-heading">
              Embracing Change, Healing, Compassion, and Purpose: My Path
            </h4>
            <br />
            <p className="text-body">
              With my family’s growth came a newfound clarity: it was time to
              evolve from a stagnant career of fashion to a more fulfilling path
              that harmonizes my personal principles with my professional
              pursuits. Choosing to take the “road less travelled”, in returning
              to years of study to become a Specialised Bowen Therapist. This
              decision has been a transformative experience, guiding me to a
              destination where my personal values of spreading kindness,
              compassion and service to humanity, has led me to a career that is
              both purpose-driven, profoundly rewarding and deeply fulfilling.
            </p>
            <br />
            <p className="text-body">
              I welcome you to my practice, where I am committed to assisting
              you in activating your inherent healing potential, enriching your
              well-being and attaining optimal vitality, with the aid of Bowen
              therapy’s transformative power.
            </p>
            <br />
            <p className="text-body">With much warmth</p>
            <p className="text-body">
              I look forward to meeting and helping you
            </p>
            <p className="text-body">Heather</p>
          </div>
        </div>
      </HeroSection>
    </>
  );
}
