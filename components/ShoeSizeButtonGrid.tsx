"use client";
import { filterOptions, Shoe } from "@/data/shoes";
import { useState } from "react";

export default function ShoeSizeButtonGrid({ shoe }: { shoe: Shoe }) {
  const allSizes = filterOptions.size;
  const [sizes, setSizes] = useState<number[]>(shoe.sizes);
  return (
    <>
      {allSizes.map((size) => {
        const selected = sizes.includes(size);
        return (
          <button
            key={size}
            className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              selected
                ? "border border-blue-500 bg-blue-100 text-blue-700 dark:border-blue-400 dark:bg-blue-900 dark:text-blue-200"
                : "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
            }`}
          >
            {size}
          </button>
        );
      })}
    </>
  );
}
