import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export type AccordionItem = {
  title: string;
  content: string;
};

export type AccordionProps = {
  items: AccordionItem[];
};

export default function Accordion({ items }: AccordionProps) {
  return (
    <dl className="divide-y divide-gray-900/10">
      {items.map((item) => (
        <AccordionItemWithAnimation
          key={item.title}
          item={item}
        />
      ))}
    </dl>
  );
}

function AccordionItemWithAnimation({ item }: { item: AccordionItem }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>(0);

  return (
    <Disclosure
      as="div"
      className="py-6 first:pt-0 last:pb-0"
      defaultOpen={false}
    >
      {({ open }) => (
        <AccordionContent
          item={item}
          isOpen={open}
          panelRef={panelRef}
          height={height}
          setHeight={setHeight}
        />
      )}
    </Disclosure>
  );
}

function AccordionContent({
  item,
  isOpen,
  panelRef,
  height,
  setHeight,
}: {
  item: AccordionItem;
  isOpen: boolean;
  panelRef: React.RefObject<HTMLDivElement | null>;
  height: string | number;
  setHeight: React.Dispatch<React.SetStateAction<string | number>>;
}) {
  // Update height when isOpen changes
  useEffect(() => {
    if (isOpen && panelRef.current) {
      setHeight(panelRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen, panelRef, setHeight]);

  return (
    <>
      <dt>
        <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
          <span className="text-base/7 font-semibold">{item.title}</span>
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
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: `${height}px` }}
      >
        <DisclosurePanel
          as="dd"
          static
          className="mt-2 pr-12"
          ref={panelRef}
        >
          <p className="text-base/7 text-gray-600">{item.content}</p>
        </DisclosurePanel>
      </div>
    </>
  );
}
