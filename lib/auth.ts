import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
// Checagem real de admin (não confia só no middleware). O RLS do banco é a última barreira.
export async function requireAdmin() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: ok } = await sb.rpc("is_admin");
  if (!ok) redirect("/admin/login?erro=1");
  return sb;
}
