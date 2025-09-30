"use client"; 
import React from "react";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    nameCollection: z.string().min(1,"El nombre de la colección es obligatorio"),
    description: z.string().max(255, "La descripción no puede tener más de 255 caracteres"),
})

type Inputs = {
  nameCollection: string;
  description: string;
};



const FormularioCrearColeccion = () => {

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
        <div title='Formulario Crear Coleccion' className="p-6 bg-white ">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto p-4 border border-gray-300 rounded">
                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='nameCollection'>Nombre:</label>
                    <input type='text' {...register("nameCollection")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.nameCollection && <p className="text-red-500 text-sm mt-1">{errors.nameCollection.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='description'>Descripción:</label>
                    <textarea  placeholder="La descripción es opcional" {...register("description")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <button type='submit' className='bg-[var(--colorPrincipal)] hover:bg-[var(--colorPrincipalHover)] text-white font-bold py-2 px-4 rounded'>
                    Crear Colección
                </button>
            </form>
        </div>
    );
}

export default FormularioCrearColeccion;