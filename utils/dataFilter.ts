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
  gender: "male" | "female" | "unisex" = "unisex"
): Shoe[] {
  const g = gender.toLowerCase();
  return shoesList.filter((shoe) => {
    const sg = (shoe.gender ?? "unisex").toLowerCase();
    if (g === "unisex") return sg === "unisex";
    return sg === g || sg === "unisex";
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
  min?: number,
  max?: number
): Shoe[] {
  if (min == null && max == null) return [...shoesList];
  return shoesList.filter((shoe) => {
    const price = shoe.price ?? 0;
    if (min != null && price < min) return false;
    if (max != null && price > max) return false;
    return true;
  });
}
