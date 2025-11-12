import Filters from "@/components/Filters";
import ShoesGrid from "@/components/ShoesGrid";
import Link from "next/link";

export default function ExplorePage() {
  return (
    <main className="container mx-auto flex flex-1 px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex w-full flex-col md:flex-row gap-8">
        <Filters />
        <div className="flex-1">
          <div className="flex w-full justify-between mb-6">
            <h2 className="text-4xl font-black leading-tight tracking-[-0.033em]">
              Women&apos;s Shoes
            </h2>
            <div className="flex border-2 border-black/15 rounded-sm dark:border-white/15 justify-center items-center max-h-12">
              <select name="sortby" id="sortby" className="flex-1 p-2">
                <option>Popularity</option>
                <option>Newest</option>
                <option>Price(Lowest to Highest)</option>
                <option>Price(Highest to Lowest)</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex gap-3 border-b border-black/10 dark:border-white/10">
              <Link
                href="#"
                className="flex flex-col items-center justify-center border-b-[3px] text-foreground pb-3 pt-1"
              >
                All
              </Link>
              <Link
                href="#"
                className="flex flex-col items-center justify-center text-foreground pb-3 pt-1"
              >
                New Arrivals
              </Link>
              <Link
                href="#"
                className="flex flex-col items-center justify-center text-foreground pb-3 pt-1"
              >
                Best Sellers
              </Link>
              <Link
                href="#"
                className="flex flex-col items-center justify-center text-foreground pb-3 pt-1"
              >
                On Sale
              </Link>
            </div>
          </div>
          <ShoesGrid />
        </div>
      </div>
    </main>
  );
}
