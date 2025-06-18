import { useEffect, useState } from "react";
import HeroButton from "./HeroButton";

interface HeroSectionProps {
  title: string;
  content: string;

  backgroundImage: string;
}

export default function HeroSectionCarousel({
  sections,
}: {
  sections: HeroSectionProps[];
}) {
  const TIMEOUT = 15000;
  const [currentSection, setCurrentSection] = useState(0);
  const [prevImage, setPrevImage] = useState<string | null>(null);

  const [titleVisible, setTitleVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  const [fadeOutTitle, setFadeOutTitle] = useState(false);
  const [fadeOutContent, setFadeOutContent] = useState(false);
  const [fadeOutButton, setFadeOutButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOutButton(true);
      setTimeout(() => {
        setFadeOutContent(true);
      }, 600);
      setTimeout(() => {
        setFadeOutTitle(true);
      }, 1200);

      setTimeout(() => {
        setPrevImage(sections[currentSection].backgroundImage);
        setCurrentSection((prevSection) =>
          prevSection === sections.length - 1 ? 0 : prevSection + 1
        );
        setFadeOutTitle(false);
        setFadeOutContent(false);
        setFadeOutButton(false);
        setTitleVisible(false);
        setContentVisible(false);
        setButtonVisible(false);
      }, 2000);
    }, TIMEOUT);

    return () => clearInterval(interval);
  }, [sections.length, currentSection, sections]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setTitleVisible(true);
      setTimeout(() => {
        setContentVisible(true);
      }, 500);
      setTimeout(() => {
        setButtonVisible(true);
      }, 1500);
    }, 1500);

    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [currentSection]);

  return (
    <section className="relative isolate flex min-h-screen items-center justify-center bg-[#bd9479]">
      {/* Previous Image (fades out) */}
      {prevImage && (
        <img
          key={prevImage}
          alt=""
          src={prevImage}
          className={`fade-out absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000`}
        />
      )}

      {/* Current Image (fades in) */}
      <img
        key={sections[currentSection].backgroundImage}
        alt=""
        src={sections[currentSection].backgroundImage}
        className="fade-in absolute inset-0 -z-30 h-full w-full object-cover transition-opacity duration-1000"
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 -z-10 bg-black opacity-25"></div>

      {/* Slogan Overlay */}
      <div className="absolute h-full w-full max-w-7xl">
        <div className="absolute top-12 right-12 flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-md sm:top-14 sm:right-16 md:top-24 md:right-8 md:h-48 md:w-48 lg:top-14 lg:right-16 lg:h-64 lg:w-64 xl:h-72 xl:w-72">
          <img
            src="/slogan.png"
            alt="Slogan"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container-content-sm">
        <div
          key={currentSection}
          className="text-shadow -mt-8 space-y-6 text-center md:space-y-8"
        >
          <h1
            className={`parisienne text-shadow text-4xl tracking-tight text-white sm:text-6xl ${
              titleVisible ? "slide-in" : "opacity-0"
            } ${fadeOutTitle ? "fade-out" : ""}`}
          >
            {sections[currentSection].title}
          </h1>

          <p
            className={`text-3xl ${
              contentVisible ? "slide-in" : "opacity-0"
            } text-shadow leading-8 text-gray-100 ${
              fadeOutContent ? "fade-out" : ""
            }`}
          >
            {sections[currentSection].content}
          </p>

          <div
            className={`flex ${
              buttonVisible ? "slide-in-subtle" : "opacity-0"
            } items-center justify-center gap-x-6 ${
              fadeOutButton ? "fade-out" : ""
            }`}
          >
            <HeroButton
              name={"Book Here "}
              href={"https://ignite-life-bowen-therapy.square.site/"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
