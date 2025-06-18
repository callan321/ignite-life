import Accordion, { type AccordionItem } from "~/components/Accordion";
import CurvedImage from "~/components/CurvedImage";

export type FAQSectionProps = {
  faqs: AccordionItem[];
};

export default function FAQSection({ faqs }: FAQSectionProps) {
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
            <CurvedImage
              src={"/bowen2.jpg"}
              alt={""}
            />
          </div>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-full">
            <h3 className="sr-only">Questions about Bowen</h3>
            <Accordion items={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
