type HeroButtonProps = {
  name: string;
  href: string;
};

export default function HeroButton({ name, href }: HeroButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="button-shadow relative overflow-hidden rounded-lg border border-gray-200/50 bg-gradient-to-r from-[#c49a7b] to-[#b5896f] px-8 py-3 font-semibold tracking-wide text-white uppercase shadow-md transition-all duration-300 ease-out hover:scale-105 hover:border-gray-300/50 hover:from-[#b5896f] hover:to-[#a8755a] hover:shadow-lg focus:ring-2 focus:ring-[#b5896f] focus:ring-offset-2 focus:outline-none"
    >
      {name}
    </a>
  );
}
