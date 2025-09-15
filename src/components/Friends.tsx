
interface FriendsProps {
  friends: { name: string; avatar: string; status: string }[];
}

const Friends = ({ friends }: FriendsProps) => {
  return (
    <div>
      {friends.map((friend, idx) => (
        <div key={idx} title={"amigo "+friend.name} className="flex ... gap-4 mb-4">
          <img src={friend.avatar} alt={friend.name} className="size-14 grow-0 ..." />
          <div className="size-14 grow ...">
            <p className="font-semibold">{friend.name}</p>
            <p className="text-sm text-gray-500">{friend.status}</p>
          </div>
          <div className="size-14 grow-0 ...">
            <button className="p-2">💬</button>
          </div>
        </div>
        
      ))}
    </div>
  );
};
export default Friends;