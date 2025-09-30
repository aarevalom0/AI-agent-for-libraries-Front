import React from 'react';
import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <footer className="bg-[var(--colorSecundario)] py-10 ">
            <div className='container mx-auto flex flex-col items-center gap-4' >
                <div className='container mx-auto flex justify-center space-x-4 font-newsreader'>
                    <Link href="/mainPage" className="text-[var(--colorClaro)]"> Home </Link>
                    <Link href="/eventos" className="text-[var(--colorClaro)]"> Eventos </Link>
                    <Link href="/estadisticas" className="text-[var(--colorClaro)]"> Estadísticas </Link>
                    <Link href="/miBiblioteca" className="text-[var(--colorClaro)]"> Mi Biblioteca </Link>
                    <Link href="/leerAhora" className="text-[var(--colorClaro)]"> Leer Ahora </Link>
                    <Link href="/comunidad" className="text-[var(--colorClaro)]"> Comunidad </Link>
                </div>

                <div className='container mx-auto flex justify-center space-x-4' >
                    <FacebookIcon className="text-[var(--colorClaro)] " />
                    <LinkedInIcon className="text-[var(--colorClaro)] " />
                    <InstagramIcon className="text-[var(--colorClaro)] " />
                    <YouTubeIcon className="text-[var(--colorClaro)] " />
                </div>

                <div className='container mx-auto flex justify-center space-x-4 font-newsreader text-[var(--colorClaro)]'>
                    <p className='text-[12px]'> © 2024 Innovatech Solutions. Todos los derechos reservados </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;