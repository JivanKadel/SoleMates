"use client";
import { Shoe } from "@/data/shoes";
import CartItemList from "./CartItemList";
import Drawer from "./Drawer";
import { useState } from "react";

export default function CartDrawer() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Drawer
      isOpen={dialogOpen}
      onClose={() => setDialogOpen(false)}
      labelledBy="Cart Items"
    >
      <CartItemList />
    </Drawer>
  );
}
