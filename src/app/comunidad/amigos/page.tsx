
import Friends from "@/components/community/Friends";

export default function AmigosPage() {
  const friendsList = [
    { name: "Juan Perez", avatar: "/Images/Perfil1.png", status: "En línea" },
    { name: "Maria Gomez", avatar: "/Images/Perfil2.jpg", status: "Desconectado" },
    { name: "Carlos Ruiz", avatar: "/Images/Perfil3.jpg", status: "En línea" },
    { name: "Ana Torres", avatar: "/Images/Perfil4.jpg", status: "Ocupado" },
    { name: "Luis Fernandez", avatar: "/Images/Perfil5.jpg", status: "En línea" },
    { name: "Sofia Martinez", avatar: "/Images/Perfil6.jpg", status: "Desconectado" },
    { name: "Miguel Sanchez", avatar: "/Images/Perfil7.jpg", status: "En línea" }
  ];

  return (
    <>
      <h1 title="Amigos"  className="text-2xl font-bold gap-4 mb-4">Amigos</h1>

      <Friends friends={friendsList} />
    </>
  );
}
