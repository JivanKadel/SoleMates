import { CartDrawerContext } from "@/contexts/DrawerContext";
import Link from "next/link";
import { useContext } from "react";

export default function ItemsNotFound() {
  const { toggleOpen } = useContext(CartDrawerContext);

  return (
    <div className="h-full flex items-center justify-center px-4">
      <div
        role="status"
        className="w-full max-w-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl px-8 py-10 shadow-lg text-center"
      >
        <div className="flex justify-center mb-4">
          <span
            className="material-symbols-outlined text-7xl text-rose-500"
            aria-hidden="true"
            style={{ lineHeight: 1, fontSize: "48px" }}
          >
            shopping_cart_off
          </span>
        </div>

        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
          404 — Items Not Found
        </h2>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
          Looks like your cart is empty. Find your next favorite pair of shoes.
        </p>

        <Link
          href="/explore"
          onClick={toggleOpen}
          className="inline-block bg-rose-600 hover:bg-rose-700 focus-visible:ring-4 focus-visible:ring-rose-300 text-white px-5 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
        >
          Explore Shoes
        </Link>
      </div>
    </div>
  );
}
