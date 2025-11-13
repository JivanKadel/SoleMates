import { Shoe } from "@/data/shoes";
import Image from "next/image.js";
import Link from "next/link.js";

type ShoeProps = {
  shoe: Shoe;
};
export default function NewArrivalCard({ shoe }: ShoeProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 min-w-64 transition-shadow hover:shadow-xl">
      <Link
        href={`explore/${shoe.id}`}
        className="w-full aspect-4/5 relative bg-center bg-no-repeat"
      >
        <Image
          src={shoe.image}
          alt={shoe.name}
          fill
          className="object-cover rounded-t-xl"
        />
      </Link>
      <div className="flex flex-col gap-4 p-4 pt-0">
        <div>
          <Link
            href={`explore/${shoe.id}`}
            className="text-foreground text-xl font-bold"
          >
            {shoe.name}
          </Link>
          <p className="text-muted text-sm">Rs. {shoe.price}</p>
        </div>
        <button className="bg-accent/10 text-accent font-bold font-mono p-2 cursor-pointer rounded-md hover:bg-accent/20 hover:rounded-lg transition-all">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
