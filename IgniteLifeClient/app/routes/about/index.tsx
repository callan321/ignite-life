import type { MetaFunction } from "react-router";
import HeroSection from "~/components/hero-section";

export const meta: MetaFunction = () => {
  return [
    // Google-supported tags
    {
      title: "About Bowen Therapy | Ignite Life – Lennox Head & Ballina",
    },
    {
      name: "description",
      content:
        "Bowen Therapy at Ignite Life offers a gentle, hands-on alternative to massage. Serving Lennox Head, Ballina, and Byron Bay. Learn how it supports natural healing, pain relief, and nervous system balance.",
    },
    {
      name: "robots",
      content: "index, follow",
    },

    // Open Graph
    {
      property: "og:title",
      content: "About Bowen Therapy | Ignite Life – Natural Healing",
    },
    {
      property: "og:description",
      content:
        "Explore Bowen Therapy in Lennox Head, near Ballina and Byron Bay. Gentle therapy for pain, stress, and holistic wellness.",
    },
    {
      property: "og:image",
      content: "https://www.ignitelife.com.au/images/hero/bowen3.jpg",
    },
    {
      property: "og:image:alt",
      content: "Peaceful Bowen Therapy session in Lennox Head clinic",
    },
    {
      property: "og:url",
      content: "https://www.ignitelife.com.au/about",
    },
    {
      property: "og:type",
      content: "website",
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
      content: "About Bowen Therapy | Ignite Life",
    },
    {
      name: "twitter:description",
      content:
        "Gentle and holistic Bowen Therapy for pain and stress relief. Serving Lennox Head, Ballina, and Byron Bay regions.",
    },
    {
      name: "twitter:image",
      content: "https://www.ignitelife.com.au/images/hero/bowen3.jpg",
    },
  ];
};

export default function About() {
  return (
    <HeroSection
      bgcolor="#5A6F5A"
      src="/images/hero/bowen3.jpg"
    >
      <div className="container-content-sm card">
        <div className="text-center">
          <h4 className="text-heading">EMBRACE BOWEN</h4>
          <p className="text-body">
            Unlock your body’s natural ability to heal with Bowen Therapy at
            Ignite Life. Based in Lennox Head and supporting clients from
            Ballina, Byron Bay, and the Northern Rivers, Heather offers a unique
            approach to pain relief, nervous system balance, and overall
            well-being.
          </p>
          <br />
          <h4 className="text-heading">IS BOWEN THERAPY LIKE MASSAGE?</h4>
          <p className="text-body">
            While Bowen Therapy is not massage, it shares many of the same
            benefits — like reducing pain, relaxing the body, and restoring
            mobility. Instead of kneading or deep pressure, Bowen involves
            gentle rolling movements over specific areas of the body to trigger
            healing responses. It’s ideal for those seeking a softer, more
            holistic alternative to traditional massage in Ballina or Byron Bay.
          </p>
          <br />
          <h4 className="text-heading">THE BOWEN METHOD</h4>
          <p className="text-body">
            Bowen is a precise, strategic technique that works across fascia,
            muscles, tendons, and nerves. By stimulating these points in
            sequences, Bowen helps re-align body systems, reset the nervous
            system, and activate self-healing — often with long-lasting results.
          </p>
          <br />
          <h4 className="text-heading">HOW BOWEN CAN HELP</h4>
          <p className="text-body">
            Clients visit for many reasons — acute injuries, chronic pain,
            fatigue, emotional stress, or just a sense of imbalance. Because
            Bowen is non-invasive and gentle, it's suitable for all ages and
            many conditions. It helps the body heal without forcing it.
          </p>
          <br />
          <h4 className="text-heading">Common Concerns Treated:</h4>
          <p className="text-body">
            Muscle & Joint Pain – Back & Neck Tension – Fatigue – Sleep
            Disturbances – Migraines – Anxiety – TMJ & Jaw Issues – Digestive
            Imbalances – Scoliosis – Nerve Pain – Respiratory Issues –
            Autoimmune Symptoms – Lymphatic Stagnation – Fibromyalgia – Grief –
            Vagus Nerve Dysfunction – Chronic Pain – and more.
          </p>
        </div>
      </div>
    </HeroSection>
  );
}
