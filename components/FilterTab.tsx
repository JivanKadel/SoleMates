import Link from "next/link";

type FilterTabProps = {
  label: string;
  params: { [key: string]: string | string[] | undefined };
  add?: Record<string, string>;
  remove?: string;
};

export function FilterTab({ label, params, add = {}, remove }: FilterTabProps) {
  const urlParams = new URLSearchParams();

  // Populate URLSearchParams from params
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    if (Array.isArray(value)) {
      value.forEach((v) => urlParams.append(key, v));
    } else {
      urlParams.set(key, value);
    }
  });

  // Remove a filter if needed
  if (remove) urlParams.delete(remove as string);

  // Add new filters
  Object.entries(add).forEach(([key, value]) => {
    urlParams.set(key, value);
  });

  return (
    <Link
      href={`/explore?${urlParams.toString()}`}
      className="flex items-center pb-3 pt-1"
    >
      {label}
    </Link>
  );
}
