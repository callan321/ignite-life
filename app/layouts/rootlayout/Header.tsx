import { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { Dialog, DialogPanel } from "@headlessui/react";
import DesktopTabs from "~/components/DesktopTab";
import DesktopTab from "~/components/DesktopTab";

interface NavLink {
  name: string;
  href: string;
  external?: boolean;
}

function Tab({
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

export const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Get to Know Me", href: "/heather" },
  { name: "About Bowen Therapy", href: "/about" },
  {
    name: "Book an Appointment",
    href: "https://ignite-life-bowen-therapy.square.site",
    external: true,
  },
  {
    name: "Gift Cards",
    href: "https://app.squareup.com/gift/MLTJEAT3PV4WZ/order",
    external: true,
  }
];

export default function Header() {
  const [isSolid, setIsSolid] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsSolid(window.scrollY > 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header>
      {/* Desktop Navigation */}
      <div
        className={`fixed top-0 z-40 hidden w-full transition-all duration-300 ease-in-out md:block
    ${
      isSolid
        ? "bg-[#8E6F5B] backdrop-blur-lg pt-8 shadow-xl py-4"
        : "bg-transparent pt-14"
    }
  `}
      >
        {/* Added flex, items-center, and justify-between here */}
        <div className="mx-auto max-w-7xl px-8 flex items-center justify-between">
          <nav className="hidden sm:flex sm:ml-6 sm:gap-8">
            {navLinks.map((tab: { name: string; href: string }) => (
              <DesktopTab key={tab.href} name={tab.name} href={tab.href} />
            ))}
          </nav>
          <div className="hidden lg:mr-12 mr-6 sm:flex">
            <span
              className={`text-gold great-vibes text-shadow text-4xl font-medium leading-tight text-gray-100
                ${isSolid ? "" : "hidden"}
                `}
            >
              Ignite Life
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      {!isMobileMenuOpen && (
        <div className="flex items-center bg-transparent fixed top-0 z-40 p-8 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <Dialog
        open={isMobileMenuOpen}
        onClose={setIsMobileMenuOpen}
        className="md:hidden z-50 "
      >
        <div className="fixed inset-0 z-10" />

        <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Ignite Life Bowen Therapy</span>
              <img
                alt="Your Company Logo"
                src="/favicon.png"
                className="h-8 w-auto"
              />
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 py-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
