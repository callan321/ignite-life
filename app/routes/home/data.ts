import type { AccordionItem } from "~/components/accordion";
import type { CarouselItem } from "~/components/carousel";
import type { HeroSectionItem } from "./hero-section";
import type { Treatment, TreatmentSectionContent } from "./treatments-section";

export const faqs: AccordionItem[] = [
  {
    title: "What is Bowen Therapy?",
    content:
      "Bowen Therapy is a gentle, hands-on technique that stimulates the body's natural healing process by using precise rolling movements over muscles, tendons, and fascia.",
  },
  {
    title: "What conditions can Bowen Therapy help with?",
    content:
      "Bowen Therapy is known to help with Physical Injury – Nerve Pain – Mobility – Sleep – Fatigue – Migraines – Grief – Respiratory Issues – Anxiety – Vagus Nerve Dysfunction – TMJ Pain – Scoliosis – Digestive Problems – Sinus Issues – Respiratory Conditions – IBS – Autoimmune Disease Symptoms – Fibromyalgia – Gynaecological Concerns – Erectile Dysfunction – Lymphatic Imbalances and Central Nervous System Disorders",
  },
  {
    title: "How does Bowen Therapy work?",
    content:
      "Bowen Therapy works by stimulating the nervous system and fascia, encouraging the body to reset, relax, and heal naturally. Bowen Therapy is holistic body work and doesn’t force or impose changes on the body; it stimulates and asks the body to make corrections, initiating the human body’s innate self-healing response.",
  },
  {
    title: "Is Bowen Therapy painful?",
    content:
      "No, Bowen Therapy is very gentle and non-invasive. Most people find it deeply relaxing, and many experience relief after just a few sessions.",
  },
  {
    title: "How long does a Bowen Therapy session last?",
    content:
      "A typical Bowen Therapy session lasts between 45 minutes to an hour. The treatment is followed by a period of rest to allow the body to respond and integrate the changes.",
  },
  {
    title: "How many Bowen Therapy sessions will I need?",
    content:
      "The number of sessions varies based on individual needs, but many people see improvements within 3 to 5 sessions. Some may require more for chronic conditions.",
  },
];

export const heroSections: HeroSectionItem[] = [
  {
    title: "Welcome ",
    content: "Your Pathway to Harmonious Healing",
    backgroundImage: "/hero1.jpg",
  },
  {
    title: "Heal Better - Feel Better",
    content:
      "Experience the empowering effect of restorative healing, liberating you from pain and guiding you towards recovery.",
    backgroundImage: "/rocks.jpg",
  },
];

export const treatments: Treatment[] = [
  {
    title: "Grown-ups",
    description:
      "Throughout life, we encounter numerous complex experiences, Bowen provides valuable support to alleviate the lasting effects of emotional and physical challenges.",
    age: "19-90 yrs",
    imageUrl: "/all.png",
  },
  {
    title: "Big Kids",
    description:
      "As our children grow, the challenges they face can impact their well-being. Bowen helps with emotional balance, growing pains, injuries and stress.",
    age: "5-19 yrs",
    imageUrl: "/teenager.png",
  },
  {
    title: "Little Muchkins",
    description:
      "Amidst your babies suffering, Ignite Life’s Baby Bowen presents a gentle yet effective solution, promptly easing distress and physical discomfort.",

    age: "0-4 yrs",
    imageUrl: "/baby.png",
  },
];

export const carousel: CarouselItem[] = [
  {
    src: "/testimonials/Evonne.png",
    alt: "",
  },
  {
    src: "/testimonials/Abby.png",
    alt: "",
  },
  {
    src: "/testimonials/Cindy.png",
    alt: "",
  },
  {
    src: "/testimonials/Jen.png",
    alt: "",
  },
  {
    src: "/testimonials/Rosie.png",
    alt: "",
  },
];

export const Bowenforall: TreatmentSectionContent = {
  title: "Bowen is for Everyone",
  description:
    "Experience the healing benefits of Bowen therapy, tailored for all ages. Whether it's gentle care for your baby, soothing sessions for your child, or comprehensive therapy for adults.",
};
