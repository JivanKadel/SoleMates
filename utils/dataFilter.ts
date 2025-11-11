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
