import Link from "next/link";

export default async function Landing({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border p-8 shadow-sm text-center">
        <h1 className="text-3xl font-semibold text-[var(--colorMenus)]">
          Bienvenido a Lecturium
        </h1>
        <p className="text-sm mt-2 text-[var(--colorText)]">
          Elige una opción para continuar
        </p>

        <div className="flex flex-col gap-3 mt-6">
          <Link
            href="/login"
            className="w-full rounded-xl border px-4 py-3 text-center text-[var(--colorText)] hover:bg-[var(--colorMenus)] hover:text-white transition"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/register"
            className="w-full rounded-xl bg-[var(--colorMenus)] px-4 py-3 text-center text-white hover:opacity-90 transition"
          >
            Registrarse
          </Link>
        </div>

        <p className="text-xs mt-6 text-[var(--colorText)]">
          Al continuar aceptas los Términos y la Política de Privacidad.
        </p>
      </div>
    </main>
  );
}
