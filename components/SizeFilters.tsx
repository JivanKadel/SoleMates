import { filterOptions } from "@/data/shoes";

export default function SizeFilters() {
  return (
    <>
      {filterOptions.size.map((size, index) => {
        return (
          <button
            key={index}
            className={`p-2 rounded-md border-2 border-black/10 dark:border-white/10 text-xs font-medium hover:border-accent cursor-pointer`}
          >
            {size}
          </button>
        );
      })}
    </>
  );
}
