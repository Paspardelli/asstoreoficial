"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/lib/cart";
import { brl } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";

type P = { id: string; name: string; slug: string; price: number; is_available: boolean };

export default function Carrinho() {
  const { items, ready, setQty, remove, clear } = useCart();
  const [prods, setProds] = useState<{ key: string; map: Record<string, P> } | null>(null);
  const key = [...new Set(items.map((i) => i.productId))].join(",");

  useEffect(() => {
    if (!ready) return;
    if (!key) { setProds({ key, map: {} }); return; }
    // Preço e disponibilidade SEMPRE vêm do banco, nunca do localStorage.
    createClient().from("products").select("id,name,slug,price,is_available").in("id", key.split(","))
      .then(({ data }) => setProds({ key, map: Object.fromEntries(((data ?? []) as P[]).map((p) => [p.id, p])) }));
  }, [key, ready]);

  if (!ready || prods?.key !== key) return <p className="px-4 py-16 text-center">Carregando…</p>;
  if (items.length === 0) return (
    <div className="px-4 py-16 text-center">
      <p className="text-lg font-semibold">Seu carrinho está vazio.</p>
      <Link href="/catalogo" className="mt-4 inline-block bg-brand px-6 py-3 font-bold text-white">Ver catálogo</Link>
    </div>
  );

  const lines = items.flatMap((i) => {
    const p = prods.map[i.productId];
    return p && p.is_available ? [{ name: p.name, slug: p.slug, size: i.size, color: i.color, qty: i.qty, price: p.price }] : [];
  });
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-black">Carrinho</h1>
      <ul className="mt-4 divide-y border">
        {items.map((i, k) => {
          const p = prods.map[i.productId];
          const ok = p && p.is_available;
          return (
            <li key={k} className="flex items-center justify-between gap-3 p-3">
              <div>
                <p className="font-semibold">{p ? p.name : "Produto indisponível"}</p>
                <p className="text-sm text-neutral-600">{i.size} · {i.color}</p>
                {!ok && <p className="text-sm font-semibold text-red-600">Indisponível. Remova do carrinho.</p>}
                {ok && <p className="font-bold text-brand">{brl(p.price * i.qty)}</p>}
              </div>
              <div className="flex items-center gap-2">
                <input type="number" min={1} max={20} value={i.qty} onChange={(e) => setQty(k, Number(e.target.value))} className="w-16 border px-2 py-1" />
                <button onClick={() => remove(k)} className="text-sm text-red-600">Remover</button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-right text-xl font-black">Total: {brl(total)}</p>
      <button disabled={lines.length === 0}
        onClick={() => window.open(waLink(lines, window.location.origin), "_blank", "noopener")}
        className="mt-4 w-full bg-brand py-4 font-bold text-white disabled:opacity-40">Enviar encomenda pelo WhatsApp</button>
      <p className="mt-2 text-center text-sm text-neutral-600">O pagamento é combinado direto com a loja no WhatsApp.</p>
      <button onClick={clear} className="mt-4 block w-full text-sm text-neutral-600 underline">Esvaziar carrinho</button>
    </div>
  );
}
