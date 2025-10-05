
import Friends from "@/components/community/Friends";
import { useTranslations } from "next-intl";

interface Friend {
  name: string;
  avatar: string;
  status: "online" | "offline" | "busy";
}

export default function AmigosPage() {
  const t = useTranslations('communityPage');
  const friendsList = t.raw('friendsPage.friendsList') as Friend[];

  return (
    <>
      <h1 title={t('friendsPage.title')} className="text-2xl font-bold gap-4 mb-4">{t('friendsPage.title')}</h1>

      {friendsList.map((friend, idx) => (
        <Friends key={idx} friends={[friend]} />
      ))}
    </>
  );
}
