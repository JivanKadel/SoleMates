"use client";
import Image from "next/image.js";
import LogoImage from "@/public/logo.svg";
import Link from "next/link.js";
import { useContext, useEffect, useState } from "react";
import { CartDrawerContext } from "@/contexts/DrawerContext";
import { CartItem, useShoeContext } from "@/contexts/ShoeContext";

export default function Header() {
  const { toggleOpen } = useContext(CartDrawerContext);
  const [totalInCart, setTotalInCart] = useState(0);
  const { state } = useShoeContext();

  useEffect(() => {
    const total = state.cartItems.reduce(
      (acc: number, item: CartItem) => acc + item.quantity,
      0
    );
    setTotalInCart(total);
  }, [state.cartItems]);

  type PageLink = { id: number; linkText: string; linkTo: string };

  const pageLinks: PageLink[] = [
    { id: 1, linkText: "men", linkTo: "/explore?gender=men" },
    { id: 2, linkText: "women", linkTo: "/explore?gender=women" },
    { id: 3, linkText: "kids", linkTo: "/explore?gender=all" },
    { id: 4, linkText: "new arrivals", linkTo: "/explore?newArrivals=true" },
  ];

  return (
    <header className="w-full sticky top-0 z-20 flex flex-row items-center justify-center bg-white/95 dark:bg-black/95 backdrop:blur-sm border-b border-gray-200">
      <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-8 py-3 w-full max-w-7xl">
        <div className="flex flex-row gap-8">
          <Link href="/" className="flex flex-row gap-1.5">
            <Image src={LogoImage} width={24} height={24} alt="SoleMate Logo" />
            <h1 className="text-xl font-bold leading-tight tracking-[-0.015em]">
              SoleMate
            </h1>
          </Link>
          <nav className="hidden md:flex flex-row items-center gap-8">
            {pageLinks.map((link) => {
              return (
                <Link
                  key={link.id}
                  className="capitalize font-medium leading-normal"
                  href={`${link.linkTo}`}
                >
                  {link.linkText}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-row gap-2 sm:gap-4">
          <div className="hidden sm:flex flex-col  h-10! min-w-64 max-w-80">
            <div className="flex flex-1 items-stretch w-full pl-2 rounded-lg h-full gap-1 bg-gray-100 border border-transparent focus-within:border-2 focus-within:border-gray-300 transition-colors">
              <div className="flex flex-col justify-center items-center border-r-0">
                <span className="material-symbols-outlined text-gray-600">
                  search
                </span>
              </div>
              <input
                className="flex-1 bg-transparent focus:outline-none text-[#0d121b] placeholder:text-[#9098b1] text-sm h-full"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex flex-row gap-1.5 sm:gap-3">
            <Link
              href={"/"}
              className="h-10! w-10! bg-gray-100 flex flex-col justify-center items-center rounded-sm hover:border-2 hover:border-gray-300"
            >
              <span className="material-symbols-outlined ">person</span>
            </Link>
            <Link
              href={"/"}
              className="h-10! w-10! bg-gray-100 flex flex-col justify-center items-center rounded-sm hover:border-2 hover:border-gray-300"
            >
              <span className="material-symbols-outlined ">favorite</span>
            </Link>
            <button
              onClick={toggleOpen}
              className="relative h-10! w-10! bg-gray-100 flex flex-col justify-center items-center cursor-pointer rounded-sm hover:border-2 hover:border-gray-300"
            >
              <span className="material-symbols-outlined ">shopping_bag</span>
              {totalInCart > 0 ? (
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 text-[10px] font-bold rounded-full border border-red-500 flex items-center justify-center text-red-600 bg-white">
                  {totalInCart}
                </span>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
