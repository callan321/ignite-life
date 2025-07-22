import type { MetaFunction } from "react-router";
import HeroSection from "~/components/hero-section";

export const meta: MetaFunction = () => {
  return [
    // Google-supported tags
    {
      title:
        "Meet Heather – Bowen Therapist in Lennox Head & Ballina | Ignite Life",
    },
    {
      name: "description",
      content:
        "Meet Heather, a dedicated Bowen Therapist in Lennox Head serving the Ballina region. Discover her holistic approach to natural healing and wellness through gentle therapeutic bodywork.",
    },
    {
      name: "robots",
      content: "index, follow",
    },

    // Open Graph
    {
      property: "og:title",
      content: "Meet Heather – Bowen Therapist | Ignite Life",
    },
    {
      property: "og:description",
      content:
        "Meet Heather, a dedicated Bowen Therapist in Lennox Head near Ballina. Discover her story and holistic approach to natural healing through gentle, therapeutic care.",
    },
    {
      property: "og:image",
      content: "https://www.ignitelife.com.au/images/hero/heather.jpg",
    },
    {
      property: "og:image:alt",
      content: "Heather offering a peaceful Bowen Therapy session",
    },
    {
      property: "og:url",
      content: "https://www.ignitelife.com.au/heather",
    },
    {
      property: "og:type",
      content: "profile",
    },
    {
      property: "og:site_name",
      content: "Ignite Life Bowen Therapy",
    },

    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Heather – Bowen Therapist | Ignite Life Lennox Head & Ballina",
    },
    {
      name: "twitter:description",
      content:
        "Meet Heather, a dedicated Bowen Therapist in Lennox Head serving Ballina. Discover her holistic approach to natural healing and wellness support.",
    },
    {
      name: "twitter:image",
      content: "https://www.ignitelife.com.au/images/hero/heather.jpg",
    },
  ];
};

export default function Heather() {
  return (
    <HeroSection
      bgcolor="#5A6F5A"
      src="/images/hero/bowen3.jpg"
    >
      <div className="container-content-sm card">
        <div className="text-center">
          <h4 className="text-heading">
            Embracing Change, Healing, Compassion, and Purpose: My Path
          </h4>
          <br />
          <p className="text-body">
            With my family's growth came a newfound clarity: it was time to
            evolve from a stagnant career in fashion to a more fulfilling path
            that aligned with my values and passion for helping others. I chose
            the road less travelled — returning to study and becoming a
            Specialised Bowen Therapist.
          </p>
          <br />
          <p className="text-body">
            Today, I offer gentle, holistic Bowen Therapy to clients across
            Lennox Head and Ballina, helping them reconnect with their body’s
            natural ability to heal.
          </p>
          <br />
          <p className="text-body">With much warmth,</p>
          <p className="text-body">
            I look forward to meeting and supporting you,
          </p>
          <p className="text-body">Heather</p>
        </div>
      </div>
    </HeroSection>
  );
}
