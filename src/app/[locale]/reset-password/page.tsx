"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "@/lib/authClient";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const [newpass, setNewpass] = useState("");
  const [err, setErr] = useState<string | null>(null);

  if (!token || !email) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--colorText)]">
          Enlace inválido o incompleto.
        </p>
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    if (newpass.length < 6) {
      return setErr("La nueva contraseña debe tener al menos 6 caracteres.");
    }

    const res = await apiFetch("/auth/reset-password-token", {
      method: "POST",
      body: JSON.stringify({
        email,
        token,
        nuevaContrasena: newpass,
      }),
    });

    if (!res.ok) {
      return setErr("El enlace es inválido o ha expirado.");
    }

    alert("Contraseña actualizada. Ahora inicia sesión.");
    router.push("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-[var(--colorMenus)]">
          Nueva contraseña
        </h1>

        {err && (
          <p className="text-sm mb-3 text-[var(--colorText)]">
            {err}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="border rounded-lg p-3 text-[var(--colorText)]"
            placeholder="Nueva contraseña"
            type="password"
            value={newpass}
            onChange={(e) => setNewpass(e.target.value)}
          />
          <button className="rounded-lg bg-[var(--colorMenus)] text-white py-3">
            Cambiar contraseña
          </button>
        </form>
      </div>
    </main>
  );
}
