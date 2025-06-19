import HeroSection from "~/components/hero-section";

export default function Heather() {
  return (
    <>
      <HeroSection
        bgcolour={"#5A6F5A"}
        src={"/bowen3.jpg"}
        alt={"bowen"}
      >
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
              to years of study to become a Specialised Bowen Therapist...
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

Heather.meta = function meta() {
  return [
    { title: "Meet Heather | Ignite Life Bowen Therapy" },
    {
      name: "description",
      content:
        "Discover Heather’s personal journey from fashion to healing. Learn how her path led to Bowen Therapy — a purpose-driven practice rooted in compassion, transformation, and holistic well-being.",
    },
    {
      name: "keywords",
      content:
        "Heather Ignite Life, Bowen Therapy practitioner, healing journey, compassionate therapy, holistic wellness, personal story, therapeutic care",
    },
    { name: "robots", content: "index, follow" },

    // Open Graph
    { property: "og:title", content: "Meet Heather | Ignite Life" },
    {
      property: "og:description",
      content:
        "Explore Heather’s inspiring journey to becoming a Bowen Therapist. A story of healing, change, and dedication to helping others thrive.",
    },
    {
      property: "og:image",
      content: "https://www.ignitelife.com.au/images/heather-og.jpg",
    },
    {
      property: "og:url",
      content: "https://www.ignitelife.com.au/heather",
    },
    { property: "og:type", content: "profile" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Meet Heather | Ignite Life" },
    {
      name: "twitter:description",
      content:
        "Learn how Heather’s career transformation and compassionate mission led her to Bowen Therapy — and how she helps others achieve holistic healing.",
    },
    {
      name: "twitter:image",
      content: "https://www.ignitelife.com.au/images/heather-twitter.jpg",
    },
  ];
};
