import Accordion from "~/components/Accordion";
import type { Route } from "../../+types/root";
import Treatments from "~/components/Treatments";
import HeroButton from "~/components/HeroButton";
import Carousel from "~/components/Carousel";
import HeroSectionCarousel from "~/components/HeroSectionCarousel";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Bowenforall = {
  title: "Bowen is for Everyone",
  description:
    "Experience the healing benefits of Bowen therapy, tailored for all ages. Whether it's gentle care for your baby, soothing sessions for your child, or comprehensive therapy for adults.",
};

const faqs = [
  {
    question: "What is Bowen Therapy?",
    answer:
      "Bowen Therapy is a gentle, hands-on technique that stimulates the body's natural healing process by using precise rolling movements over muscles, tendons, and fascia.",
  },
  {
    question: "What conditions can Bowen Therapy help with?",
    answer:
      "Bowen Therapy is known to help with  Physical Injury – Nerve Pain – Mobility – Sleep – Fatigue – Migraines – Grief – Respiratory Issues – Anxiety – Vagus Nerve Dysfunction – TMJ Pain – Scoliosis – Digestive Problems – Sinus Issues – Respiratory Conditions – IBS – Autoimmune Disease Symptoms – Fibromyalgia – Gynaecological Concerns – Erectile Dysfunction – Lymphatic Imbalances and Central Nervous System Disorders",
  },
  {
    question: "How does Bowen Therapy work?",
    answer:
      "Bowen Therapy works by stimulating the nervous system and fascia, encouraging the body to reset, relax, and heal naturally. Bowen Therapy is holistic body work and doesn’t force or impose changes on the body, it stimulates and asks the body to make corrections, initiating the human body’s innate self-healing response.",
  },
  {
    question: "Is Bowen Therapy painful?",
    answer:
      "No, Bowen Therapy is very gentle and non-invasive. Most people find it deeply relaxing, and many experience relief after just a few sessions.",
  },
  {
    question: "How long does a Bowen Therapy session last?",
    answer:
      "A typical Bowen Therapy session lasts between 45 minutes to an hour. The treatment is followed by a period of rest to allow the body to respond and integrate the changes.",
  },
  {
    question: "How many Bowen Therapy sessions will I need?",
    answer:
      "The number of sessions varies based on individual needs, but many people see improvements within 3 to 5 sessions. Some may require more for chronic conditions.",
  },
];

const carousel = [
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

const heroSections = [
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

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSectionCarousel sections={heroSections} />
      {/* Intro */}
      <section className="bg-[#5A6F5A] section ">
        <div className="container-content ">
          <div className="card">
            <div className=" container-content-sm">
              <h2
                className={`text-4xl parisienne text-center tracking-tight text-black sm:text-6xl`}
              >
                {Bowenforall.title}
              </h2>
              <div className=" w-full flex items-center justify-center mt-6">
                <p className="text-left text-lg leading-8 text-gray-700 sm:text-center">
                  {Bowenforall.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Treatments */}
      <section className="section">
        <div className="container-content">
          <Treatments />
          <div className="flex flex-col space-y-8 items-center justify-center pt-8">
            <HeroButton
              name={"Click see more"}
              href={"https://ignite-life-bowen-therapy.square.site"}
            />
          </div>
        </div>
      </section>
      {/* Frequently Asked Questions */}
      <section className=" section">
        <div className="container-content">
          <div className="flex flex-col w-full  ">
            <h2 className="text-heading">Frequently Asked Questions</h2>
            <div className="mt-12">
              <Accordion questions={faqs} />
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="bg-[#5A6F5A] section-lg">
        <div className="container-content">
          <Carousel items={carousel} />
        </div>
      </section>
    </div>
  );
}
