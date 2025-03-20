export default function Treatments() {
  return (
    <section className="container-content">
      <dl className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
        {treatments.map((treatment) => (
          <div key={treatment.title} className="flex flex-col">
            <dt className="text-base font-semibold leading-7 text-white">
              <div className="flex items-center justify-between">
                <CurvedImage src={treatment.image} alt={treatment.title} />
              </div>
              <h3 className="mt-2 p-6 text-center text-2xl text-gray-800 lg:p-8">
                {treatment.title}
              </h3>
              <h4 className="text-center -mt-6 text-gray-600">
                {treatment.age}
              </h4>
            </dt>
            <dd className="mt-3 flex flex-auto flex-col items-center text-base leading-7 text-gray-700">
              <div className="px-6 sm:w-full sm:px-0">
                <p className="flex-auto">{treatment.description}</p>
              </div>
            </dd>
            <div className="flex items-center justify-center pt-5">
              <HeroButton name={"Click here to learn more"} href={""} />
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
