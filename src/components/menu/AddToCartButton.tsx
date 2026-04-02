"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { Plus, ShoppingCart } from "lucide-react";
import type { MenuItem } from "@/types";

interface AddToCartButtonProps {
  item: MenuItem;
}

export function AddToCartButton({ item }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  
  const cartItem = cartItems.find((ci) => ci.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || "",
    }));
  };

  if (!item.isAvailable) {
    return (
      <button disabled className="w-full mt-4 py-2 px-4 rounded-lg bg-muted text-muted-foreground font-semibold flex items-center justify-center gap-2 cursor-not-allowed text-sm">
        Tükendi
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full mt-auto py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-[15px] shadow-sm ${
        quantity > 0 
          ? "bg-[#F5E6E2] text-[#8C2C16] hover:bg-[#ebd5cf]" 
          : "bg-[#A73C21] text-white hover:bg-[#8F331C] hover:shadow-md"
      }`}
    >
      {quantity > 0 ? (
        <>
          <ShoppingCart className="w-4 h-4" />
          <span>Sepette ({quantity}) - Tekrar Ekle</span>
        </>
      ) : (
        <>
          <Plus className="w-5 h-5" />
          <span>Sepete Ekle</span>
        </>
      )}
    </button>
  );
}
