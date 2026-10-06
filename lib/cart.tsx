"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = { productId: string; size: string; color: string; qty: number };
type Ctx = {
  items: CartItem[]; ready: boolean; add: (i: CartItem) => void;
  setQty: (k: number, q: number) => void; remove: (k: number) => void; clear: () => void;
};
const C = createContext<Ctx | null>(null);
const clamp = (n: number) => Math.min(20, Math.max(1, Math.floor(n) || 1));

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("asstore-cart") || "[]");
      if (Array.isArray(raw)) {
        setItems(raw
          .filter((i) => i && typeof i.productId === "string" && typeof i.size === "string" && typeof i.color === "string")
          .map((i) => ({ productId: i.productId, size: i.size.slice(0, 20), color: i.color.slice(0, 30), qty: clamp(Number(i.qty)) })));
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem("asstore-cart", JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const add = (n: CartItem) => setItems((cur) => {
    const k = cur.findIndex((i) => i.productId === n.productId && i.size === n.size && i.color === n.color);
    if (k < 0) return [...cur, { ...n, qty: clamp(n.qty) }];
    return cur.map((i, x) => (x === k ? { ...i, qty: clamp(i.qty + n.qty) } : i));
  });
  const setQty = (k: number, q: number) => setItems((cur) => cur.map((i, x) => (x === k ? { ...i, qty: clamp(q) } : i)));
  const remove = (k: number) => setItems((cur) => cur.filter((_, x) => x !== k));
  const clear = () => setItems([]);

  return <C.Provider value={{ items, ready, add, setQty, remove, clear }}>{children}</C.Provider>;
}
export function useCart() {
  const c = useContext(C);
  if (!c) throw new Error("CartProvider ausente");
  return c;
}
