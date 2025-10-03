import FormularioSolLibro from "@/components/formularios/FormularioSolLibro";
import Link from "next/link";
import React from "react";

export default function solicitarlibro(){
    return(
        <div className="flex p-8 justify-center items-start flex-col w-[90%] h-full mx-auto">
            <div className="flex px-8 justify-center items-start flex-col w-full h-full">
                <h1 title="Formulario Solicitar Libro" className="pb-4 text-3xl font-bold text-[var(--colorPrincipal)]">Solicitar libro</h1>
                <div title="Navegación" className="text-sm text-[var(--colorSecundario)] mb-4">
                    <Link
                        href={"/miBiblioteca"}
                        className="hover:underline cursor-pointer text-[var(--colorSecundario)]"
                    >
                        Mi Biblioteca
                    </Link>{" "}
                    / <span>Solicitar Libro</span>
                </div>
            </div>
            <div title="Formulario Solicitar Libro" className="flex items-center flex-col w-full h-full">
                <p title="Instrucciones" className="pb-4 text-md text-[var(--colorSecundario)] font-newsreader">Por favor, complete el siguiente formulario para solicitar un libro.</p>
                <FormularioSolLibro />
            </div>
        </div>
    );
}