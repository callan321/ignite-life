import type { Route } from "../+types/root";
import Carousel from "~/components/Carousel";
import PageLayout from "~/components/PageLayout";
import CurvedImage from "~/components/CurvedImage";
import HeroButton from "~/components/HeroButton";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Bowenforall  = {
  title: "Bowen is for Everyone",
  description:
      "Experience the healing benefits of Bowen therapy, tailored for all ages. Whether it's gentle care for your baby, soothing sessions for your child, or comprehensive therapy for adults.",
};


const treatments = [
  {
    title: "Grown-ups",
    description: "Throughout life, we encounter numerous complex experiences, Bowen provides valuable support to alleviate the lasting effects of emotional and physical challenges.",
    age: "19-90 yrs",
    image: "/all.png",
  },
  {
    title: "Little Muchkins",
    description: "Amidst your babies suffering, Ignite Life’s Baby Bowen presents a gentle yet effective solution, promptly easing distress and physical discomfort.",
    age: "0-4 yrs",
    image: "/baby.png",
  },
  {
    title: "Big Kids",
    description: "As our children grow, the challenges they face can impact their well-being. Bowen helps with emotional balance, growing pains, injuries and stress.",
    image: "/teenager.png",
    age: "5-19 yrs",
  },
];




export default function Home() {
  return (
      <div className="flex flex-col lg:space-y-20 space-y-16">
        <Carousel/>
        <PageLayout>
          {/* Hero Section*/}
          <section>
            <h2 className={`mt-2 text-3xl parisienne   text-center tracking-tight text-black sm:text-6xl`}>
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
          <section>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              {treatments.map((treatment) => (
                  <div key={treatment.title} className="flex flex-col">
                    <dt className="text-base font-semibold leading-7 text-white">
                      <div className="flex items-center justify-between">
                        <CurvedImage src={treatment.image} alt={treatment.title}/>
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
                      <HeroButton name={"Click here to learn more"} href={""}/>
                    </div>
                  </div>
              ))}
            </dl>
          </section>
        </PageLayout>

        <div className="bg-yellow-800  py-24 sm:py-32">
          <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-center text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
            <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
              Everything you need to deploy your app
            </p>
            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
              <div className="relative lg:row-span-2">
                <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                <div
                    className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                  <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Mobile friendly
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                      commodo.
                    </p>
                  </div>
                  <div
                      className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                    <div
                        className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                      <img
                          className="size-full object-cover object-top"
                          src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png"
                          alt=""
                      />
                    </div>
                  </div>
                </div>
                <div
                    className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
              </div>
              <div className="relative max-lg:row-start-1">
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                <div
                    className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Performance</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit.
                    </p>
                  </div>
                  <div
                      className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                    <img
                        className="w-full max-lg:max-w-xs"
                        src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                        alt=""
                    />
                  </div>
                </div>
                <div
                    className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
              </div>
              <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                <div className="absolute inset-px rounded-lg bg-white"></div>
                <div
                    className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Security</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper
                      morbi.
                    </p>
                  </div>
                  <div
                      className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                    <img
                        className="h-[min(152px,40cqw)] object-cover"
                        src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                        alt=""
                    />
                  </div>
                </div>
                <div
                    className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
              </div>
              <div className="relative lg:row-span-2">
                <div
                    className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                <div
                    className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                  <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Powerful APIs
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales
                      gravida.
                    </p>
                  </div>
                  <div className="relative min-h-[30rem] w-full grow">
                    <div
                        className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                          <div
                              className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            NotificationSetting.jsx
                          </div>
                          <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                        </div>
                      </div>
                      <div className="px-6 pb-14 pt-6">{/* Your code example */}</div>
                    </div>
                  </div>
                </div>
                <div
                    className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
