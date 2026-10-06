import { brl, WA } from "./utils";
export type Line = { name: string; slug: string; size: string; color: string; qty: number; price: number };
export function waLink(lines: Line[], origin: string) {
  const body = lines.map((l, i) =>
    `${i + 1}) ${l.name}\nTamanho: ${l.size} | Cor: ${l.color} | Qtd: ${l.qty}\nPreço: ${brl(l.price * l.qty)}\nLink: ${origin}/produto/${l.slug}`
  ).join("\n\n");
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const msg = `Olá! Gostaria de fazer uma encomenda:\n\n${body}\n\nTotal: ${brl(total)}`;
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}
