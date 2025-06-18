import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    // Primary SEO tags
    {
      title: "Embrace Bowen Therapy | Expert Manual Therapy & Holistic Healing",
    },
    {
      name: "description",
      content:
        "Learn about the Bowen Method – a gentle, strategic approach to manual therapy that activates your body’s self-healing response. Discover how Bowen Therapy can optimize your wellness and restore balance.",
    },
    {
      name: "keywords",
      content:
        "Bowen Therapy, Bowen Method, manual therapy, holistic healing, pain relief, natural healing, wellness, body balance",
    },
    { name: "robots", content: "index, follow" },

    // Open Graph tags
    {
      property: "og:title",
      content:
        "Embrace Bowen Therapy | Expert Manual Therapy & Holistic Healing",
    },
    {
      property: "og:description",
      content:
        "Discover the transformative benefits of Bowen Therapy. Our expert approach helps optimize your body’s healing potential through gentle manual techniques.",
    },
    {
      property: "og:image",
      content: "https://www.ignitelife.com.au/images/about-og.jpg",
    },
    { property: "og:url", content: "https://www.ignitelife.com.au/about" },
    { property: "og:type", content: "website" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content:
        "Embrace Bowen Therapy | Expert Manual Therapy & Holistic Healing",
    },
    {
      name: "twitter:description",
      content:
        "Unlock your body’s healing potential with the Bowen Method. Explore how gentle manual therapy can restore balance and promote holistic well-being.",
    },
    {
      name: "twitter:image",
      content: "https://www.ignitelife.com.au/images/about-twitter.jpg",
    },
  ];
}
