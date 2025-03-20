import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

type Question = {
  question: string;
  answer: string;
};

export default function Accordion({ questions }: { questions: Question[] }) {
  return (
    <dl className="mt-16 divide-y divide-gray-900/10">
      {questions.map((question) => (
        <Disclosure
          key={question.question}
          as="div"
          className="py-6 first:pt-0 last:pb-0"
        >
          <dt>
            <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
              <span className="text-base/7 font-semibold">
                {question.question}
              </span>
              <span className="ml-6 flex h-7 items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="size-6 group-data-open:hidden"
                />

                <MinusIcon
                  aria-hidden="true"
                  className="size-6 group-not-data-open:hidden"
                />
              </span>
            </DisclosureButton>
          </dt>
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            <p className="text-base/7 text-gray-600">{question.answer}</p>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </dl>
  );
}
