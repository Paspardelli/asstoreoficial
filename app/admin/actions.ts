"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

const slugRe = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const tag = z.string().trim().min(1).max(30);
const ProductSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z.string().regex(slugRe).max(140),
  description: z.string().max(2000),
  price: z.coerce.number().min(0).max(99999),
  category_id: z.string().uuid().nullable(),
  sizes: z.array(tag).max(12),
  colors: z.array(tag).max(12),
  is_available: z.boolean(),
  is_featured: z.boolean(),
  is_published: z.boolean(),
});
const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

export async function login(fd: FormData) {
  const sb = await createClient();
  const { error } = await sb.auth.signInWithPassword({ email: String(fd.get("email") ?? ""), password: String(fd.get("password") ?? "") });
  if (error) redirect("/admin/login?erro=1");
  redirect("/admin");
}

export async function logout() {
  const sb = await createClient();
  await sb.auth.signOut();
  redirect("/admin/login");
}

export async function saveProduct(fd: FormData) {
  const sb = await requireAdmin();
  const list = (k: string) => String(fd.get(k) ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const name = String(fd.get("name") ?? "");
  const data = ProductSchema.parse({
    name,
    slug: slugify(String(fd.get("slug") || name)),
    description: String(fd.get("description") ?? ""),
    price: String(fd.get("price") ?? "0").replace(",", "."),
    category_id: String(fd.get("category_id") || "") || null,
    sizes: list("sizes"),
    colors: list("colors"),
    is_available: fd.get("is_available") === "on",
    is_featured: fd.get("is_featured") === "on",
    is_published: fd.get("is_published") === "on",
  });

  let pid = String(fd.get("id") || "");
  if (pid) {
    const { error } = await sb.from("products").update(data).eq("id", pid);
    if (error) throw new Error(error.message);
  } else {
    const { data: row, error } = await sb.from("products").insert(data).select("id").single();
    if (error || !row) throw new Error(error?.message ?? "Erro ao salvar");
    pid = row.id;
  }

  for (const f of fd.getAll("images")) {
    if (!(f instanceof File) || f.size === 0) continue;
    const ext = EXT[f.type];
    if (!ext || f.size > 4_000_000) throw new Error("Foto inválida: use JPG, PNG ou WEBP de até 4 MB.");
    const path = `${pid}/${crypto.randomUUID()}.${ext}`;
    const up = await sb.storage.from("product-images").upload(path, f, { contentType: f.type });
    if (up.error) throw new Error(up.error.message);
    await sb.from("product_images").insert({ product_id: pid, path, position: Math.floor(Date.now() / 1000) });
  }
  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function deleteProduct(fd: FormData) {
  const sb = await requireAdmin();
  const id = z.string().uuid().parse(fd.get("id"));
  const { data: imgs } = await sb.from("product_images").select("path").eq("product_id", id);
  if (imgs?.length) await sb.storage.from("product-images").remove(imgs.map((i) => i.path));
  await sb.from("products").delete().eq("id", id);
  revalidatePath("/", "layout");
}

export async function deleteImage(fd: FormData) {
  const sb = await requireAdmin();
  const id = z.string().uuid().parse(fd.get("id"));
  const { data: img } = await sb.from("product_images").select("path").eq("id", id).maybeSingle();
  if (img) await sb.storage.from("product-images").remove([img.path]);
  await sb.from("product_images").delete().eq("id", id);
  revalidatePath("/", "layout");
}

export async function addCategory(fd: FormData) {
  const sb = await requireAdmin();
  const name = z.string().trim().min(2).max(60).parse(fd.get("name"));
  const { error } = await sb.from("categories").insert({ name, slug: slugify(name) });
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}
