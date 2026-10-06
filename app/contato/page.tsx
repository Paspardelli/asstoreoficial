import { WA, IG } from "@/lib/utils";
export default function Contato() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-black">Contato</h1>
      <div className="mt-6 grid gap-3">
        <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 py-4 text-center font-bold text-white">Chamar no WhatsApp</a>
        <a href={`https://instagram.com/${IG}`} target="_blank" rel="noopener noreferrer" className="bg-black py-4 text-center font-bold text-white">Instagram @{IG}</a>
      </div>
    </div>
  );
}
