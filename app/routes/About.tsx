import type { Route} from "../../.react-router/types/app/+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function About() {
    return (
        <>
            <div className="w-full max-w-[1960px] mx-auto">
                <div
                    className="relative isolate flex items-center justify-center h-[36rem] md:h-[48rem] lg:h-[64rem] overflow-hidden bg-[#5A6F5A]">
                    <img
                        src="/bowen3.jpg"
                        alt="Slogan"
                        className="h-full absolute  w-[96rem] object-center"
                    />
                    <div
                        className="
            absolute
            top-4 right-4
            sm:top-8 sm:right-8
            md:top-16 md:right-16
            flex items-center justify-center
            h-36 w-36
            md:h-48 md:w-48
            lg:h-72 lg:w-72
            rounded-full bg-white shadow-md
          "
                    >
                        <img
                            src="/slogan.png"
                            alt="Slogan"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div
                        className="w-96 lg:w-[44rem] text-gray-800 p-8 text-center bg-white rounded border-gray-50 opacity-85 shadow-lg">
                        <h4 className="text-[#7f6000]">EMBRACE BOWEN</h4>
                        <p>Optimise your body’s full potential with Heather’s Bowen Therapy. Harnessing holistic
                            principles
                            Bowen
                            Therapy utilizes gentle, therapeutic touch to empower your body’s intrinsic ability to heal
                            and
                            protect
                            itself.
                        </p>
                        <br/>
                        <h4 className="text-[#7f6000]">THE BOWEN METHOD</h4>
                        <p>Bowen is a strategic form of manual therapy, designed to target specific body points,
                            muscles,
                            ligaments,
                            tendons and fascia to enhance cellular communication synchronise brain and nervous system
                            function and
                            facilitate correction of the dysfunction to restore homeostasis.
                        </p>
                        <br/>
                        <h4 className="text-[#7f6000]">
                            BOWEN CAN HELP
                        </h4>
                        <p>Bowen Therapy is holistic body work and doesn’t force or impose changes on the body, it
                            stimulates and
                            ‘asks’ the body to make corrections, it initiates the human body’s innate self-healing
                            response.
                            Therefore, Bowen can used to treat and help a wide variety of problems from musculoskeletal
                            or
                            related
                            neurological problems including acute sports injuries and chronic or organic conditions.
                        </p>
                        <br/>
                        <h4 className="text-[#7f6000]">
                            For Example:
                        </h4>
                        <p>
                            Physical Injury – Nerve Pain – Mobility – Sleep – Fatigue – Migraines – Grief -Respiratory
                            Issues –
                            Anxiety– Vagus Nerve Dysfunction – TMJ Pain – Scoliosis – Digestive Problems – Sinus Issues
                            –
                            Respiratory
                            Conditions - IBS –Autoimmune Disease Symptoms –Fibromyalgia - Gynaecological Concerns –
                            Erectile
                            Dysfunction - Lymphatic Imbalances and Central Nervous System Disorders
                        </p>
                    </div>

                </div>
            </div>

        </>
    )
}
