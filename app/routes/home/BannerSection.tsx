const Bowenforall = {
  title: "Bowen is for Everyone",
  description:
    "Experience the healing benefits of Bowen therapy, tailored for all ages. Whether it's gentle care for your baby, soothing sessions for your child, or comprehensive therapy for adults.",
};

export default function BannerSection() {
  return (
    <section className="bg-[#5A6F5A] section ">
      <div className="container-content ">
        <div className="card">
          <div className=" container-content-sm">
            <h2
              className={`text-4xl parisienne text-center tracking-tight text-black sm:text-6xl`}
            >
              {Bowenforall.title}
            </h2>
            <div className=" w-full flex items-center justify-center mt-6">
              <p className="text-left text-lg leading-8 text-gray-700 sm:text-center">
                {Bowenforall.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
