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
      target="_blank"
      rel="noopener noreferrer"
      className="relative overflow-hidden button-shadow text-white rounded-lg border border-gray-200/50 bg-gradient-to-r from-[#c49a7b] to-[#b5896f] px-8 py-3 font-semibold uppercase tracking-wide shadow-md transition-all duration-300 ease-out hover:scale-105 hover:border-gray-300/50 hover:shadow-lg hover:from-[#b5896f] hover:to-[#a8755a] focus:outline-none focus:ring-2 focus:ring-[#b5896f] focus:ring-offset-2"
    >
      {name}
    </a>
  );
}
