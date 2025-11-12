"use client";
import { filterOptions } from "@/data/shoes";
import { useEffect, useState } from "react";
import RangeSlider from "./RangeSlider";
import SizeFilters from "./SizeFilters";

export default function Filters() {
  const [range, setRange] = useState<{ min: number; max: number }>({
    min: 1000,
    max: 8000,
  });

  useEffect(() => {
    console.log(range.min, range.max);
  }, [range]);

  const onMinimumChange = (value: number) => {
    setRange((prev) => ({ ...prev, min: value }));
  };

  const onMaximumChange = (value: number) => {
    setRange((prev) => ({ ...prev, max: value + 5000 }));
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm">Gender</h3>
            <div className="flex flex-col gap-2 pl-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" />
                <span>Women</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" />
                <span>Men</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" />
                <span>Unisex</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm">
              Size (US) <span>{}</span>
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              <SizeFilters />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm">Price Range</h3>
            <RangeSlider
              onMinimumChange={onMinimumChange}
              onMaximumChange={onMaximumChange}
            />
            <div className="flex justify-between text-xs text-muted w-full max-w-[300px]">
              <span>$50</span>
              <span>$250</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 mt-4">
          <button className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-accent hover:bg-accent/90 text-white text-sm font-bold leading-normal tracking-[0.015em]">
            Apply Filters
          </button>
          <button className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-foreground  hover:bg-black/10 dark:hover:bg-white/10 text-sm font-bold leading-normal tracking-[0.015em]">
            Clear All
          </button>
        </div>
      </div>
    </aside>
  );
}
