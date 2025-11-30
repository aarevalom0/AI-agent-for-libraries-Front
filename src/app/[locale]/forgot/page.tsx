"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/authClient";

export default function ForgotPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setOk(false);

    if (!email) return setErr("Ingresa tu email.");

    const res = await apiFetch("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return setErr("Ocurrió un error al solicitar el reset.");
    }

    setOk(true);
    // Puedes no redirigir; solo mostrar mensaje
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-[var(--colorMenus)]">
          Recuperar contraseña
        </h1>

        {err && (
          <p className="text-sm mb-3 text-[var(--colorText)]">
            {err}
          </p>
        )}

        {ok && (
          <p className="text-sm mb-3 text-[var(--colorText)]">
            Si el correo está registrado, te enviamos un enlace de recuperación.
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="border rounded-lg p-3 text-[var(--colorText)]"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="rounded-lg bg-[var(--colorMenus)] text-white py-3">
            Enviar enlace
          </button>
        </form>
      </div>
    </main>
  );
}
