import shoes from "@/data/shoes";
import ProductCard from "./ProductCard";

export default function ShoesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      {shoes.map((shoe) => {
        return <ProductCard key={shoe.id} shoe={shoe} />;
      })}
    </div>
  );
}
