// app/explore/page.tsx
import Filters from "@/components/Filters";
import ShoesGrid from "@/components/ShoesGrid";
import shoes from "@/data/shoes";

import {
  filterNewArrivals,
  filterShoesByGender,
  filterShoesByPriceRange,
  filterShoesBySize,
  filterShoesByTags,
  sortBy,
} from "@/utils/dataFilter";
import { FilterTab } from "@/components/FilterTab";
import SortOptions from "@/components/SortOptions";
import { PageProps } from "@/.next/types/app/explore/page";

export default async function ExplorePage({ searchParams }: PageProps) {
  const params = await searchParams;

  const gender = params.gender;
  const newArrivals = params.newArrivals === "true";
  const tags = params.tags ? params.tags.split(",") : [];
  const size = params.size ? Number(params.size) : null;
  const minPrice = params.minPrice ? Number(params.minPrice) : null;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : null;

  const sort = params.sort ?? "";
  const asc = params.asc === "false" ? false : true;

  let filteredShoes = shoes;

  if (gender) {
    filteredShoes = filterShoesByGender(
      filteredShoes,
      gender as "male" | "female" | "unisex" | "all" | undefined | null
    );
  }
  if (newArrivals) filteredShoes = filterNewArrivals(filteredShoes);
  if (tags.length > 0) filteredShoes = filterShoesByTags(filteredShoes, tags);
  if (size) filteredShoes = filterShoesBySize(filteredShoes, size);

  filteredShoes = filterShoesByPriceRange(filteredShoes, minPrice, maxPrice);

  if (sort) {
    filteredShoes = sortBy(filteredShoes, sort, asc);
  }
  return (
    <main className="container mx-auto flex flex-1 px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex w-full flex-col md:flex-row gap-8">
        {/* Sidebar Filters (Client Component) */}
        <Filters />

        <div className="flex-1">
          <div className="flex w-full justify-between mb-6">
            <h2 className="text-4xl font-black">
              {gender
                ? `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s Shoes`
                : "All Shoes"}
            </h2>

            <div className="flex border-2 border-black/15 dark:border-white/15 rounded-sm items-center">
              <SortOptions />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-6">
            <div className="flex gap-3 border-b border-black/10 dark:border-white/10">
              <FilterTab label="All" params={params} remove="newArrivals" />
              <FilterTab
                label="New Arrivals"
                params={params}
                add={{ newArrivals: "true" }}
              />
              <FilterTab
                label="Best Sellers"
                params={params}
                add={{ bestSellers: "true" }}
              />
              <FilterTab
                label="On Sale"
                params={params}
                add={{ onSale: "true" }}
              />
            </div>
          </div>

          <ShoesGrid shoes={filteredShoes} />
        </div>
      </div>
    </main>
  );
}
