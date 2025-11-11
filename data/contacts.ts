export type LinkHref = {
  label: string;
  link: string;
};

export type Contact = {
  id?: string;
  title: string;
  links: LinkHref[];
};

export const contacts: Contact[] = [
  {
    title: "sales",
    links: [
      { label: "Men", link: "/men" },
      { label: "Women", link: "/women" },
      { label: "Kids", link: "/kids" },
      { label: "Sales", link: "/sales" },
    ],
  },
  {
    title: "support",
    links: [
      { label: "Contact Us", link: "/contact-us" },
      { label: "FAQ", link: "/faq" },
      { label: "Shipping & Returns", link: "/shipping-returns" },
      { label: "Track Order", link: "/track-order" },
    ],
  },
  {
    title: "company",
    links: [
      { label: "About Us", link: "/about-us" },
      { label: "Careers", link: "/careers" },
      { label: "Press", link: "/press" },
    ],
  },
];
