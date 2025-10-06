import FormularioCrearComunidad from "@/components/formularios/FormularioCrearComunidad";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function CrearComunidad(){
    const t = useTranslations("formularios");
    return(

        <div className="flex p-6 justify-center items-start flex-col w-[90%] h-full mx-auto">
            <div className="p-6 bg-white w-full">
                <h1 title={t("formulario_crear_comunidad.title")} className="pb-4 text-3xl font-bold text-[var(--colorPrincipal)]">{t("formulario_crear_comunidad.title")}</h1>
                
            </div>
            <FormularioCrearComunidad />
        </div>
    );





}