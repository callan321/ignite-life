import HeroSection from "~/components/HeroSection";
import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Heather() {
  return (
    <>
      <HeroSection bgcolour={"#5A6F5A"} src={"/bowen3.jpg"} alt={"bowen"}>
        <div className="container-content-sm card">
          <div className="text-center">
            <h4 className="text-heading">
              Embracing Change, Healing, Compassion, and Purpose: My Path
            </h4>
            <br />
            <p className="text-body">
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
            <p className="text-body">
              I welcome you to my practice, where I am committed to assisting
              you in activating your inherent healing potential, enriching your
              well-being and attaining optimal vitality, with the aid of Bowen
              therapy’s transformative power.
            </p>
            <br />
            <p className="text-body">With much warmth</p>
            <p className="text-body">
              I look forward to meeting and helping you
            </p>
            <p className="text-body">Heather</p>
          </div>
        </div>
      </HeroSection>
    </>
  );
}
