import Image from 'next/image';
import { AiOutlineMessage } from "react-icons/ai";
interface FriendsProps {
  friends: { name: string; avatar: string; status: string }[];
}

const Friends = ({ friends }: FriendsProps) => {
  return (
<div>
  {friends.map((friend, idx) => (
    <div
      key={idx}
      title={"amigo " + friend.name}
      className="flex items-center justify-between gap-4 mb-4"
    >
      <div className="flex items-center gap-4" title={"informacion de " + friend.name}>
        <Image
          src={friend.avatar}
          alt={friend.name}
          className="size-14 rounded-full"
          width={56}
          height={56}
          
        />
        <div>
          <p className="font-semibold" title={friend.name}>{friend.name}</p>
          <p className="text-sm text-gray-500" title={friend.status}>{friend.status}</p>
        </div>
      </div>

      <button className="text-lg" title={"Enviar mensaje a " + friend.name}>
        <AiOutlineMessage />
      </button>
    </div>
  ))}
</div>

  );
};
export default Friends;