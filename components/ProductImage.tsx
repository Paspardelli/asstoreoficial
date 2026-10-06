import Image from "next/image";
import { imgUrl } from "@/lib/utils";

// Moldura padrão: toda foto vira 3:4, centralizada e cortada igual.
// Sem foto, mostra o mesmo placeholder da marca em qualquer produto.
export default function ProductImage({ path, alt, sizes, priority = false }: {
  path?: string | null; alt: string; sizes: string; priority?: boolean;
}) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
      {path ? (
        <Image src={imgUrl(path)} alt={alt} fill sizes={sizes} priority={priority}
          unoptimized={path.startsWith("/")}
          className="object-cover transition duration-500 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-black">
          <span className="text-5xl font-black tracking-widest text-white/90">AS<span className="text-brand">.</span></span>
        </div>
      )}
    </div>
  );
}
