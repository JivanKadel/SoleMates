"use client";
import { useState } from "react";
import FavoriteSuccessCanvas from "./FavoriteSuccessCanvas";
import Toast from "./Toast";

export default function AddToFavorites() {
  const [isFavorite, setFavorite] = useState(false);
  return (
    <>
      <button
        onClick={() => setFavorite(true)}
        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-accent text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4"
      >
        <span className="material-symbols-outlined">favorite</span>
      </button>
      {isFavorite && (
        <>
          <FavoriteSuccessCanvas
            visible={isFavorite}
            onClose={() => setFavorite(false)}
          />
          <Toast title="Added to Favorites" type="success" />
        </>
      )}
    </>
  );
}
