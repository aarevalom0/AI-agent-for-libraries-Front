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
        <h1 className="text-2xl font-semibold mb-6">Crear cuenta</h1>
        {err && <p className="text-red-600 text-sm mb-3">{err}</p>}
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input className="border rounded-lg p-3" name="name" placeholder="Nombre" />
          <input className="border rounded-lg p-3" name="email" placeholder="Email" type="email" />
          <input className="border rounded-lg p-3" name="password" placeholder="Contraseña" type="password" />
          <button className="rounded-lg bg-black text-white py-3">Registrarme</button>
        </form>
      </div>
    </main>
  );
}
