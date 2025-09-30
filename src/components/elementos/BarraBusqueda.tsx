"use client";
import { useState } from "react";
import React from 'react';
import Search from '@mui/icons-material/Search';

interface BarraBusquedaProps {
    textHolder: string;
    ancho: "sm" | "md" | "lg";
}

const BarraBusqueda = ({textHolder, ancho}: BarraBusquedaProps) => {
    const widthClass = ancho === "sm" ? "w-30" : ancho === "md" ? "w-64" : "w-full";
    const [busqueda, setBusqueda] = useState("");

    return (
        <div className={`flex items-center rounded-full px-4 py-2 ${widthClass} bg-[var(--colorBarras)] border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-[var(--colorPrincipal)]`}>
            <Search className="w-5 h-5 text-[var(--colorSecundario)] mr-3" />
            <input
                type="text"
                placeholder={textHolder}
                className="bg-transparent text-[var(--colorSecundario)] outline-none flex-1 "
                onChange={(e) => setBusqueda(e.target.value)}
            />
        </div>
    );
}

export default BarraBusqueda;
