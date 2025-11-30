"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/authClient";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      return setErr("Ingresa email y contraseña.");
    }

    const ok = await login(email, password); // 👈 llama al back

    if (!ok) {
      return setErr("Credenciales inválidas o usuario no registrado.");
    }

    // Si todo bien, token + userId ya están en localStorage
    router.push("/mainPage");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-[var(--colorMenus)]">
          Iniciar sesión
        </h1>

        {err && (
          <p className="text-sm mb-3 text-[var(--colorText)]">
            {err}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input
            className="border rounded-lg p-3 text-[var(--colorText)]"
            name="email"
            placeholder="Email"
            type="email"
          />
          <input
            className="border rounded-lg p-3 text-[var(--colorText)]"
            name="password"
            placeholder="Contraseña"
            type="password"
          />
          <button className="rounded-lg bg-[var(--colorMenus)] text-white py-3">
            Entrar
          </button>

          <p className="text-sm mt-3 text-center text-[var(--colorText)]">
            ¿Olvidaste tu contraseña?{" "}
            <a href="/forgot" className="text-[var(--colorMenus)] hover:underline">
              Recupérala aquí
            </a>
          </p>
        </form>

        <p className="text-sm mt-4 text-center text-[var(--colorText)]">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-[var(--colorMenus)] hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </main>
  );
}
