"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import SearchIcon from "@mui/icons-material/Search";
import { useState } from 'react';



const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="bg-background text-color-secundario p-4">
        <nav className="container mx-auto flex justify-between font-newsreader">
            <div className=' flex justify-between items-center gap-3'>
                <div id='logo'>
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/logo.png"
                            alt="App's logo"
                            width={40}
                            height={40}
                        />
                        <span className="text-xl font-bold font-newsreader">Lecturium</span>
                    </Link>
                </div>
                
                <div id='links hidden md:flex items-center'>
                    <ul className="hidden md:flex gap-3 font-medium">
                        <li>
                            <Link href="/" className="px-3 hover:text-gray-300 font-newsreader">Home</Link>
                        </li>
                        <li>
                            <Link href="/eventos" className="px-3 hover:text-gray-300">Eventos</Link>
                        </li>
                        <li>
                            <Link href="/estadisticas" className="px-3 hover:text-gray-300">Estadísticas</Link>
                        </li>
                        <li>
                            <Link href="/miBiblioteca" className="px-3 hover:text-gray-300">Mi biblioteca</Link>
                        </li>
                        <li>
                            <Link href="/leerAhora" className="px-3 hover:text-gray-300">Leer Ahora</Link>
                        </li>
                        <li>
                            <Link href="/leerAhora" className="px-3 hover:text-gray-300">Comunidad</Link>
                        </li>
                    </ul>  
                </div>
            </div>

            <div id="Iconos" className="hidden md:flex justify-end flex-1">
                <div className="pl-2 flex items-center w-64 rounded-lg border border-gray-300 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <SearchIcon className="text-gray-500 ml-2" />
                    <input
                    type="text"
                    placeholder="Buscar"
                    className="flex-1 p-2 text-sm bg-transparent focus:outline-none"
                    />
                </div>
            </div>

                


            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden ml-auto p-2 rounded-lg focus:ring-2 focus:ring-gray-200 dark:text-white"
                >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {menuOpen ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    )}
                </svg>
                </button>
            

            {/* Mobile menu dropdown */}
            {menuOpen && (
                <div className="bg-color-menus md:hidden px-4 pb-4 space-y-3 ">
                    {/* Search in mobile */}
                    <div className="pl-2 flex items-center w-40 rounded-lg border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                        <SearchIcon></SearchIcon>
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="flex-1 p-2 text-sm bg-transparent focus:outline-none"
                        />
                    </div>

                    <ul className=" space-y-2 font-medium">
                            <li>
                                <Link href="/" className="px-3 hover:text-gray-300 font-newsreader">Home</Link>
                            </li>
                            <li>
                                <Link href="/eventos" className="px-3 hover:text-gray-300">Eventos</Link>
                            </li>
                            <li>
                                <Link href="/estadisticas" className="px-3 hover:text-gray-300">Estadísticas</Link>
                            </li>
                            <li>
                                <Link href="/miBiblioteca" className="px-3 hover:text-gray-300">Mi biblioteca</Link>
                            </li>
                            <li>
                                <Link href="/leerAhora" className="px-3 hover:text-gray-300">Leer Ahora</Link>
                            </li>
                            <li>
                                <Link href="/leerAhora" className="px-3 hover:text-gray-300">Comunidad</Link>
                            </li>
                    </ul>  
                </div>
            )}

        </nav>
        
        

        </header>
    );
};

export default NavBar;



