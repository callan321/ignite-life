import { NavLink } from "react-router";

export type TabProps = {
  name: string;
  href: string;
  external?: boolean;
  isSolid?: boolean;
};

export default function Tab({
  name,
  href,
  external = false,
  isSolid = false,
}: TabProps) {
  const baseClasses =
    "relative inline-flex items-center p-1 text-lg font-medium";

  if (external) {
    return (
      <a
        href={href}
        className={`tab-inactive ${
          isSolid ? "bottom-solid" : "bottom-normal"
        } ${baseClasses}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
    );
  }

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `${isActive ? "tab-active" : "tab-inactive"} ${
          isSolid ? "bottom-solid" : "bottom-normal"
        } ${baseClasses}`
      }
    >
      {name}
    </NavLink>
  );
}
