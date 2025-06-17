import { NavLink } from "react-router";

interface DesktopTabProps {
  name: string;
  href: string;
}

export default function DesktopTab({ name, href }: DesktopTabProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `${isActive ? "tab-active" : "tab-inactive"} 
          
         relative inline-flex items-center p-1 text-lg font-medium`
      }
    >
      {name}
    </NavLink>
  );
}
