export type Product = {
  id: string; name: string; slug: string; description: string; price: number;
  category_id: string | null; sizes: string[]; colors: string[];
  is_available: boolean; is_featured: boolean; is_published: boolean;
  product_images: { id: string; path: string; position: number }[];
};
export const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
export const imgUrl = (p: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${p}`;
export const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
export const IG = process.env.NEXT_PUBLIC_INSTAGRAM ?? "";
export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
