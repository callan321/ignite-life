import { hours } from "../config/config.ts";
import Meta from "../utils/Meta.tsx";
import IconList from "../components/ui/IconList.tsx";
import ContactForm from "../components/ui/ContactForm.tsx";
import { contactDetails } from "../config/contactConfig.tsx";

const sections = [
  {
    key: "contact-info",
    title: "Get in touch",
    content: (
      <>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Have a question about Bowen therapy or a general inquiry? Leave us a
          message or contact us on social media.
        </p>
        <div className="pt-8">
          <IconList items={contactDetails} />
        </div>
      </>
    ),
  },
  {
    key: "contact-form",
    title: "Have a Question?",
    content: (
      <div className="pt-6">
        <ContactForm />
      </div>
    ),
  },
  {
    key: "open-hours",
    title: "Open Hours",
    content: (
      <>
        <div className="pt-8">
          <div className="flex w-full flex-col">
            <div className="space-y-1">
              {hours.map((hour) => (
                <div key={hour.day} className="text-left text-sm sm:text-lg">
                  <div className="font-medium">{hour.day}</div>
                  <div>{hour.hours}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    key: "map",
    title: "Maps",
    content: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3495.863749618485!2d153.5940622!3d-28.813133900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b907e173f2167ab%3A0xf57717e990379006!2s10%20Granite%20St%2C%20Lennox%20Head%20NSW%202478!5e0!3m2!1sen!2sau!4v1723341407364!5m2!1sen!2sau"
        width="600"
        height="450"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="pt-8"
      ></iframe>
    ),
  },
];

export default function Contact() {
  return (
    <>
      <Meta
        title="Ignite Life - Contact Us"
        description="Get in touch with Ignite Life for inquiries about Bowen Therapy or general questions. Contact us through our form, phone, email, or social media."
        keywords="Contact Ignite Life, Bowen Therapy inquiries, get in touch, contact form, phone, email, social media"
      />
      <div className="relative isolate bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          {sections.map(({ key, title, content }) => (
            <div
              className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48"
              key={key}
            >
              <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                {title && (
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    {title}
                  </h2>
                )}
                {content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
