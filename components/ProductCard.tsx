import Link from "next/link";

type Produto = {
  id: string | number;
  slug?: string;
  nome: string;
  preco: number;
  imagem_url?: string | null;
  novo?: boolean;
};

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function ProductCard({ p }: { p: Produto }) {
  return (
    <Link href={`/produto/${p.slug ?? p.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-[var(--as-line)] bg-gradient-to-br from-[#2b2b2b] to-black">
        {p.imagem_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.imagem_url}
            alt={p.nome}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {p.novo && (
          <span className="absolute left-2 top-2 rounded-[3px] bg-[var(--as-red)] px-2 py-0.5 text-xs font-semibold">
            Novo
          </span>
        )}
      </div>
      <h3 className="font-display mt-2.5 mb-1 text-[15px] leading-tight">{p.nome}</h3>
      <span className="text-[var(--as-mute)]">{brl(p.preco)}</span>
    </Link>
  );
}
