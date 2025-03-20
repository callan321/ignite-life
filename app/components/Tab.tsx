import { NavLink } from "react-router";

export default function Tab({
  name,
  href,
  external = false,
}: {
  name: string;
  href: string;
  external?: boolean;
}) {
  // Common styles
  const baseClasses = `whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-all duration-300`;
  const activeClasses = "border-indigo-500 text-indigo-600";
  const inactiveClasses =
    "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";

  return external ? (
    <a
      href={href}
      className={`${baseClasses} ${inactiveClasses}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  ) : (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {name}
    </NavLink>
  );
}
