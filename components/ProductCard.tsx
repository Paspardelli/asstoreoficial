import Link from "next/link";
import { brl, imgUrl, type Product } from "@/lib/utils";

export default function ProductCard({ p }: { p: Product }) {
  const img = [...p.product_images].sort((a, b) => a.position - b.position)[0];
  return (
    <Link href={`/produto/${p.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        {img && <img src={imgUrl(img.path)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />}
        {!p.is_available && <span className="absolute left-2 top-2 bg-black px-2 py-1 text-xs font-bold text-white">Esgotado</span>}
      </div>
      <h3 className="mt-2 text-sm font-semibold">{p.name}</h3>
      <p className="font-bold text-brand">{brl(p.price)}</p>
    </Link>
  );
}
