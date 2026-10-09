import Link from "next/link";

const FAIXA = "ASSTORE ★ STREETWEAR ★ PEDIDO PELO WHATSAPP ★ ";

export default function Hero() {
  return (
    <>
      <section className="as-hero px-[18px] pt-14 pb-11 overflow-hidden">
        <h1 className="font-display text-[clamp(64px,22vw,230px)] tracking-[-0.03em]">
          <span className="as-outline">AS</span>
          <br />
          <span className="as-grad">STORE</span>
        </h1>
        <p className="mt-6 mb-7 max-w-[34ch] text-lg text-[#cfcfcb]">
          Streetwear que chega no seu WhatsApp. Escolha as peças, monte a sacola e feche direto com a gente.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/catalogo" className="rounded bg-[var(--as-red)] px-6 py-3.5 font-semibold text-white">
            Ver peças
          </Link>
          <a
            href="https://instagram.com/asstoree_officiall"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[var(--as-ink)] px-6 py-3.5 font-semibold"
          >
            Instagram
          </a>
        </div>
      </section>

      <div className="as-band overflow-hidden whitespace-nowrap bg-[var(--as-ink)] py-3.5 text-black" aria-hidden="true">
        <div className="as-run font-display text-xl">{FAIXA.repeat(8)}</div>
      </div>
    </>
  );
}
