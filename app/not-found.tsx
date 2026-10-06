import Link from "next/link";
export default function NotFound() {
  return (
    <div className="px-4 py-24 text-center">
      <p className="text-5xl font-black">404</p>
      <p className="mt-2 text-neutral-600">Essa página não existe ou o produto saiu do catálogo.</p>
      <Link href="/catalogo" className="mt-6 inline-block bg-brand px-6 py-3 font-bold text-white">Ver catálogo</Link>
    </div>
  );
}
