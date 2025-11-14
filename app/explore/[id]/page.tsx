import AddToCartBtn from "@/components/AddToCartBtn";
import AddToFavorites from "@/components/AddToFavorites";
import SizeFilters from "@/components/SizeFilters";
import { getShoeById } from "@/utils/dataFilter";
import Image from "next/image";

export default async function ShoePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  // console.log(id);
  const shoe = await getShoeById(id);

  if (!shoe) {
    return <div>Shoe not found</div>;
  }

  return (
    <main className="flex flex-1 justify-center py-5 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col w-full max-w-7xl flex-1">
        <div className="flex flex-wrap gap-2 p-4">
          <a
            className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal"
            href="#"
          >
            Home
          </a>
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal">
            /
          </span>
          <a
            className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal"
            href="#"
          >
            Men
          </a>
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal">
            /
          </span>
          <a
            className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal"
            href="#"
          >
            Running
          </a>
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal">
            /
          </span>
          <span className="text-gray-900 dark:text-white text-sm font-medium leading-normal">
            Velocity Runner
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-4">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <Image
                src={shoe.image}
                alt={shoe.name}
                width={80}
                height={80}
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  objectFit: "cover",
                }}
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-4">
              <button className="cursor-pointer rounded-md hover:grayscale-90 hover:border-accent">
                <Image
                  src={shoe.image}
                  alt={shoe.name}
                  width={80}
                  height={80}
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                  }}
                  className="hover:border-2 hover:rounded-md hover:border-gray-600 dark:hover:border-gray-200"
                />
              </button>
              <button className="cursor-pointer rounded-md hover:grayscale-90">
                <Image
                  src={shoe.image}
                  alt={shoe.name}
                  width={80}
                  height={80}
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                  }}
                  className="hover:border-2 hover:rounded-md hover:border-gray-600 dark:hover:border-gray-200"
                />
              </button>
              <button className="cursor-pointer rounded-md hover:grayscale-90">
                <Image
                  src={shoe.image}
                  alt={shoe.name}
                  width={80}
                  height={80}
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                  }}
                  className="hover:border-2 hover:rounded-md hover:border-gray-600 dark:hover:border-gray-200"
                />
              </button>
              <button className="cursor-pointer rounded-md hover:grayscale-90">
                <Image
                  src={shoe.image}
                  alt={shoe.name}
                  width={80}
                  height={80}
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                  }}
                  className="hover:border-2 hover:rounded-md hover:border-gray-600 dark:hover:border-gray-200"
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <p className="text-primary text-sm font-semibold leading-normal underline">
                {shoe.brand}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {shoe.name}
              </h1>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {shoe.price}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-yellow-500 text-[18px]!">
                    star
                  </span>
                  <span className="material-symbols-outlined text-yellow-500 text-[18px]!">
                    star
                  </span>
                  <span className="material-symbols-outlined text-yellow-500 text-[18px]!">
                    star
                  </span>
                  <span className="material-symbols-outlined text-yellow-500 text-[18px]!">
                    star
                  </span>
                  <span className="material-symbols-outlined text-yellow-500 text-[18px]!">
                    star_half
                  </span>
                  <span className="ml-1 font-medium text-gray-800 dark:text-gray-200">
                    4.7
                  </span>
                  <span className="text-gray-500">
                    {shoe.reviews.length} reviews
                  </span>
                </div>
                <span className="text-red-500 font-medium flex items-center gap-1">
                  🔥 {shoe.totalSales}+ sold this month
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2"
                  htmlFor="size"
                >
                  Select Size
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <SizeFilters />
                </div>
              </div>
            </div>
            <div className="flex items-end gap-4">
              <AddToCartBtn shoe={shoe} />
              <AddToFavorites />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              <div className="flex border-b border-gray-200 dark:border-gray-800">
                <button className="px-4 py-3 text-sm font-semibold border-b-2 border-primary text-primary">
                  Description
                </button>
                <button className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700">
                  Details
                </button>
                <button className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700">
                  Reviews
                </button>
              </div>
              <div className="py-6 text-gray-700 dark:text-gray-300 space-y-4 text-sm leading-relaxed">
                <p>
                  Experience the perfect blend of style and performance with the
                  Velocity Runner. Designed for the modern athlete, this shoe
                  features a lightweight, breathable mesh upper for maximum
                  comfort and a responsive foam midsole for unparalleled energy
                  return. Whether you&apos;re hitting the track or the streets,
                  the durable rubber outsole provides excellent traction and
                  support.
                </p>
                <p>
                  Its sleek, aerodynamic design is not just about function;
                  it&apos;s a statement. Available in a range of dynamic
                  colorways, the Velocity Runner is engineered to help you push
                  your limits and look good doing it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
