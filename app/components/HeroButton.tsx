export default function HeroButton({
                                       name,
                                       href,
                                   }: {
    name: string;
    href: string;
}) {
    return (
        <a
            href={href}
            target="_blank" // Opens in a new tab (optional, remove if not needed)
            rel="noopener noreferrer"
            className="text-shadow shadow-button hover:shadow-button-xl relative overflow-hidden rounded-md border-2 border-white/75 bg-[#bd9479] px-6 py-3 font-bold uppercase tracking-wide text-white transition-all duration-500 ease-in-out hover:scale-105 hover:border-gray-100 hover:bg-[#b5896f] hover:text-gray-100 text-center"
        >
            {name}
        </a>
    );
}
