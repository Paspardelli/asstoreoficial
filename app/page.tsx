import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/utils";

// Nome do arquivo da imagem de fundo que fica na pasta public (mude só aqui)
const HERO = "/IMG_5046.jpeg";

export default async function Home() {
  const sb = await createClient();
  const [{ data: feat }, { data: cats }] = await Promise.all([
    sb.from("products").select("*,product_images(*)").eq("is_featured", true).order("created_at", { ascending: false }).limit(8),
    sb.from("categories").select("*").order("name"),
  ]);
  return (
    <>
      <section className="relative overflow-hidden bg-black text-white" style={{ backgroundImage: `url(${HERO})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-32">
          <h1 className="max-w-2xl text-5xl font-black leading-[1.05] sm:text-7xl">Vista a rua. <span className="text-brand">Encomende</span> no zap.</h1>
          <p className="mt-4 max-w-md text-neutral-300">Escolha a peça, monte o carrinho e finalize direto com a gente no WhatsApp.</p>
          <Link href="/catalogo" className="mt-8 inline-block bg-brand px-8 py-4 font-bold">Ver catálogo</Link>
        </div>
      </section>
      {cats && cats.length > 0 && (
        <section className="mx-auto mt-8 flex max-w-6xl gap-2 overflow-x-auto px-4">
          {cats.map((c) => (
            <Link key={c.id} href={`/catalogo?cat=${c.slug}`} className="whitespace-nowrap border border-neutral-300 px-4 py-2 text-sm font-semibold hover:border-brand hover:text-brand">{c.name}</Link>
          ))}
        </section>
      )}
      <section className="mx-auto mt-10 max-w-6xl px-4">
        <h2 className="text-2xl font-black">Destaques</h2>
        {(feat ?? []).length === 0 && <p className="mt-4 text-neutral-600">Novidades em breve.</p>}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {((feat ?? []) as Product[]).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </>
  );
}

