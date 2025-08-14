import { NavLink } from "react-router";

export type DesktopTabProps = {
  name: string;
  href: string;
};

export default function DesktopTab({ name, href }: DesktopTabProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `${isActive ? "tab-active" : "tab-inactive"} relative inline-flex items-center p-1 text-sm font-medium lg:text-lg`
      }
    >
      {name}
    </NavLink>
  );
}
