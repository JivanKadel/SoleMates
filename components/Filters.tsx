"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RangeSlider from "./RangeSlider";
import SizeFilters from "./SizeFilters";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [gender, setGender] = useState<string | null>(null); // only one gender
  const [range, setRange] = useState<{ min: number; max: number }>({
    min: 1000,
    max: 8000,
  });
  const [sizes, setSizes] = useState<number[]>([]); // SizeFilters

  useEffect(() => {
    const gendersParam = searchParams.get("gender");
    if (gendersParam) setGender(gendersParam.toLowerCase());
    else setGender(null);

    const minPrice = Number(searchParams.get("minPrice") ?? 1000);
    const maxPrice = Number(searchParams.get("maxPrice") ?? 8000);
    setRange({ min: minPrice, max: maxPrice });

    const sizesParam = searchParams.get("size");
    if (sizesParam) setSizes(sizesParam.split(",").map(Number));
    else setSizes([]);
  }, [searchParams]);

  const toggleGender = (g: string) => {
    setGender((prev) => (prev === g ? null : g)); // select or unselect
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Gender
    if (gender) params.set("gender", gender);
    else params.delete("gender");

    // Sizes
    if (sizes.length) params.set("size", sizes.join(","));
    else params.delete("size");

    // Price
    params.set("minPrice", range.min.toString());
    params.set("maxPrice", range.max.toString());

    router.push(`/explore?${params.toString()}`);
  };

  const clearAll = () => {
    setGender(null);
    setSizes([]);
    setRange({ min: 1000, max: 8000 });
    router.push(`/explore`);
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0">
      <div className="sticky top-24 flex flex-col gap-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold leading-normal">Filters</h2>
          <p className="text-sm font-normal leading-normal text-muted">
            Refine your Search
          </p>
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm">Gender</h3>
          <div className="flex flex-col gap-2 pl-2">
            {["Women", "Men", "Unisex"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={gender === g.toLowerCase()}
                  onChange={() => toggleGender(g.toLowerCase())}
                />
                <span>{g}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-sm">Size (US)</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <SizeFilters selectedSizes={sizes} setSelectedSizes={setSizes} />
          </div>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-sm">Price Range</h3>
          <RangeSlider
            min={range.min}
            max={range.max}
            onMinimumChange={(val) => setRange((p) => ({ ...p, min: val }))}
            onMaximumChange={(val) => setRange((p) => ({ ...p, max: val }))}
          />
          <div className="flex justify-between text-xs text-muted w-full max-w-[300px]">
            <span>Rs. {range.min}</span>
            <span>Rs. {range.max}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center items-center gap-2 mt-4">
          <button
            onClick={applyFilters}
            className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-accent hover:bg-accent/90 text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            Apply Filters
          </button>
          <button
            onClick={clearAll}
            className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-foreground hover:bg-black/10 dark:hover:bg-white/10 text-sm font-bold leading-normal tracking-[0.015em]"
          >
            Clear All
          </button>
        </div>
      </div>
    </aside>
  );
}
