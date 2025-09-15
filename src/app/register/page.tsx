"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveUser, userExists } from "@/lib/authClient";

export default function RegisterPage() {
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    const sq = String(form.get("sq") || "");
    const sa = String(form.get("sa") || "");
    saveUser({ name, email, password, sq, sa: sa.trim() });

    if (!name || !email || !password) return setErr("Completa todos los campos.");
    if (password.length < 6) return setErr("La contraseña debe tener al menos 6 caracteres.");
    if (userExists(email)) return setErr("Este correo ya está registrado.");

    saveUser({ name, email, password });
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
          <input className="border rounded-lg p-3 text-[var(--colorText)]" 
          name="sq" 
          placeholder="Pregunta de seguridad (ej. Nombre de tu primera mascota)" />
          <input 

          className="border rounded-lg p-3 text-[var(--colorText)]" 
          name="sa" 
          placeholder="Respuesta de seguridad" />

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
