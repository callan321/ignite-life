import HeroSection from "~/components/HeroSection";
import type { Route } from "../../.react-router/types/app/+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Heather() {
  return (
    <>
      <HeroSection>
        <div className="w-96 lg:w-[44rem] text-gray-800 p-8 text-center bg-white rounded border-gray-50 opacity-85 shadow-lg">
          <h4 className="text-[#7f6000] font-medium text-2xl">
            {" "}
            Embracing Change, Healing, Compassion, and Purpose: My Path
          </h4>
          <br />
          <p>
            With my family’s growth came a newfound clarity: it was time to
            evolve from a stagnant career of fashion to a more fulfilling path
            that harmonizes my personal principles with my professional
            pursuits. Choosing to take the “road less travelled”, in returning
            to years of study to become a Specialised Bowen Therapist. This
            decision has been a transformative experience, guiding me to a
            destination where my personal values of spreading kindness,
            compassion and service to humanity, has led me to a career that is
            both purpose-driven, profoundly rewarding and deeply fulfilling.
          </p>
          <br />
          <p>
            I welcome you to my practice, where I am committed to assisting you
            in activating your inherent healing potential, enriching your
            well-being and attaining optimal vitality, with the aid of Bowen
            therapy’s transformative power.
          </p>
          <br />
          <p>With much warmth</p>

          <p>I look forward to meeting and helping you</p>
          <p>Heather</p>
        </div>
      </HeroSection>
    </>
  );
}
