
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
      {/* Avatar + info */}
      <div className="flex items-center gap-4">
        <img
          src={friend.avatar}
          alt={friend.name}
          className="size-14 rounded-full"
        />
        <div>
          <p className="font-semibold">{friend.name}</p>
          <p className="text-sm text-gray-500">{friend.status}</p>
        </div>
      </div>

      <button className="p-2 hover:bg-gray-100 rounded-full">💬</button>
    </div>
  ))}
</div>

  );
};
export default Friends;