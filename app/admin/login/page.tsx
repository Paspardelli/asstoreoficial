import { login } from "../actions";

export default async function Login({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-black">Painel da loja</h1>
      {erro && <p className="mt-2 text-red-600">E-mail ou senha incorretos.</p>}
      <form action={login} className="mt-4 space-y-3">
        <input name="email" type="email" required autoComplete="email" placeholder="E-mail" className="w-full border px-3 py-3" />
        <input name="password" type="password" required autoComplete="current-password" placeholder="Senha" className="w-full border px-3 py-3" />
        <button className="w-full bg-black py-3 font-bold text-white">Entrar</button>
      </form>
    </div>
  );
}
