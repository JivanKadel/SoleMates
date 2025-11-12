import NewArrivalCard from "./NewArrivalCard";
import { getNewArrivals } from "@/utils/dataFilter";

export default async function NewArrivals() {
  const shoes = await getNewArrivals();
  return (
    <div className="flex overflow-x-auto">
      <div className="flex items-stretch p-4 gap-4">
        {shoes.map((shoe) => (
          <NewArrivalCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
}
