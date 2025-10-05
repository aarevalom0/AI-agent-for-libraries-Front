"use client";

import React from 'react';
import Search from '@mui/icons-material/Search';

interface BarraBusquedaProps {
    textHolder: string;
    ancho: "sm" | "md" | "lg";
    value: string;
    onChange: (value: string) => void;
}

const BarraBusqueda = ({textHolder, ancho, value, onChange}: BarraBusquedaProps) => {
    const widthClass = ancho === "sm" ? "w-30" : ancho === "md" ? "w-64" : "w-full";

    return (
        <div className={`flex items-center rounded-full px-4 py-2 ${widthClass} bg-[var(--colorBarras)] border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-[var(--colorPrincipal)]`}>
            <label htmlFor={searchId} className="sr-only">
                {ariaLabel || textHolder}
            </label>
            <Search 
                className="w-5 h-5 text-[var(--colorSecundario)] mr-3" 
                aria-hidden="true"
            />
            <input
                id={searchId}
                type="text"
                placeholder={textHolder}
                className="!bg-[var(--colorBarras)] text-[var(--colorSecundario)] outline-none flex-1 "
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default BarraBusqueda;
