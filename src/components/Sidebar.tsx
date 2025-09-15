"use client";

import Link from "next/link";
import { useState } from "react";
import { JSX } from "react";
import { FaUsers, FaUserFriends, FaBook } from "react-icons/fa";

interface SidebarProps {
  items: { name: string; link: string; icon: JSX.Element }[];
  
}

const Sidebar = ({ items }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={` bg-[var(--colorMenus)] text-white transition-all duration-300 
      ${isCollapsed ? "w-16" : "w-48"}`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-2 w-full text-center hover:bg-[var(--colorPrincipal)]"
      >
        {isCollapsed ? "➡️" : "⬅️"}
      </button>

      <nav className="mt-4 flex flex-col gap-2">
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            className="flex items-center gap-2 px-3 py-2 hover:bg-[var(--colorPrincipal)] rounded-md"
          >
            <span className="text-lg">{item.icon}</span>
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;


