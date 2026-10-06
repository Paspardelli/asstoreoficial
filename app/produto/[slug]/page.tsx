import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddToCart from "@/components/AddToCart";
import Gallery from "@/components/Gallery";
import { brl, type Product } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sb = await createClient();
  const { data } = await sb.from("products").select("name,description").eq("slug", slug).maybeSingle();
  if (!data) return {};
  return { title: `${data.name} | ASStore`, description: String(data.description).slice(0, 155) };
}

export default async function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sb = await createClient();
  const { data } = await sb.from("products").select("*,product_images(*)").eq("slug", slug).maybeSingle();
  if (!data) notFound();
  const p = data as Product;
  const paths = [...p.product_images].sort((a, b) => a.position - b.position).map((i) => i.path);
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2">
      <Gallery paths={paths} alt={p.name} />
      <div>
        <h1 className="text-3xl font-black">{p.name}</h1>
        <p className="mt-2 text-2xl font-bold text-brand">{brl(p.price)}</p>
        <p className="mt-4 whitespace-pre-line text-neutral-700">{p.description}</p>
        <AddToCart p={{ id: p.id, name: p.name, slug: p.slug, price: p.price, sizes: p.sizes, colors: p.colors, is_available: p.is_available }} />
      </div>
    </div>
  );
}
