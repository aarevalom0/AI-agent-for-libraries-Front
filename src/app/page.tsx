import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border p-8 shadow-sm text-center">
        <h1 className="text-3xl font-semibold">Bienvenido a Lecturium</h1>
        <p className="text-sm text-gray-500 mt-2">Elige una opción para continuar</p>

        <div className="flex flex-col gap-3 mt-6">
          <Link href="/login" className="rounded-xl border px-4 py-3 hover:bg-gray-50">
            Iniciar sesión
          </Link>
          <Link href="/register" className="rounded-xl bg-black px-4 py-3 text-white hover:opacity-90">
            Registrarse
          </Link>
        </div>
      </div>
    </main>
  );
}
