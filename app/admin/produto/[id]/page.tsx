import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { imgUrl, type Product } from "@/lib/utils";
import { deleteImage, saveProduct } from "../../actions";

export default async function EditarProduto({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = await requireAdmin();
  const isNew = id === "novo";
  const { data: cats } = await sb.from("categories").select("*").order("name");
  const p = isNew ? null : ((await sb.from("products").select("*,product_images(*)").eq("id", id).maybeSingle()).data as Product | null);
  if (!isNew && !p) notFound();
  const f = "w-full border px-3 py-2";
  const l = "mb-1 mt-4 block text-sm font-semibold";
  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-black">{isNew ? "Novo produto" : "Editar produto"}</h1>
      {p && p.product_images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {p.product_images.map((i) => (
            <form key={i.id} action={deleteImage}>
              <input type="hidden" name="id" value={i.id} />
              <img src={imgUrl(i.path)} alt="" className="aspect-square w-full object-cover" />
              <button className="mt-1 w-full border border-red-600 py-1 text-xs text-red-600">Remover foto</button>
            </form>
          ))}
        </div>
      )}
      <form action={saveProduct}>
        {p && <input type="hidden" name="id" value={p.id} />}
        <label className={l}>Nome</label>
        <input name="name" required minLength={2} maxLength={120} defaultValue={p?.name} className={f} />
        <label className={l}>Endereço (slug). Deixe em branco para gerar do nome</label>
        <input name="slug" maxLength={140} defaultValue={p?.slug} className={f} />
        <label className={l}>Descrição</label>
        <textarea name="description" rows={4} maxLength={2000} defaultValue={p?.description} className={f} />
        <label className={l}>Preço (R$)</label>
        <input name="price" required inputMode="decimal" defaultValue={p?.price} className={f} />
        <label className={l}>Categoria</label>
        <select name="category_id" defaultValue={p?.category_id ?? ""} className={f}>
          <option value="">Sem categoria</option>
          {cats?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <label className={l}>Tamanhos (separe por vírgula)</label>
        <input name="sizes" placeholder="P, M, G, GG" defaultValue={p?.sizes.join(", ")} className={f} />
        <label className={l}>Cores (separe por vírgula)</label>
        <input name="colors" placeholder="Preta, Branca, Vermelha" defaultValue={p?.colors.join(", ")} className={f} />
        <div className="mt-4 space-y-2">
          <label className="flex items-center gap-2"><input type="checkbox" name="is_available" defaultChecked={p?.is_available ?? true} /> Disponível (desmarque para Esgotado)</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="is_featured" defaultChecked={p?.is_featured ?? false} /> Destaque na página inicial</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="is_published" defaultChecked={p?.is_published ?? true} /> Publicado (desmarque para rascunho)</label>
        </div>
        <label className={l}>Adicionar fotos (JPG, PNG ou WEBP, até 4 MB cada)</label>
        <input type="file" name="images" accept="image/jpeg,image/png,image/webp" multiple className={f} />
        <button className="mt-6 w-full bg-brand py-3 font-bold text-white">Salvar produto</button>
      </form>
    </div>
  );
}
