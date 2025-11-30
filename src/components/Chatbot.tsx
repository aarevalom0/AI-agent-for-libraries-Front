"use client";
import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { sendMessageToChat } from "../services/chat.api";


export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Bienvenido a Lecturium. ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
   const pathname = usePathname();

const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = input;
  setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
  setInput("");

  try {
    const data = await sendMessageToChat(userMessage);

    setMessages((prev) => [
      ...prev,
      { role: "bot", text: data.response || "Lo siento, no pude procesar tu mensaje." },
    ]);
  } catch (error) {
    console.error("ERROR CHAT:", error);
    setMessages((prev) => [
      ...prev,
      { role: "bot", text: "Error: No se pudo conectar con el servidor." + error },
    ]);
  }
};

  return (
    <div className="fixed bottom-5 right-5" title="Chatbot de Lecturium">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={`p-4 rounded-full shadow-lg transition text-white ${pathname === "/es/mainPage" || pathname === "/en/mainPage" ? "bg-[var(--colorClaro)]" : "bg-[var(--colorPrincipal)]"}`}
          

        >
          <MessageCircle size={24} color={pathname === "/es/mainPage" || pathname === "/en/mainPage" ? "var(--colorPrincipal)" : "var(--background)"} />
        </button>
      )}


      {open && (
        <div
          className="w-80 h-96 shadow-2xl rounded-2xl flex flex-col overflow-hidden background var(--colorClaro) "
          
        >

          <div
            className="flex justify-between items-center p-3 text-white"
            style={{ backgroundColor: "var(--colorPrincipal)" }}
            title ="Cerrar chatbot"
          >
            <span className="font-semibold">Lecturium</span>
            <button
              onClick={() => setOpen(false)}
              className="hover:opacity-80 transition"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto p-3 space-y-2"
            style={{ backgroundColor: "var(--colorBarras)" }}
            title ="Área de mensajes"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl text-sm max-w-[70%]`}
                  style={{
                    backgroundColor:
                      msg.role === "user"
                        ? "var(--colorSecundario)"
                        : "var(--colorClaroDetallesTransp)",
                    color:
                      msg.role === "user"
                        ? "var(--background)"
                        : "var(--foreground)",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>


          <div
            className="p-3 flex gap-2 border-t"
            style={{ backgroundColor: "var(--background)" }}
            title ="Área de entrada de mensaje"
          >
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{
                border: "1px solid var(--colorClaroDetalles)",
                backgroundColor: "var(--colorClaroTrans)",
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-xl transition"
              title ="Enviar mensaje"
              style={{
                backgroundColor: "var(--colorPrincipal)",
                color: "var(--background)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--colorPrincipalHover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--colorPrincipal)")
              }
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
