"use client";

import Link from "next/link";
import { useState } from "react";
import { JSX } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface SidebarProps {
  items: { name: string; link: string; icon: JSX.Element }[];
}

const Sidebar = ({ items }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState<string>(items[0]?.name || "");

  return (
    <aside title="Menu lateral" className={`${isOpen ? "w-52" : "w-16"}  bg-[var(--colorMenus)] p-4 flex flex-col space-y-4 rounded-md shadow-md transition-all duration-300`}
    >

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-auto mb-2 text-[var(--colorClaro)] hover:opacity-80 pb-2"
      >
        {isOpen ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
      </button>

      <nav
        className={`flex flex-col space-y-2 text-[var(--colorClaro)] font-newsreader ${
          !isOpen && "justify-center"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            title={item.name}
            onClick={() => setSelected(item.name)}
            className={`flex items-center gap-2 cursor-pointer hover:opacity-80 p-2 rounded-md ${
              selected === item.name
                ? "bg-[var(--colorClaro)] text-[var(--colorSecundario)] font-bold"
                : ""
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
