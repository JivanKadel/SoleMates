import { Shoe } from "@/data/shoes";
import { useContext, useEffect, useState } from "react";
import {
  CartItem as CartItemType,
  useShoeContext,
} from "@/contexts/ShoeContext";
import CartItem from "./CartItem";

export default function CartItemList() {
  const { state, dispatch } = useShoeContext();
  const {
    cartItems,
  }: {
    cartItems: CartItemType[];
  } = state;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = cartItems.reduce(
      (acc: number, item: CartItemType) =>
        acc + item?.shoe?.price * item?.quantity,
      0
    );
    setTotal(sum);
  }, [cartItems]);
  return (
    <aside className="w-full max-w-md h-screen bg-background-light dark:bg-background-dark border-l border-gray-200 dark:border-gray-800 flex flex-col shadow-2xl">
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-gray-800 dark:text-gray-200">
            shopping_bag
          </span>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              My Cart
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {cartItems?.length ? cartItems.length : 0} items
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-2">
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
          {cartItems && cartItems?.length > 0 ? (
            cartItems?.map((item) => (
              <CartItem key={item.shoe.id} shoe={item.shoe} />
            ))
          ) : (
            <h1>Nothing in Cart Yet</h1>
          )}
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark shrink-0">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-base font-medium text-gray-600 dark:text-gray-400">
              Subtotal
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              Rs. {total}
            </p>
          </div>
          <button className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-accent text-white text-base font-bold leading-normal tracking-wide hover:bg-primary/90 transition-colors">
            <span className="truncate">Checkout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
