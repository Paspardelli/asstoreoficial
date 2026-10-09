import Link from "next/link";
import ProductImage from "./ProductImage";
import { brl, type Product } from "@/lib/utils";

export default function ProductCard({ p }: { p: Product }) {
  const img = p.product_images?.[0];
  return (
    <Link href={`/produto/${p.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-[var(--as-line)] bg-gradient-to-br from-[#2b2b2b] to-black">
        <ProductImage path={img?.path} alt={p.name} />
        {!p.is_available && (
          <span className="absolute left-2 top-2 rounded-[3px] bg-[var(--as-red)] px-2 py-0.5 text-xs font-semibold">
            Esgotado
          </span>
        )}
      </div>
      <h3 className="font-display mt-2.5 mb-1 text-[15px] leading-tight">{p.name}</h3>
      <span className="text-[var(--as-mute)]">{brl(p.price)}</span>
    </Link>
  );
}
