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
