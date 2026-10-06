import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/utils";

export default async function Catalogo({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat } = await searchParams;
  const sb = await createClient();
  const { data: cats } = await sb.from("categories").select("*").order("name");
  const current = cats?.find((c) => c.slug === cat);
  let q = sb.from("products").select("*,product_images(*)").order("created_at", { ascending: false });
  if (current) q = q.eq("category_id", current.id);
  const { data } = await q;
  const chip = (on: boolean) => `whitespace-nowrap border px-4 py-2 text-sm font-semibold ${on ? "border-brand bg-brand text-white" : "border-neutral-300"}`;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-black">{current ? current.name : "Catálogo"}</h1>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        <Link href="/catalogo" className={chip(!current)}>Todos</Link>
        {cats?.map((c) => <Link key={c.id} href={`/catalogo?cat=${c.slug}`} className={chip(current?.id === c.id)}>{c.name}</Link>)}
      </div>
      {(data ?? []).length === 0 && <p className="mt-8 text-neutral-600">Nenhum produto por aqui ainda.</p>}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {((data ?? []) as Product[]).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
