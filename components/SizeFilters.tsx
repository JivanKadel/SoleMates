import { filterOptions } from "@/data/shoes";

interface SizeFiltersProps {
  selectedSizes: number[];
  setSelectedSizes: React.Dispatch<React.SetStateAction<number[]>>; // <- fix here
}

export default function SizeFilters({
  selectedSizes,
  setSelectedSizes,
}: SizeFiltersProps) {
  const toggleSize = (size: number) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <>
      {filterOptions.size.map((size, index) => {
        const isSelected = selectedSizes.includes(size);
        return (
          <button
            key={index}
            onClick={() => toggleSize(size)}
            className={`p-2 rounded-md border-2 text-xs font-medium cursor-pointer
              ${
                isSelected
                  ? "border-accent bg-accent/20"
                  : "border-black/10 dark:border-white/10"
              }
              hover:border-accent`}
          >
            {size}
          </button>
        );
      })}
    </>
  );
}
