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
    <div className="flex min-h-screen gap-5">
      <div>
        <Sidebar items={sidebarItems} />
      </div>
      <div className="">
        {children}
      </div>
    </div>
  );
}
