import React, { JSX } from 'react';


interface SidebarProps {
  items: { name: string; link: string; icon: JSX.Element }[];
}

const Sidebar = ({ items }: SidebarProps) => {



  return (
    <div>
      {items.map((item, idx) => (
        <a key={idx} href={item.link} className="flex items-center gap-2">
          {item.icon}
          <span>{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export default Sidebar;

