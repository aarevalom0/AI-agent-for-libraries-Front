import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 


const NavBar = () => {
  return (
    <header className="bg-background text-color-secundario p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          {/* We use Image for our logo */}
          <Image
            src="/logo.png"
            alt="App's logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold">MiApp</span>
        </Link>
        <nav>
          {/* We replaced all <a> tags with <Link> tags */}
          <Link href="/" className="px-3 hover:text-gray-300">Inicio</Link>
          <Link href="/acerca" className="px-3 hover:text-gray-300">Acerca de</Link>
          <Link href="/contacto" className="px-3 hover:text-gray-300">Contacto</Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;