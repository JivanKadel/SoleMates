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
