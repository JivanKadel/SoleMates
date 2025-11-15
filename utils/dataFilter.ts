import shoes, { Shoe } from "@/data/shoes";

export async function getNewArrivals(): Promise<Shoe[]> {
  const newArrivals = shoes.filter((shoe) => {
    return shoe.newArrival;
  });
  return newArrivals.length > 0 ? newArrivals : [];
}

export async function getRandomShoe(): Promise<Shoe | undefined> {
  const newArrivals = await getNewArrivals();
  if (newArrivals == null) {
    return shoes[0];
  }
  return newArrivals[0];
}

export type Filters = {
  gender: "male" | "female" | "unisex" | "all";
  size: number;
  priceRange: {
    min?: number;
    max?: number;
  };
  tags?: string[];
};

export async function getShoeById(id: string) {
  console.log(id);
  const shoe = shoes.find((shoe) => shoe.id === id);
  return shoe ? shoe : null;
}

export function sortShoesByPrice(
  shoesList: Shoe[],
  ascending: boolean = true
): Shoe[] {
  return shoesList.sort((a, b) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
}

export function filterShoesByTags(shoesList: Shoe[], tags: string[]): Shoe[] {
  return shoesList.filter((shoe) => {
    return tags.every((tag) => shoe?.tags?.includes(tag));
  });
}

export function filterShoesByPopularity(shoesList: Shoe[]): Shoe[] {
  // Sort by totalSales (desc) then by rating (desc). Non-destructive (copies array).
  return [...shoesList].sort((a, b) => {
    const salesA = a.totalSales ?? 0;
    const salesB = b.totalSales ?? 0;
    const salesDiff = salesB - salesA;
    if (salesDiff !== 0) return salesDiff;
    const ratingA = a.rating ?? 0;
    const ratingB = b.rating ?? 0;
    return ratingB - ratingA;
  });
}

export function filterShoesByGender(
  shoesList: Shoe[],
  gender: "male" | "female" | "unisex" | "all" = "unisex"
): Shoe[] {
  if (gender === "all" || gender === null || gender == undefined)
    return [...shoesList];
  const g = gender.toLowerCase();
  return shoesList.filter((shoe) => {
    return shoe.gender.toLowerCase() === g;
  });
}

export function filterShoesBySize(
  shoesList: Shoe[],
  size: number | string
): Shoe[] {
  const target = Number(size);
  if (Number.isNaN(target)) return [];
  return shoesList.filter(
    (shoe) =>
      Array.isArray(shoe.sizes) && shoe.sizes.some((s) => Number(s) === target)
  );
}

export function filterShoesByPriceRange(
  shoesList: Shoe[],
  min?: number | null,
  max?: number | null
): Shoe[] {
  if (min == null && max == null) return [...shoesList];
  return shoesList.filter((shoe) => {
    const price = shoe.price ?? 0;
    if (min != null && price < min) return false;
    if (max != null && price > max) return false;
    return true;
  });
}

export function filterNewArrivals(shoeList: Shoe[]) {
  return shoeList.filter((shoe) => shoe.newArrival);
}

export function sortBy(
  shoesList: Shoe[],
  tag: string,
  asc: boolean = true
): Shoe[] {
  const t = (tag || "").toLowerCase();

  switch (t) {
    case "popularity": {
      // Sort by totalSales (desc) then rating (desc)
      const sorted = [...shoesList].sort((a, b) => {
        const salesA = a.totalSales ?? 0;
        const salesB = b.totalSales ?? 0;
        const salesDiff = salesB - salesA;
        if (salesDiff !== 0) return salesDiff;
        const ratingA = a.rating ?? 0;
        const ratingB = b.rating ?? 0;
        return ratingB - ratingA;
      });
      return asc ? sorted : sorted.reverse();
    }

    case "newest": {
      // Treat newArrival === true as newer
      const sorted = [...shoesList].sort((a, b) => {
        const na = a.newArrival ? 1 : 0;
        const nb = b.newArrival ? 1 : 0;
        return nb - na; // Newest first by default
      });
      return asc ? sorted : sorted.reverse();
    }

    case "price": {
      const sorted = [...shoesList].sort((a, b) => a.price - b.price);
      return asc ? sorted : sorted.reverse();
    }

    default:
      // Invalid tag -> return all shoes
      return [...shoesList];
  }
}
