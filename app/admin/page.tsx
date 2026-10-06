import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { brl } from "@/lib/utils";
import ConfirmDelete from "@/components/ConfirmDelete";
import { addCategory, deleteProduct, logout } from "./actions";

export default async function Admin() {
  const sb = await requireAdmin();
  const [{ data: prods }, { data: cats }] = await Promise.all([
    sb.from("products").select("id,name,price,is_available,is_published").order("created_at", { ascending: false }),
    sb.from("categories").select("*").order("name"),
  ]);
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">Painel</h1>
        <div className="flex gap-2">
          <Link href="/admin/produto/novo" className="bg-brand px-3 py-2 text-sm font-bold text-white">Novo produto</Link>
          <form action={logout}><button className="border px-3 py-2 text-sm">Sair</button></form>
        </div>
      </div>
      <ul className="divide-y border">
        {(prods ?? []).length === 0 && <li className="p-3 text-neutral-600">Nenhum produto. Toque em Novo produto.</li>}
        {prods?.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-2 p-3">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-neutral-500">{brl(p.price)} · {p.is_available ? "Disponível" : "Esgotado"}{!p.is_published && " · Rascunho"}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/produto/${p.id}`} className="border px-3 py-1 text-sm">Editar</Link>
              <form action={deleteProduct}><input type="hidden" name="id" value={p.id} /><ConfirmDelete text="Excluir este produto e as fotos?" /></form>
            </div>
          </li>
        ))}
      </ul>
      <section>
        <h2 className="font-bold">Categorias</h2>
        <p className="text-sm text-neutral-600">{cats?.map((c) => c.name).join(", ") || "Nenhuma ainda."}</p>
        <form action={addCategory} className="mt-2 flex gap-2">
          <input name="name" required minLength={2} maxLength={60} placeholder="Nova categoria" className="flex-1 border px-3 py-2" />
          <button className="bg-black px-4 font-bold text-white">Adicionar</button>
        </form>
      </section>
    </div>
  );
}
