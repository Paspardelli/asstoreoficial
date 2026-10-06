"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function Header() {
  const { items } = useCart();
  const n = items.reduce((s, i) => s + i.qty, 0);
  return (
    <header className="sticky top-0 z-40 bg-black text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-black tracking-widest">AS<span className="text-brand">STORE</span></Link>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          <Link href="/catalogo" className="hover:text-brand">Catálogo</Link>
          <Link href="/sobre" className="hidden hover:text-brand sm:block">Sobre</Link>
          <Link href="/contato" className="hidden hover:text-brand sm:block">Contato</Link>
          <Link href="/carrinho" className="rounded bg-brand px-3 py-1.5">Carrinho ({n})</Link>
        </nav>
      </div>
    </header>
  );
}
