"use client"; 
import React from "react";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl";


type Inputs = {
  nameCollection: string;
  description: string;
};



const FormularioCrearColeccion = () => {
    const t = useTranslations("formularios");
    
    const schema = z.object({
        nameCollection: z.string().min(1,{message: t("formulario_crear_coleccion.nameCollection.errors.required")}),
        description: z.string().max(255, {message: t("formulario_crear_coleccion.description.errors.maxLength")}),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema), 
    })

    const onSubmit = async (data: Inputs) => {
        console.log(data);
        //Hacer conexion con el backend para crear la coleccion
    }

    return ( 
        <div title={t("formulario_crear_coleccion.title")} className="p-6 bg-white ">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto p-4 border border-gray-300 rounded">
                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='nameCollection'>{t("formulario_crear_coleccion.nameCollection.label")}</label>
                    <input id="nameCollection" type='text' {...register("nameCollection")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.nameCollection && <p className="text-red-500 text-sm mt-1">{errors.nameCollection.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='description'>{t("formulario_crear_coleccion.description.label")}</label>
                    <textarea id="description"  placeholder={t("formulario_crear_coleccion.description.placeholder")} {...register("description")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <button type='submit' className='bg-[var(--colorPrincipal)] hover:bg-[var(--colorPrincipalHover)] text-white font-bold py-2 px-4 rounded'>
                    {t("formulario_crear_coleccion.button.submit")}
                </button>
            </form>
        </div>
    );
}

export default FormularioCrearColeccion;