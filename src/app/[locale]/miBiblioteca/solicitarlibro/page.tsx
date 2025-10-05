import FormularioSolLibro from "@/components/formularios/FormularioSolLibro";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function Solicitarlibro(){

    const t = useTranslations("formularios");
    
    return(
        <div className="flex p-8 justify-center items-start flex-col w-[90%] h-full mx-auto">
            <div className="flex px-8 justify-center items-start flex-col w-full h-full">
                <h1 title="Formulario Solicitar Libro" className="pb-4 text-3xl font-bold text-[var(--colorPrincipal)]">{t("formulario_sol_libro.page.title")}</h1>
                <div title="Navegación" className="text-sm text-[var(--colorSecundario)] mb-4">
                    <Link
                        href={"/miBiblioteca"}
                        className="hover:underline cursor-pointer text-[var(--colorSecundario)]"
                    >
                        {t("formulario_sol_libro.page.breadcrumb.home")}
                    </Link>{" "}
                    / <span>{t("formulario_sol_libro.page.breadcrumb.current")}</span>
                </div>
            </div>
            <div title="Formulario Solicitar Libro" className="flex items-center flex-col w-full h-full">
                <p title="Instrucciones" className="pb-4 text-md text-[var(--colorSecundario)] font-newsreader">{t("formulario_sol_libro.page.instructions")}</p>
                <FormularioSolLibro />
            </div>
        </div>
    );
}