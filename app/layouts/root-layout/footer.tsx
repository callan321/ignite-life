import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/16/solid";
import type { JSX, SVGProps } from "react";
import GoogleMapEmbedded from "~/components/google-map-embedded";
import { address, copyright, email, phone, schedule } from "./data";

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/ignitelifehealing/",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ignite.life_bowen.therapy/",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ignitelifehealings",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export default function MainFooter() {
  return (
    <footer className="container-content">
      <div className="grid-cols-1 pt-12 md:grid-cols-2 xl:grid xl:space-x-8">
        <div className="flex items-center justify-center">
          <div className="aspect-[4/3] w-full">
            <GoogleMapEmbedded />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 pt-12 md:grid-cols-2 xl:pt-0">
            <div>
              <h3 className="text-base text-gray-800 underline decoration-gray-300 underline-offset-8">
                Contact
              </h3>
              <dl className="mt-6 space-y-4 text-base/7 text-gray-800">
                <a
                  className="flex gap-x-4"
                  href={address.href}
                >
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <MapPinIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-gray-600"
                    />
                  </dt>
                  <dd>
                    {address.street}, {address.city}
                    <br />
                    {address.state}, {address.postcode}
                    <br />
                  </dd>
                </a>
                <a
                  className="flex gap-x-4"
                  href={phone.href}
                >
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-gray-600"
                    />
                  </dt>
                  <dd>
                    <div className="hover:text-gray-900">{phone.phone}</div>
                  </dd>
                </a>
                <a
                  className="flex gap-x-4"
                  href={email.href}
                >
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-gray-600"
                    />
                  </dt>
                  <dd>
                    <div className="hover:text-gray-900">{email.email}</div>
                  </dd>
                </a>
              </dl>
            </div>
            <div className="pt-12 md:pt-0">
              <div className="w-full">
                <h3 className="text-base text-gray-800 underline decoration-gray-300 underline-offset-8">
                  Opening Hours
                </h3>
                <ul
                  role="list"
                  className="mt-4 space-y-1 text-left"
                >
                  {schedule.map((item) => (
                    <li
                      key={item.day}
                      className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2 text-sm text-gray-800"
                    >
                      <span>{item.day}</span>
                      {item.open && item.close ? (
                        <>
                          <span className="min-w-[4rem] text-right tabular-nums">
                            {item.open}
                          </span>
                          <span className="text-center">–</span>
                          <span className="min-w-[4rem] text-right tabular-nums">
                            {item.close}
                          </span>
                        </>
                      ) : (
                        <span className="col-span-3 text-right">Closed</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between">
        <div className="flex gap-x-6 md:order-2">
          {socials.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-gray-800"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon
                aria-hidden="true"
                className="size-6"
              />
            </a>
          ))}
        </div>
        <p className="mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
