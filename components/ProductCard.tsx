import Link from "next/link";
import ProductImage from "./ProductImage";
import { brl, type Product } from "@/lib/utils";

export default function ProductCard({ p }: { p: Product }) {
  const img = [...p.product_images].sort((a, b) => a.position - b.position)[0];
  return (
    <Link href={`/produto/${p.slug}`} className="group block">
      <div className="relative">
        <ProductImage path={img?.path} alt={p.name} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" />
        {!p.is_available && <span className="absolute left-2 top-2 bg-black px-2 py-1 text-xs font-bold text-white">Esgotado</span>}
      </div>
      <h3 className="mt-2 text-sm font-semibold">{p.name}</h3>
      <p className="font-bold text-brand">{brl(p.price)}</p>
    </Link>
  );
}
