const faqs = [
  {
    id: 1,
    question: "What is Bowen Therapy?",
    answer:
      "Bowen Therapy is a gentle, hands-on technique that stimulates the body's natural healing process by using precise rolling movements over muscles, tendons, and fascia.",
  },
  {
    id: 2,
    question: "What conditions can Bowen Therapy help with?",
    answer:
      "Bowen Therapy is known to help with back pain, migraines, stress, joint pain, digestive issues, and sports injuries, among other conditions.",
  },
  {
    id: 3,
    question: "How does Bowen Therapy work?",
    answer:
      "Bowen Therapy works by stimulating the nervous system and fascia, encouraging the body to reset, relax, and heal naturally without forceful manipulation.",
  },
  {
    id: 4,
    question: "Is Bowen Therapy painful?",
    answer:
      "No, Bowen Therapy is very gentle and non-invasive. Most people find it deeply relaxing, and many experience relief after just a few sessions.",
  },
  {
    id: 5,
    question: "How long does a Bowen Therapy session last?",
    answer:
      "A typical Bowen Therapy session lasts between 45 minutes to an hour. The treatment is followed by a period of rest to allow the body to respond and integrate the changes.",
  },
  {
    id: 6,
    question: "How many Bowen Therapy sessions will I need?",
    answer:
      "The number of sessions varies based on individual needs, but many people see improvements within 3 to 5 sessions. Some may require more for chronic conditions.",
  },
];

export default function Faqs() {
  return (
    <div className="container-content">
      <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        Frequently asked questions
      </h2>
      <p className="mt-6 max-w-2xl text-base/7 text-gray-600">
        Email on{" "}
        <a
          href="#"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          enter email
        </a>{" "}
        and we’ll get back to you as soon as we can.
      </p>
      <div className="mt-20">
        <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-10">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <dt className="text-base/7 font-semibold text-gray-900">
                {faq.question}
              </dt>
              <dd className="mt-2 text-base/7 text-gray-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
