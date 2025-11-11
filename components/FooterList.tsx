import { Contact } from "@/data/contacts";

export default function FooterList({ contact }: { contact: Contact }) {
  return (
    <div>
      <h3 className="font-bold text-text-light-primary dark:text-text-dark-primary mb-4 capitalize">
        {contact.title}
      </h3>
      <ul className="space-y-3">
        {contact.links.map(({ label, link }) => (
          <li key={label}>
            <a
              href={link}
              className="text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-primary dark:hover:text-primary"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
