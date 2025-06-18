import Accordion from "~/components/Accordion";
import CurvedImage from "~/components/CurvedImage";

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

export default function FAQSection() {
  return (
    <section className="section container-content">
      <div className="space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0 lg:gap-16">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-xl/8 text-gray-600">
            Curious about Bowen Therapy? Discover its unique approach and the
            many health benefits it offers. If you have any further enquiries,
            feel free to get in touch with us for more in depth information!
          </p>

          <div className="flex w-full items-center justify-center px-8 pt-8 md:px-0 md:pt-16">
            <CurvedImage src={"/bowen2.jpg"} alt={""} />
          </div>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-full">
            <h3 className="sr-only">Questions about Bowen</h3>
            <Accordion questions={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
