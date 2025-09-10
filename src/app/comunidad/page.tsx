import Sidebar from "@/components/Sidebar";
import Friends from "@/components/Friends"; 

export default function Comunidad() {
  const sidebarItems = [
    { name: "Comunidad Autores", link: "#", icon: <span>🔗</span> },
    { name: "Amigos", link: "#", icon: <span>🔗</span> },
    { name: "Club de Lectura", link: "#", icon: <span>🔗</span> }
  ];

  const friendsList = [
    { name: "Juan Perez", avatar: "/Images/avatar1.jpg", status: "En línea" },
    { name: "Maria Gomez", avatar: "/Images/avatar2.jpg", status: "Desconectado" },
    { name: "Carlos Ruiz", avatar: "/Images/avatar3.jpg", status: "En línea" }
  ];

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Sidebar items={sidebarItems} />
      <Friends friends={friendsList} />
      <h1 className="row-start-1 text-2xl font-bold">Comunidad</h1>
      <p className="row-start-2">Bienvenido a la comunidad</p>
      <footer className="row-start-3">© 2023 Comunidad</footer>
    </div>
  );
}
