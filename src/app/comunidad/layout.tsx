import Sidebar from "@/components/Sidebar";
import { FaUsers, FaUserFriends, FaBook } from "react-icons/fa";

export default function ComunidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarItems = [
    { name: "Comunidad Autores", link: "/comunidad", icon: <FaUsers /> },
    { name: "Amigos", link: "/comunidad/amigos", icon: <FaUserFriends /> },
    { name: "Club de Lectura", link: "/comunidad/club", icon: <FaBook /> },
  ];

  return (
    <div className="grid grid-cols-[200px_1fr] min-h-screen">
      <Sidebar items={sidebarItems} />
      <main className="p-6">{children}</main>
    </div>
  );
}
