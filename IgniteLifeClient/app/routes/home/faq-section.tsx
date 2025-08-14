import Accordion, { type AccordionItem } from "~/components/accordion";
import CurvedImage from "~/components/curved-image";

export type FAQSectionContent = {
  title: string;
  introText: string;
  accordionLabel: string;
  imageSrc: string;
  imageAlt: string;
};

export type FAQSectionProps = {
  faqs: AccordionItem[];
  content: FAQSectionContent;
};

export default function FAQSection({ faqs, content }: FAQSectionProps) {
  return (
    <section className="section container-content">
      <div className="space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0 lg:gap-16">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-6 text-xl/8 text-gray-600">{content.introText}</p>

          <div className="flex w-full items-center justify-center px-8 pt-8 md:px-0 md:pt-16">
            <CurvedImage
              src={content.imageSrc}
              alt={content.imageAlt}
            />
          </div>
        </div>

        <div className="flex h-full w-full items-center justify-center">
          <div className="w-full">
            <h3 className="sr-only">{content.accordionLabel}</h3>
            <Accordion items={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
