import type { Route } from "../+types/root";
import Carousel from "~/components/Carousel";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Bowenforall = {
  title: "Bowen is for Everyone",
  description:
    "Experience the healing benefits of Bowen therapy, tailored for all ages. Whether it's gentle care for your baby, soothing sessions for your child, or comprehensive therapy for adults.",
};

export default function Home() {
  return (
    <div className="flex flex-col lg:space-y-20 space-y-16">
      <Carousel />

      {/* Hero Section*/}
      <section className="container-content">
        <h2
          className={`mt-2 text-3xl parisienne text-center tracking-tight text-black sm:text-6xl`}
        >
          {Bowenforall.title}
        </h2>
        <div className=" w-full flex items-center justify-center mt-6">
          <div className="max-w-2xl">
            <p className="text-left text-lg leading-8 text-gray-700 sm:text-center">
              {Bowenforall.description}
            </p>
          </div>
        </div>
      </section>

      {/* Treatments Section*/}
    </div>
  );
}
