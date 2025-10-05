"use client";
import { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface MenuOption {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface SideMenuProps {
  options: MenuOption[];
  selectedF: MenuOption;
  
  onSelect?: (option: MenuOption) => void;
}

const SideMenu = ({ options, selectedF, onSelect}:SideMenuProps) => {
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState(selectedF.label);

    const toggleIfSelected = (option: MenuOption) => {
    if (selected === option.label) {
        setOpen(!open);
        } else {
        setSelected(option.label);
        onSelect?.(option);
        }
    };

    return(
        <aside title="Menu lateral" className={`${ open ? "w-52" : "w-16" } h-full bg-[var(--colorMenus)] p-4 flex flex-col space-y-4 rounded-md shadow-md transition-all duration-300 `}>
            {/* Botón para abrir/cerrar */}
            <button
                onClick={() => setOpen(!open)}
                className="ml-auto mb-2 text-[var(--colorClaro)] hover:opacity-80 pb-2"
            >
                {open ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
            </button>

            {/* Opciones dinámicas */}
            <nav className={`flex flex-col space-y-4 text-[var(--colorClaro)] font-newsreader  ${!open && "justify-center" }`}>
                {options.map((opt) => (
                <div
                    title={opt.label}
                    key={opt.label}
                    className={`flex items-center space-x-2 cursor-pointer hover:opacity-80 p-2 ${
                    selected === opt.label ? " bg-[var(--colorClaro)] text-[var(--colorSecundario)] rounded-md font-bold" : ""
                    }`}
                    onClick={() => {
                        setSelected(opt.label); 
                        onSelect?.(opt);
                    }}
                    onDoubleClick={() => toggleIfSelected(opt)}
                >
                    {opt.icon}
                    {open && <span>{opt.label}</span>}
                </div>
                ))}
            </nav>
        </aside>

    );
}

export default SideMenu;