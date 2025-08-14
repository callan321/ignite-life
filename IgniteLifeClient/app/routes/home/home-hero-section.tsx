import { useEffect, useState } from "react";
import HeroButton from "~/components/hero-button";
import IgniteLifeSlogan from "~/components/ignite-life-slogan";
import { useAutoAdvance } from "~/hooks/use-auto-advance";

export type HeroSectionItem = {
  title: string;
  content: string;
  backgroundImage: string;
};

export type HeroSectionProps = {
  sections: [HeroSectionItem, ...HeroSectionItem[]];
};

export default function HomeHeroSection({ sections }: HeroSectionProps) {
  const TIMEOUT = 15000;
  const [currentSection, setCurrentSection] = useState(0);
  const [prevImage, setPrevImage] = useState<string | null>(null);

  const [titleVisible, setTitleVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  const [fadeOutTitle, setFadeOutTitle] = useState(false);
  const [fadeOutContent, setFadeOutContent] = useState(false);
  const [fadeOutButton, setFadeOutButton] = useState(false);

  const currentItem = sections[currentSection]!;

  useAutoAdvance(sections.length, TIMEOUT, () => {
    setFadeOutButton(true);
    setTimeout(() => setFadeOutContent(true), 600);
    setTimeout(() => setFadeOutTitle(true), 1200);

    setTimeout(() => {
      setPrevImage(currentItem.backgroundImage);
      setCurrentSection((prev) =>
        prev === sections.length - 1 ? 0 : prev + 1,
      );
      setFadeOutTitle(false);
      setFadeOutContent(false);
      setFadeOutButton(false);
      setTitleVisible(false);
      setContentVisible(false);
      setButtonVisible(false);
    }, 2000);
  });

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setTitleVisible(true);
      setTimeout(() => setContentVisible(true), 500);
      setTimeout(() => setButtonVisible(true), 1500);
    }, 1500);

    return () => clearTimeout(visibilityTimeout);
  }, [currentSection]);

  return (
    <section className="relative isolate flex min-h-screen items-center justify-center bg-[#bd9479]">
      {prevImage && (
        <img
          key={prevImage}
          alt=""
          src={prevImage}
          className="fade-out absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000"
        />
      )}

      <img
        key={currentItem.backgroundImage}
        alt=""
        src={currentItem.backgroundImage}
        className="fade-in absolute inset-0 -z-30 h-full w-full object-cover transition-opacity duration-1000"
      />
      <div className="image-black-overlay -z-10" />
      <IgniteLifeSlogan />

      <div className="container-content-sm">
        <div
          key={currentSection}
          className="text-shadow -mt-8 space-y-6 text-center md:space-y-8"
        >
          <h1
            className={`parisienne text-shadow text-4xl tracking-tight text-white sm:text-5xl md:text-6xl ${
              titleVisible ? "slide-in" : "opacity-0"
            } ${fadeOutTitle ? "fade-out" : ""}`}
          >
            {currentItem.title}
          </h1>

          <p
            className={`text-3xl ${
              contentVisible ? "slide-in" : "opacity-0"
            } text-shadow text-sm text-gray-100 md:text-lg lg:leading-8 xl:text-2xl ${
              fadeOutContent ? "fade-out" : ""
            }`}
          >
            {currentItem.content}
          </p>

          <div
            className={`flex ${
              buttonVisible ? "slide-in-subtle" : "opacity-0"
            } items-center justify-center gap-x-6 ${
              fadeOutButton ? "fade-out" : ""
            }`}
          >
            <HeroButton
              name="Book Here"
              href="https://ignite-life-bowen-therapy.square.site/"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
