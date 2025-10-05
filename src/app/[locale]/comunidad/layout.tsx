import Sidebar from "@/components/navigation/Sidebar";

import { FaUsers, FaUserFriends, FaBook } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function ComunidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('communityLayout');
  const sidebarItems = [
    { name: t('communityLayout.authorsCommunity'), link: "/comunidad", icon: <FaUsers /> },
    { name: t('communityLayout.friends'), link: "/comunidad/amigos", icon: <FaUserFriends /> },
    { name: t('communityLayout.readingClub'), link: "/comunidad/club", icon: <FaBook /> },
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
