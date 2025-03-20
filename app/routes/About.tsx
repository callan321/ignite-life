import ContentCard from "~/components/ContentCard";
import HeroSection from "~/components/HeroSection";
import type { Route } from "../../.react-router/types/app/+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return (
    <>
      <HeroSection bgcolour={"#5A6F5A"} src={"/bowen3.jpg"} alt={"bowen"}>
        <ContentCard>
          <div className="text-center">
            <h4 className="text-heading">EMBRACE BOWEN</h4>
            <p className="text-body">
              Optimise your body’s full potential with Heather’s Bowen Therapy.
              Harnessing holistic principles, Bowen Therapy utilizes gentle,
              therapeutic touch to empower your body’s intrinsic ability to heal
              and protect itself.
            </p>
            <br />
            <h4 className="text-heading">THE BOWEN METHOD</h4>
            <p className="text-body">
              Bowen is a strategic form of manual therapy, designed to target
              specific body points, muscles, ligaments, tendons and fascia to
              enhance cellular communication, synchronise brain and nervous
              system function, and facilitate correction of dysfunction to
              restore homeostasis.
            </p>
            <br />
            <h4 className="text-heading">BOWEN CAN HELP</h4>
            <p className="text-body">
              Bowen Therapy is holistic body work and doesn’t force or impose
              changes on the body—it stimulates and ‘asks’ the body to make
              corrections, initiating the human body’s innate self-healing
              response. Therefore, Bowen can be used to treat and help a wide
              variety of issues from musculoskeletal or related neurological
              problems, including acute sports injuries and chronic or organic
              conditions.
            </p>
            <br />
            <h4 className="text-heading">For Example:</h4>
            <p className="text-body">
              Physical Injury – Nerve Pain – Mobility – Sleep – Fatigue –
              Migraines – Grief – Respiratory Issues – Anxiety – Vagus Nerve
              Dysfunction – TMJ Pain – Scoliosis – Digestive Problems – Sinus
              Issues – Respiratory Conditions – IBS – Autoimmune Disease
              Symptoms – Fibromyalgia – Gynaecological Concerns – Erectile
              Dysfunction – Lymphatic Imbalances and Central Nervous System
              Disorders
            </p>
          </div>
        </ContentCard>
      </HeroSection>
    </>
  );
}
