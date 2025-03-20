import Accordion from "~/components/Accordion";
import type { Route } from "../+types/root";
import Carousel from "~/components/Carousel";

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
      "Bowen Therapy is known to help with back pain, migraines, stress, joint pain, digestive issues, and sports injuries, among other conditions.",
  },
  {
    question: "How does Bowen Therapy work?",
    answer:
      "Bowen Therapy works by stimulating the nervous system and fascia, encouraging the body to reset, relax, and heal naturally without forceful manipulation.",
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

export default function Home() {
  return (
    <div className="flex flex-col lg:space-y-20 space-y-16">
      <Carousel />

      {/* Hero Section*/}
      <section className="container-content">
        <h2
          className={`mt-2 text-3xl parisienne text-center tracking-tight text-black sm:text-6xl`}
        >
          {Bowenforall.title}
        </h2>
        <div className=" w-full flex items-center justify-center mt-6">
          <div className="max-w-2xl">
            <p className="text-left text-lg leading-8 text-gray-700 sm:text-center">
              {Bowenforall.description}
            </p>
          </div>
        </div>
      </section>
      <div className="container-content">
        <h2 className="text-heading">Frequently Asked Questions</h2>
        <Accordion questions={faqs} />
      </div>
    </div>
  );
}
