"use client";
import { useShoeContext } from "@/contexts/ShoeContext";
import { Shoe } from "@/data/shoes";
import Link from "next/link";

export default function ProductCard({ shoe }: { shoe: Shoe }) {
  const ratingString = `${shoe.rating}`;
  const salesString = `${shoe.totalSales}`;

  const { dispatch } = useShoeContext();

  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden rounded-xl mb-3 group">
        <div
          className="w-full bg-center bg-no-repeat aspect-3/4 bg-cover transition-transform duration-300 group-hover:scale-105"
          data-alt={shoe.name}
          style={{ backgroundImage: `url("${shoe.image}")` }}
          role="img"
          aria-label={shoe.name}
        />
        <button
          onClick={() => {
            dispatch({
              type: "ADD_TO_CART",
              payload: shoe,
            });
          }}
          className="cursor-pointer absolute bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] flex items-center justify-center h-10 px-4 bg-white/80 dark:bg-black/70 backdrop-blur-sm text-text-light dark:text-text-dark text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label={`Add ${shoe.name} to cart`}
          type="button"
        >
          Add to Cart
        </button>
      </div>

      <div>
        <Link
          href={`/explore/${shoe.id}`}
          className="text-base font-medium leading-normal block hover:underline"
          aria-label={`View ${shoe.name}`}
        >
          {shoe.name}
        </Link>
        <p className="text-sm font-normal leading-normal text-subtext-light dark:text-subtext-dark">
          Rs. {shoe.price}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <span
            className="material-symbols-outlined text-yellow-500 text-sm"
            style={{ fontVariationSettings: "'FILL' 1" } as React.CSSProperties}
            aria-hidden
          >
            star
          </span>
          <p className="text-sm font-normal leading-normal text-subtext-light dark:text-subtext-dark">
            {ratingString} ({salesString} sold)
          </p>
        </div>
      </div>
    </div>
  );
}
