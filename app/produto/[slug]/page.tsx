import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddToCart from "@/components/AddToCart";
import { brl, imgUrl, type Product } from "@/lib/utils";

export default async function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sb = await createClient();
  const { data } = await sb.from("products").select("*,product_images(*)").eq("slug", slug).maybeSingle();
  if (!data) notFound();
  const p = data as Product;
  const imgs = [...p.product_images].sort((a, b) => a.position - b.position);
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2">
      <div className="space-y-2">
        {imgs.length ? imgs.map((i) => <img key={i.id} src={imgUrl(i.path)} alt={p.name} className="w-full bg-neutral-100" />) : <div className="aspect-[3/4] bg-neutral-100" />}
      </div>
      <div>
        <h1 className="text-3xl font-black">{p.name}</h1>
        <p className="mt-2 text-2xl font-bold text-brand">{brl(p.price)}</p>
        <p className="mt-4 whitespace-pre-line text-neutral-700">{p.description}</p>
        <AddToCart p={{ id: p.id, name: p.name, slug: p.slug, price: p.price, sizes: p.sizes, colors: p.colors, is_available: p.is_available }} />
      </div>
    </div>
  );
}
