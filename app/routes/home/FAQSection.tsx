import Accordion from "~/components/Accordion";

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
  );
}
