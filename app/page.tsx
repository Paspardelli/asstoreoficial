import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/utils";

// Nome do arquivo do banner que fica na pasta public (mude só aqui)
const HERO = "/IMG_banner.PNG";

export default async function Home() {
  const sb = await createClient();
  const [{ data: feat }, { data: cats }] = await Promise.all([
    sb.from("products").select("*,product_images(*)").eq("is_featured", true).order("created_at", { ascending: false }).limit(8),
    sb.from("categories").select("*").order("name"),
  ]);
  return (
    <>
      <section className="bg-black">
        <Image src={HERO} alt="ASStore: roupas online" width={1672} height={940} priority sizes="100vw" className="mx-auto block h-auto w-full max-w-[1920px]" />
        <div className="pb-8 pt-2 text-center">
          <Link href="/catalogo" className="inline-block bg-brand px-8 py-4 font-bold text-white">Ver catálogo</Link>
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


