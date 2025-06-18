import CurvedImage from "~/components/CurvedImage";
import HeroButton from "~/components/HeroButton";

export type Treatment = {
  title: string;
  description: string;
  age: string;
  imageUrl: string;
};

export type TreatmentsSectionProps = {
  treatments: Treatment[];
  content: TreatmentSectionContent;
};

export type TreatmentSectionContent = {
  title: string;
  description: string;
};

export default function TreatmentsSection({
  treatments,
  content,
}: TreatmentsSectionProps) {
  return (
    <section className="section">
      <div className="container-content">
        <div className="container-content-sm">
          <h2
            className={`parisienne text-center text-4xl tracking-tight text-black sm:text-6xl`}
          >
            {content.title}
          </h2>
          <div className="mt-6 flex w-full items-center justify-center">
            <p className="text-left text-lg leading-8 text-gray-700 sm:text-center">
              {content.description}
            </p>
          </div>
        </div>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
          {treatments.map((treatment) => (
            <div key={treatment.title} className="flex flex-col">
              <dt className="text-base leading-7 font-semibold text-white">
                <div className="flex items-center justify-between">
                  <CurvedImage src={treatment.imageUrl} alt={treatment.title} />
                </div>
                <h3 className="mt-2 p-6 text-center text-2xl text-gray-800 lg:p-8">
                  {treatment.title}
                </h3>
                <h4 className="-mt-6 text-center text-gray-600">
                  {treatment.age}
                </h4>
              </dt>
              <dd className="mt-3 flex flex-auto flex-col items-center text-base leading-7 text-gray-700">
                <div className="px-6 sm:w-full sm:px-0">
                  <p className="flex-auto">{treatment.description}</p>
                </div>
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col items-center justify-center space-y-8 pt-8">
          <HeroButton
            name={"Click see more"}
            href={"https://ignite-life-bowen-therapy.square.site"}
          />
        </div>
      </div>
    </section>
  );
}
