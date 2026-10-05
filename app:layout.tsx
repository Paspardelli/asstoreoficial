import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import { CartProvider } from "@/lib/cart";
import { WA, IG } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ASStore | Streetwear",
  description: "Streetwear com encomenda direto pelo WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-neutral-900 antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <footer className="mt-16 bg-black text-neutral-300">
            <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2">
              <div>
                <p className="text-xl font-black tracking-widest text-white">AS<span className="text-brand">STORE</span></p>
                <p className="mt-2 text-sm">Streetwear. Encomendas pelo WhatsApp.</p>
              </div>
              <div className="space-y-1 text-sm">
                <a className="block hover:text-brand" href={`https://instagram.com/${IG}`} target="_blank" rel="noopener noreferrer">Instagram @{IG}</a>
                <a className="block hover:text-brand" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
          </footer>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"
            className="fixed bottom-4 right-4 z-50 rounded-full bg-green-500 px-4 py-3 font-bold text-white shadow-lg">WhatsApp</a>
        </CartProvider>
      </body>
    </html>
  );
}
