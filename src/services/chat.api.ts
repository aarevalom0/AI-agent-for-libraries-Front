import { API_CHAT_URL } from './api.config';

export async function sendMessageToChat(message: string) {
  console.log("Enviando al backend:", { message });

  const res = await fetch(`${API_CHAT_URL}/chat`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ message }),
  });

  console.log("espuesta backend status:", res.status);

  const data = await res.json().catch(() => {
    console.error("Error parseando JSON");
    return { error: "JSON inválido" };
  });

  console.log("Respuesta backend:", data);

  if (!res.ok) {
    throw new Error("Error al enviar el mensaje al chat");
  }

  return data;
}
