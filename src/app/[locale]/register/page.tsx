"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { register as registerUser } from "@/lib/authClient";

export default function RegisterPage() {
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");

    if (!name || !email || !password) {
      return setErr("Completa todos los campos.");
    }
    if (password.length < 6) {
      return setErr("La contraseña debe tener al menos 6 caracteres.");
    }

    const ok = await registerUser(name, email, password);

    if (!ok) {
      return setErr("No se pudo crear la cuenta. ¿El correo ya está registrado?");
    }

    alert("Registro exitoso. Ahora inicia sesión.");
    router.push("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-[var(--colorMenus)]">
          Crear cuenta
        </h1>

        {err && (
          <p className="text-sm mb-3 text-[var(--colorText)]">
            {err}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input
            className="border rounded-lg p-3 text-[var(--colorText)]"
            name="name"
            placeholder="Nombre"
          />
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
            Registrarme
          </button>
        </form>

        <p className="text-sm mt-4 text-center text-[var(--colorText)]">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-[var(--colorMenus)] hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </main>
  );
}
