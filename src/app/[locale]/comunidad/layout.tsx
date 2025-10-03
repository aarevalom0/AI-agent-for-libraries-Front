import Sidebar from "@/components/navigation/Sidebar";

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
    <div className="flex">

      <Sidebar items={sidebarItems} />

      
      <main className="flex-1 p-5">
        {children}
      </main>
    </div>
  );
}
