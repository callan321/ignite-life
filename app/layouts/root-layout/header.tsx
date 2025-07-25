import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useCallback, useEffect, useState } from "react";
import DesktopTab from "~/components/desktop-tab";

type TabNavLink = {
  name: string;
  href: string;
  external?: boolean;
};

const navLinks: TabNavLink[] = [
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
  },
];

export default function MainHeader() {
  const [isSolid, setIsSolid] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsSolid(window.scrollY > 100);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header>
      {/* Desktop Navigation */}
      <div
        className={`fixed top-0 z-40 hidden w-full transition-all duration-300 ease-in-out md:block ${
          isSolid
            ? "bg-[#8E6F5B] py-4 pt-8 shadow-xl backdrop-blur-lg"
            : "bg-transparent pt-14"
        } `}
      >
        {/* Added flex, items-center, and justify-between here */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
          <nav className="ml-6 hidden sm:gap-6 md:flex lg:gap-8">
            {navLinks.map((tab: { name: string; href: string }) => (
              <DesktopTab
                key={tab.href}
                name={tab.name}
                href={tab.href}
              />
            ))}
          </nav>
          <div className="mr-6 hidden sm:flex lg:mr-12">
            <span
              className={`great-vibes text-gold text-shadow text-3xl leading-tight font-medium text-gray-100 lg:text-4xl ${isSolid ? "" : "hidden"} `}
            >
              Ignite Life
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      {!isMobileMenuOpen && (
        <div className="fixed top-0 z-40 flex items-center bg-transparent p-8 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              className="h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <Dialog
        open={isMobileMenuOpen}
        onClose={setIsMobileMenuOpen}
        className="z-50 md:hidden"
      >
        <div className="fixed inset-0 z-10" />

        <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="-m-1.5 p-1.5"
            >
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
              <XMarkIcon
                className="h-6 w-6"
                aria-hidden="true"
              />
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
