export interface ScheduleItem {
  day: string;
  open: string | null;
  close: string | null;
}

export const schedule: ScheduleItem[] = [
  { day: "Monday", open: "9.30 am", close: "3.00 pm" },
  { day: "Tuesday", open: "9.30 am", close: "3.00 pm" },
  { day: "Wednesday", open: "9.30 am", close: "3.00 pm" },
  { day: "Thursday", open: "9.30 am", close: "3.00 pm" },
  { day: "Friday", open: "9.30 am", close: "3.00 pm" },
  { day: "Saturday", open: "8.00 am", close: "12.00 pm" },
  { day: "Sunday", open: null, close: null },
];

export const copyright =
  "\u00A9 2025 Ignite Life Bowen Therapy. All rights reserved.";

export const address = {
  street: "10, Granite St",
  city: "Lennox Head",
  state: "New South Whales",
  postcode: "2478",
  href: "https://maps.app.goo.gl/pUYpBuk9v6sAEFvy8",
};

export const email = {
  email: "ignitelifehealing@gmail.com",
  href: "mailto:ignitelifehealing@gmail.com",
};

export const phone = {
  phone: "0490 034 249",
  href: "tel:0490 034 249",
};
