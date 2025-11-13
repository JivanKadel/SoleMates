"use client";
import React, { createContext, useContext, useReducer } from "react";
import { Shoe } from "@/data/shoes";

interface ShoeState {
  cartItems: Shoe[];
  favoriteItems: Shoe[];
}

type ShoeAction =
  | { type: "ADD_TO_CART"; payload: Shoe }
  | { type: "REMOVE_FROM_CART"; payload: { id: string } }
  | { type: "ADD_TO_FAVORITES"; payload: Shoe }
  | { type: "REMOVE_FROM_FAVORITES"; payload: { id: string } };

const initialState: ShoeState = {
  cartItems: [],
  favoriteItems: [],
};

export const shoeReducer = (
  state: ShoeState,
  action: ShoeAction
): ShoeState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favoriteItems: [...state.favoriteItems, action.payload],
      };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export const ShoeContext = createContext<{
  state: ShoeState;
  dispatch: React.Dispatch<ShoeAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const ShoeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(shoeReducer, initialState);
  return (
    <ShoeContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoeContext.Provider>
  );
};

export const useShoeContext = () => {
  const context = useContext(ShoeContext);
  if (!context) {
    throw new Error("No Provider for the context given");
  }
  return context;
};
