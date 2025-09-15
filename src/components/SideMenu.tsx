"use client";
import { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BookOpen, List, Check, Star, Plus } from "lucide-react";

const SideMenu = () => {
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState<string | null>(null);

    const toggleIfSelected = (option: string) => {
    if (selected === option) {
        setOpen(!open);
        } else {
        setSelected(option);
        }
    };

    return(
        <aside className={`${ open ? "w-52" : "w-16" } bg-[var(--colorMenus)] p-4 flex flex-col space-y-4 rounded-md shadow-md transition-all duration-300`}>
            {/* Botón para abrir/cerrar */}
            <button
                onClick={() => setOpen(!open)}
                className="ml-auto mb-2 text-[var(--colorClaro)] hover:opacity-80"
            >
                {open ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
            </button>

            {/* Encabezado */}
            <div
                className={`flex items-center space-x-2 bg-[var(--colorClaro)] rounded-md p-2 ${
                !open && "justify-center"
                }`}
            >
                <BookOpen className="text-[var(--colorSecundario)]" />
                {open && (
                <span className="font-bold text-sm text-[var(--colorSecundario)]">
                    Mi Biblioteca
                </span>
                )}
            </div>

            {/* Opciones */}
            <nav className="flex flex-col space-y-4 text-[var(--colorClaro)] font-newsreader">
                <div
                className={`flex items-center space-x-2 cursor-pointer hover:opacity-80 ${
                    selected === "leer" ? "font-bold" : ""
                }`}
                onClick={() => setSelected("leer")}
                onDoubleClick={() => toggleIfSelected("leer")}
                >
                <List size={18} />
                {open && <span>Para leer</span>}
                </div>

                <div
                className={`flex items-center space-x-2 cursor-pointer hover:opacity-80 ${
                    selected === "leidos" ? "font-bold" : ""
                }`}
                onClick={() => setSelected("leidos")}
                onDoubleClick={() => toggleIfSelected("leidos")}
                >
                <Check size={18} />
                {open && <span>Leídos</span>}
                </div>

                <div
                className={`flex items-center space-x-2 cursor-pointer hover:opacity-80 ${
                    selected === "favoritos" ? "font-bold" : ""
                }`}
                onClick={() => setSelected("favoritos")}
                onDoubleClick={() => toggleIfSelected("favoritos")}
                >
                <Star size={18} />
                {open && <span>Favoritos</span>}
                </div>

                <div
                className={`flex items-center space-x-2 cursor-pointer hover:opacity-80 ${
                    selected === "crear" ? "font-bold" : ""
                }`}
                onClick={() => setSelected("crear")}
                onDoubleClick={() => toggleIfSelected("crear")}
                >
                <Plus size={18} />
                {open && <span>Crear Colección</span>}
                </div>
            </nav>
            </aside>

    );
}

export default SideMenu;