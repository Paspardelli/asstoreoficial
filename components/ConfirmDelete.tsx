"use client";
export default function ConfirmDelete({ text }: { text: string }) {
  return (
    <button
      onClick={(e) => { if (!confirm(text)) e.preventDefault(); }}
      className="border border-red-600 px-3 py-1 text-sm text-red-600"
    >Excluir</button>
  );
}
