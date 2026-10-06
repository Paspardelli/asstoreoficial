"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { waLink } from "@/lib/whatsapp";

type P = { id: string; name: string; slug: string; price: number; sizes: string[]; colors: string[]; is_available: boolean };

export default function AddToCart({ p }: { p: P }) {
  const { add } = useCart();
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : "");
  const [color, setColor] = useState(p.colors.length === 1 ? p.colors[0] : "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!p.is_available) return <p className="mt-6 font-bold">Esgotado. Chame no WhatsApp para saber da reposição.</p>;

  const missing = (p.sizes.length > 0 && !size) || (p.colors.length > 0 && !color);
  const chip = (on: boolean) =>
    `border px-3 py-2 text-sm font-semibold ${on ? "border-brand bg-brand text-white" : "border-neutral-300"}`;

  const order = () => {
    const url = waLink([{ name: p.name, slug: p.slug, size: size || "Único", color: color || "Único", qty, price: p.price }], window.location.origin);
    window.open(url, "_blank", "noopener");
  };

  return (
    <div className="mt-6 space-y-5">
      {p.sizes.length > 0 && (
        <div><p className="mb-2 font-semibold">Tamanho</p>
          <div className="flex flex-wrap gap-2">{p.sizes.map((s) => <button key={s} onClick={() => setSize(s)} className={chip(size === s)}>{s}</button>)}</div></div>
      )}
      {p.colors.length > 0 && (
        <div><p className="mb-2 font-semibold">Cor</p>
          <div className="flex flex-wrap gap-2">{p.colors.map((c) => <button key={c} onClick={() => setColor(c)} className={chip(color === c)}>{c}</button>)}</div></div>
      )}
      <div><p className="mb-2 font-semibold">Quantidade</p>
        <input type="number" min={1} max={20} value={qty}
          onChange={(e) => setQty(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
          className="w-24 border border-neutral-300 px-3 py-2" /></div>
      {missing && <p className="text-sm text-neutral-600">Escolha tamanho e cor para continuar.</p>}
      <div className="grid gap-2">
        <button disabled={missing} onClick={() => { add({ productId: p.id, size: size || "Único", color: color || "Único", qty }); setAdded(true); }}
          className="bg-black py-3 font-bold text-white disabled:opacity-40">Adicionar ao carrinho</button>
        <button disabled={missing} onClick={order}
          className="bg-brand py-3 font-bold text-white disabled:opacity-40">Encomendar pelo WhatsApp</button>
      </div>
      {added && <p className="text-sm font-semibold text-green-700">Adicionado. Veja no carrinho.</p>}
    </div>
  );
}
