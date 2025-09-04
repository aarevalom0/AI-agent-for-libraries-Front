"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';



const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="bg-[var(--color-background)]  p-4">
        <nav className="container mx-auto flex justify-between text-[var(--color-secundario)] font-newsreader">
            <div className=' flex items-center gap-2.5'>
                <div id='logo'>
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/Images/Logo.jpg"
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

            <div id="Iconos" className="hidden md:flex justify-end items-center mx-auto flex gap-2">

                {/*Barra de busqueda*/}
                <div className="pl-2 flex items-center w-40 h-10 rounded-lg border border-gray-300 bg-gray-50 focus-within:ring-1 focus-within:ring-[var(--color-principal)] ">
                    <SearchIcon className="text-gray-500 " />
                    <input
                    type="text"
                    placeholder="Buscar"
                    className="flex-1 p-2 text-sm bg-transparent focus:outline-none"
                    />
                </div>

                {/*Notificaciones*/}
                <button className="p-2 flex items-center  rounded-lg border border-gray-300 bg-gray-50 focus-within:ring-1 focus-within:ring-[var(--color-principal)] ">
                    <NotificationsIcon className="text-gray-500"/>
                </button>

                <Link href="/perfil" className="flex items-center space-x-2">
                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                        <Image
                            src="/Images/Perfil1.png"
                            alt="Perfil Logo"
                            width={40}
                            height={40}
                        />
                    </div>
                        
                </Link>

                {/*Ingles/Español*/}
                <button className=''> EN/ES </button>

            </div>

                

            <div className='md:hidden'>
                 <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="ml-auto p-2 rounded-lg focus:ring-2 focus:ring-gray-200 dark:text-white"
                    >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {menuOpen ? (
                        <CloseIcon></CloseIcon>
                        ) : (
                        <MenuIcon></MenuIcon>
                    )}
                </svg>
                </button>
            

                {/* Mobile menu dropdown */}
                {menuOpen && (
                    <div className="bg-[var(--color-menus)] md:hidden justify-center px-4 pb-4 space-y-3 ">
                        {/* Search in mobile */}
                        <div className="pl-2 flex items-center w-40 rounded-lg border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                            <SearchIcon></SearchIcon>
                            <input
                                type="text"
                                placeholder="Buscar"
                                className="flex-1 p-2 text-sm bg-transparent focus:outline-none"
                            />
                        </div>

                        <ul className=" space-y-2 font-medium text-[var(--color-claro)] ">
                                <li>
                                    <Link href="/" className="px-3   hover:text-[var(--colorHover)] font-newsreader">Home</Link>
                                </li>
                                <li>
                                    <Link href="/eventos" className="px-3 hover:text-[var(--colorHover)]">Eventos</Link>
                                </li>
                                <li>
                                    <Link href="/estadisticas" className="px-3 hover:text-[var(--colorHover)]">Estadísticas</Link>
                                </li>
                                <li>
                                    <Link href="/miBiblioteca" className="px-3 hover:text-[var(--colorHover)]">Mi biblioteca</Link>
                                </li>
                                <li>
                                    <Link href="/leerAhora" className="px-3 hover:text-[var(--colorHover)]">Leer Ahora</Link>
                                </li>
                                <li>
                                    <Link href="/leerAhora" className="px-3 hover:text-[var(--colorHover)]">Comunidad</Link>
                                </li>
                        </ul>  
                    </div>
                )}
            </div>
           

        </nav>
        
        

        </header>
    );
};

export default NavBar;



