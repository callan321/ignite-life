import type { AccordionItem } from "~/components/accordion";
import type { CarouselItem } from "~/components/carousel";
import type { FAQSectionContent } from "./faq-section";
import type { HeroSectionItem } from "./hero-section";
import type { Treatment, TreatmentSectionContent } from "./treatments-section";

export const faqsSectionContent: FAQSectionContent = {
  title: "Frequently Asked Questions About Bowen Therapy",
  introText:
    "Wondering how Bowen Therapy can support your healing journey? This gentle, holistic treatment is trusted by individuals and families in Lennox Head and Byron Bay to relieve pain, ease stress, and support overall well-being. If you have more questions, feel free to reach out anytime.",
  accordionLabel: "Common Bowen Therapy Questions",
  imageSrc: "images/hero/bowen2.jpg",
  imageAlt: "Bowen Therapy treatment in progress",
};

export const faqs: AccordionItem[] = [
  {
    title: "What is Bowen Therapy?",
    content:
      "Bowen Therapy is a gentle, hands-on natural therapy used in Lennox Head and Byron Bay to support the body’s healing process. It involves precise rolling movements over muscles, tendons, and fascia, encouraging holistic recovery and nervous system balance.",
  },
  {
    title: "What conditions can Bowen Therapy help with?",
    content:
      "Bowen Therapy is known to help with a wide range of physical and emotional conditions. These include: physical injury, nerve pain, reduced mobility, sleep disturbances, fatigue, migraines, grief, anxiety, vagus nerve dysfunction, TMJ pain, scoliosis, sinus issues, digestive problems, IBS, fibromyalgia, autoimmune symptoms, gynaecological concerns, erectile dysfunction, lymphatic imbalances, and nervous system disorders. Many people in Lennox Head and the Northern Rivers region seek Bowen Therapy as a natural alternative to chiropractic or conventional treatments.",
  },
  {
    title: "How does Bowen Therapy work?",
    content:
      "Bowen Therapy works by gently stimulating the nervous system and fascia, allowing the body to reset, relax, and heal naturally. Bowen is a form of holistic manual therapy and doesn’t force or impose changes—it encourages the body’s own self-healing mechanisms.",
  },
  {
    title: "Is Bowen Therapy painful?",
    content:
      "No, Bowen Therapy is a very gentle and non-invasive technique. It’s widely known in Lennox Head and Byron Bay for its calming, relaxing effects, and is suitable for all ages — including babies and the elderly.",
  },
  {
    title: "How long does a Bowen Therapy session last?",
    content:
      "A typical Bowen Therapy session lasts between 45 minutes to an hour. Sessions are followed by a period of rest to allow the body time to respond, integrate, and begin its healing process.",
  },
  {
    title: "How many Bowen Therapy sessions will I need?",
    content:
      "Many clients notice improvements within 3 to 5 Bowen Therapy sessions, depending on the condition being treated. Chronic conditions or long-term stress patterns may require a longer treatment plan. Sessions are available in Lennox Head and surrounding Northern Rivers communities.",
  },
  {
    title: "Is Bowen Therapy similar to a massage?",
    content:
      "No — Bowen Therapy is not massage. It doesn't use oils, deep tissue pressure, or continuous strokes. Instead, it involves precise, gentle movements over muscles and connective tissue, followed by intentional pauses. These pauses allow the nervous system to process the input and stimulate the body’s own self-healing mechanisms. The goal isn’t muscle manipulation — it’s neuromuscular rebalancing.",
  },
  {
    title: "Where is your Bowen Therapy clinic located?",
    content:
      "Ignite Life is based in Lennox Head, conveniently located just 10–15 minutes from Ballina and Byron Bay. Many of our clients come from across the Northern Rivers seeking gentle, natural therapy to support their wellbeing.",
  },
];

export const heroSections: [HeroSectionItem, ...HeroSectionItem[]] = [
  {
    title: "Welcome",
    content: "Your Pathway to Harmonious Healing in Lennox Head and Byron Bay",
    backgroundImage: "/images/hero/hero1.jpg",
  },
  {
    title: "Heal Better – Feel Better",
    content:
      "Experience the restorative benefits of Bowen Therapy in Lennox Head — a gentle, holistic approach to healing pain, stress, and injury naturally.",
    backgroundImage: "/images/hero/rocks.jpg",
  },
];

export const treatments: Treatment[] = [
  {
    title: "Grown-ups",
    description:
      "Throughout life, we encounter numerous complex experiences, Bowen provides valuable support to alleviate the lasting effects of emotional and physical challenges.",
    age: "19-90 yrs",
    imageUrl: "/images/treatments/all.png",
  },
  {
    title: "Big Kids",
    description:
      "As our children grow, the challenges they face can impact their well-being. Bowen helps with emotional balance, growing pains, injuries and stress.",
    age: "5-19 yrs",
    imageUrl: "/images/treatments/teenager.png",
  },
  {
    title: "Little Muchkins",
    description:
      "Amidst your babies suffering, Ignite Life’s Baby Bowen presents a gentle yet effective solution, promptly easing distress and physical discomfort.",
    age: "0-4 yrs",
    imageUrl: "/images/treatments/baby.png",
  },
];

export const carousel: [CarouselItem, ...CarouselItem[]] = [
  {
    src: "/images/testimonials/Evonne.png",
    alt: "Evonne’s Bowen Therapy review – chronic knee pain relief and restored mobility after surgery, now pain-free in Lennox Head.",
  },
  {
    src: "/images/testimonials/Abby.png",
    alt: "Abby’s testimonial – menstrual cycle restored after one Bowen Therapy session. Natural healing after years of hormonal issues in Byron Bay.",
  },
  {
    src: "/images/testimonials/Cindy.png",
    alt: "Cindy’s experience – Bowen Therapy eased MS symptoms, improved sleep and energy, and brought lasting relief in the Northern Rivers region.",
  },
  {
    src: "/images/testimonials/Jen.png",
    alt: "Jen’s feedback – relief from stress, neck tension, and improved well-being with short Bowen Therapy sessions in Lennox Head.",
  },
  {
    src: "/images/testimonials/Rosie.png",
    alt: "Rosie’s story – chronic sinusitis cleared with Bowen Therapy after 7 years. Now visits monthly for ongoing wellness near Byron Bay.",
  },
];

export const BowenForAll: TreatmentSectionContent = {
  title: "Bowen is for Everyone",
  description:
    "Experience the healing benefits of Bowen Therapy, trusted by families across Lennox Head, Ballina, Byron Bay, and the wider Northern Rivers. Whether it's gentle care for your baby, soothing sessions for your child, or comprehensive natural therapy for adults — Bowen supports the whole family with holistic care.",
};
