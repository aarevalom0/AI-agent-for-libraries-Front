
import Friends from "@/components/Friends";

export default function AmigosPage() {
  const friendsList = [
    { name: "Juan Perez", avatar: "/Images/avatar1.jpg", status: "En línea" },
    { name: "Maria Gomez", avatar: "/Images/avatar2.jpg", status: "Desconectado" },
    { name: "Carlos Ruiz", avatar: "/Images/avatar3.jpg", status: "En línea" }
  ];

  return (
    <>
      <h1 title="Amigos"  className="text-2xl font-bold gap-4 mb-4">Amigos</h1>

      <Friends friends={friendsList} />
    </>
  );
}
