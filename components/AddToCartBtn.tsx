"use client";
import { useShoeContext } from "@/contexts/ShoeContext";
import { Shoe } from "@/data/shoes";
import Toast from "./Toast";
import { useState } from "react";

export default function AddToCartBtn({ shoe }: { shoe: Shoe }) {
  const { dispatch } = useShoeContext();
  const [showToast, setShowToast] = useState(false);
  return (
    <button
      onClick={() => {
        dispatch({
          type: "ADD_TO_CART",
          payload: shoe,
        });
        setShowToast(true);
      }}
      className="w-full flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-accent text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 px-6"
    >
      <span>Add to Cart</span>
      {showToast && (
        <Toast
          title="Added to Cart Successfully"
          desc="lorem ipsum dolor sit "
          onClose={() => setShowToast(false)}
          type="success"
        />
      )}
    </button>
  );
}
