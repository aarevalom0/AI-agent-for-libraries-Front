"use client";

import { useState } from "react";
import { getSecurityQuestion, canResetWithAnswer, resetPassword, userExists } from "@/lib/authClient";
import { useRouter } from "next/navigation";

export default function ForgotPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function handleCheckEmail(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!email) return setErr("Ingresa tu email.");
    if (!userExists(email)) return setErr("No encontramos ese correo.");
    const q = getSecurityQuestion(email);
    if (!q) return setErr("Este usuario no tiene pregunta de seguridad registrada.");
    setQuestion(q);
  }

  function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const answer = String(fd.get("answer") || "");
    const newpass = String(fd.get("newpass") || "");
    if (!canResetWithAnswer(email, answer)) return setErr("Respuesta incorrecta.");
    if (newpass.length < 6) return setErr("La nueva contraseña debe tener al menos 6 caracteres.");
    resetPassword(email, newpass);
    alert("Contraseña actualizada. Ahora inicia sesión.");
    router.push("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-[var(--colorMenus)]">Recuperar contraseña</h1>
        {err && <p className="text-sm mb-3 text-[var(--colorText)]">{err}</p>}

        {!question ? (
          <form className="flex flex-col gap-4" onSubmit={handleCheckEmail}>
            <input className="border rounded-lg p-3 text-[var(--colorText)]"
                   placeholder="Email" type="email"
                   value={email} onChange={e => setEmail(e.target.value)} />
            <button className="rounded-lg bg-[var(--colorMenus)] text-white py-3">Continuar</button>
          </form>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleReset}>
            <p className="text-[var(--colorText)] text-sm">{question}</p>
            <input className="border rounded-lg p-3 text-[var(--colorText)]" name="answer" placeholder="Respuesta" />
            <input className="border rounded-lg p-3 text-[var(--colorText)]" name="newpass" placeholder="Nueva contraseña" type="password" />
            <button className="rounded-lg bg-[var(--colorMenus)] text-white py-3">Cambiar contraseña</button>
          </form>
        )}
      </div>
    </main>
  );
}
