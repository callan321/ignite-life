export default function Carousel() {
    return (
        <div className="w-full max-w-[1960px] mx-auto">
            <div className="relative isolate flex items-center justify-center h-[36rem] md:h-[48rem] lg:h-[64rem] overflow-hidden bg-yellow-800">
                <img
                    src="/rocks.jpg"
                    alt="Slogan"
                    className="absolute inset-0 w-full h-full object-contain"
                />
                <div className="w-96 lg:w-[36rem] text-gray-800 p-8 text-center bg-white opacity-85 shadow-lg">
                    <h1 className="xl:text-6xl lg:text-5xl text-4xl font-sans font-extralight">
                        Complements the Meridian System
                    </h1>
                    <br />
                    <h4 className="xl:text-3xl lg:text-[1.75rem] text-2xl font-serif italic  font-light">
                        Many Bowen moves used are localized on key meridian pathways and acupuncture points enhancing Qi flow and inner health.
                    </h4>
                </div>
            </div>
        </div>
    );
}
