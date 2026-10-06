"use client";
import { useState } from "react";
import ProductImage from "./ProductImage";

export default function Gallery({ paths, alt }: { paths: string[]; alt: string }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <ProductImage path={paths[i]} alt={alt} sizes="(min-width: 768px) 50vw, 100vw" priority />
      {paths.length > 1 && (
        <div className="mt-2 grid grid-cols-5 gap-2">
          {paths.map((p, k) => (
            <button key={p} onClick={() => setI(k)} aria-label={`Ver foto ${k + 1}`} aria-current={k === i}
              className={`block w-full overflow-hidden border-2 ${k === i ? "border-brand" : "border-transparent"}`}>
              <ProductImage path={p} alt="" sizes="20vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
