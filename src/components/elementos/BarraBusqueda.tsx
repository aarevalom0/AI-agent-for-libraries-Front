"use client";
import { useState, useId } from "react";
import React from 'react';
import Search from '@mui/icons-material/Search';

interface BarraBusquedaProps {
    textHolder: string;
    ancho: "sm" | "md" | "lg";
    ariaLabel?: string;
    onSearch?: (value: string) => void;
}

const BarraBusqueda = ({textHolder, ancho, ariaLabel, onSearch}: BarraBusquedaProps) => {
    const widthClass = ancho === "sm" ? "w-30" : ancho === "md" ? "w-64" : "w-full";
    const [busqueda, setBusqueda] = useState("");
    const searchId = useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setBusqueda(value);
        onSearch?.(value);
    };

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
                value={busqueda}
                className="bg-transparent text-[var(--colorSecundario)] outline-none flex-1 focus:ring-0"
                onChange={handleChange}
                aria-label={ariaLabel || textHolder}
                autoComplete="off"
            />
        </div>
    );
}

export default BarraBusqueda;
