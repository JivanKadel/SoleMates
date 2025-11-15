import { useShoeContext } from "@/contexts/ShoeContext";
import { Shoe } from "@/data/shoes";
import type { CartItem as CartItemType } from "@/contexts/ShoeContext";
import { useState } from "react";
import Toast from "./Toast";

export default function CartItem({ shoe }: { shoe: Shoe }) {
  const { state, dispatch } = useShoeContext();
  const [shoeAddedToast, setShoeAddedToast] = useState(false);
  const [shoeRemovedToast, setShoeRemovedToast] = useState(false);

  return (
    <div className="flex gap-4 p-4 justify-between items-center">
      <div className="flex items-start gap-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-[70px] shrink-0"
          data-alt="Side view of a black running shoe"
          style={{
            backgroundImage: `url(${shoe.image})`,
          }}
        ></div>
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-base font-medium text-gray-900 dark:text-white">
            {shoe.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Rs. {shoe.price}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Size: 9, Color: {shoe.colors[0]}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <div className="flex justify-center items-center gap-2 text-gray-900 dark:text-white">
          <button
            onClick={() => {
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: { id: shoe.id },
              });
              setShoeRemovedToast(true);
            }}
            className="flex justify-center align-middle text-base font-medium leading-normal  h-7 w-7 items-center bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="material-symbols-outlined p-1">
              check_indeterminate_small
            </span>
          </button>
          <input
            className="text-base font-medium leading-normal w-5 p-0 text-center bg-transparent focus:outline-none focus:ring-0 border-none [appearance:textfield] [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:appearance-none"
            type="number"
            value={
              state?.cartItems?.find((item: CartItemType) => {
                return item.shoe.id === shoe.id;
              })?.quantity
            }
            readOnly
          />
          <button
            onClick={() => {
              dispatch({
                type: "ADD_TO_CART",
                payload: shoe,
              });
              setShoeAddedToast(true);
            }}
            className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="material-symbols-outlined p-1">add</span>
          </button>
        </div>
      </div>
      {shoeAddedToast && (
        <Toast
          type="success"
          title="Added to Cart"
          onClose={() => setShoeAddedToast(false)}
        />
      )}
      {shoeRemovedToast && (
        <Toast
          type="error"
          title="Removed From Cart"
          onClose={() => setShoeRemovedToast(false)}
        />
      )}
    </div>
  );
}
