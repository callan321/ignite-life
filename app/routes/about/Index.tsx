import HeroSection from "~/components/hero-section";

export default function About() {
  return (
    <>
      <title>
        Embrace Bowen Therapy | Expert Manual Therapy & Holistic Healing
      </title>
      <meta
        name="description"
        content="Learn about the Bowen Method – a gentle, strategic approach to manual therapy that activates your body’s self-healing response."
      />
      <meta
        name="robots"
        content="index, follow"
      />
      <meta
        name="keywords"
        content="Bowen Therapy, manual therapy, holistic healing, pain relief, wellness"
      />
      <meta
        property="og:title"
        content="Embrace Bowen Therapy"
      />
      <meta
        property="og:description"
        content="Discover the transformative benefits of Bowen Therapy. Gentle manual techniques to optimize healing."
      />
      <meta
        property="og:image"
        content="https://www.ignitelife.com.au/images/about-og.jpg"
      />
      <meta
        property="og:url"
        content="https://www.ignitelife.com.au/about"
      />
      <meta
        property="og:type"
        content="website"
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:title"
        content="Embrace Bowen Therapy"
      />
      <meta
        name="twitter:description"
        content="Unlock your body’s healing potential with the Bowen Method."
      />
      <meta
        name="twitter:image"
        content="https://www.ignitelife.com.au/images/about-twitter.jpg"
      />

      <HeroSection
        bgcolour="#5A6F5A"
        src="/bowen3.jpg"
        alt="bowen"
      >
        <div className="container-content-sm card">
          <div className="text-center">
            <h4 className="text-heading">EMBRACE BOWEN</h4>
            <p className="text-body">
              Optimise your body’s full potential with Heather’s Bowen Therapy.
              Harnessing holistic principles, Bowen Therapy utilises gentle,
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
              Issues – IBS – Autoimmune Disease Symptoms – Fibromyalgia –
              Gynaecological Concerns – Erectile Dysfunction – Lymphatic
              Imbalances and Central Nervous System Disorders
            </p>
          </div>
        </div>
      </HeroSection>
    </>
  );
}
