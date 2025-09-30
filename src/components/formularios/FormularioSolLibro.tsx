"use client"; 
import React from "react";
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    titulo: z.string().min(1,"El titulo del libro es obligatorio"),
    nombreAutor: z.string().min(1,"El nombre del autor es obligatorio"),
    isbn: z.string().min(1,"El ISBN es obligatorio"),
    editorial: z.string().min(1,"La editorial es obligatoria"),
    anioPublicacion: z.string().min(1,"El año de publicación es obligatorio"),
    numeroPaginas: z.number().min(1,"El número de páginas es obligatorio"),
    idioma: z.string().min(1,"El idioma es obligatorio"),
    genero: z.array(z.object({ genero: z.string().min(1, "El género no puede estar vacío") })).min(1, "El género no puede estar vacío").nonempty("Debe haber al menos un género"),
    resumen: z.string().max(255, "El resumen no puede tener más de 255 caracteres"),
    imagenPortada: z.url("La imagen debe ser una URL válida"),
})

type Inputs = {
  titulo: string;
  nombreAutor: string;
  isbn: string;
  editorial: string;
  anioPublicacion: string;
  numeroPaginas: number;
  idioma: string;
  genero: {genero:string}[];
  resumen: string;
  imagenPortada: string;
};




const FormularioSolLibro = () => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema), 
        
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "genero", 
    });

    const onSubmit = async (data: Inputs) => {
        console.log(data);
        //Hacer conexion con el backend para crear la solicitud del libro
    }

    return ( 
        <div title='Formulario Crear Coleccion' className=" p-5 w-[70%]">
            <form onSubmit={handleSubmit(onSubmit)} className=" p-8 w-full mx-auto border border-[var(--colorPrincipal)] rounded">
                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='titulo'>Título:</label>
                    <input title="Título del libro" type='text' {...register("titulo")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='nombreAutor'>Nombre del Autor:</label>
                    <input title="Nombre del autor" type='text' {...register("nombreAutor")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.nombreAutor && <p className="text-red-500 text-sm mt-1">{errors.nombreAutor.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='isbn'>ISBN:</label>
                    <input title="ISBN del libro" type='text' {...register("isbn")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='editorial'>Editorial:</label>
                    <input title="Editorial del libro" type='text' {...register("editorial")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.editorial && <p className="text-red-500 text-sm mt-1">{errors.editorial.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='anioPublicacion'>Año de Publicación:</label>
                    <input title="Año de publicación del libro" type='date' {...register("anioPublicacion")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.anioPublicacion && <p className="text-red-500 text-sm mt-1">{errors.anioPublicacion.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='numeroPaginas'>Número de Páginas:</label>
                    <input title="Número de páginas del libro" type='number' {...register("numeroPaginas")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.numeroPaginas && <p className="text-red-500 text-sm mt-1">{errors.numeroPaginas.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='idioma'>Idioma:</label>
                    <input title="Idioma del libro" type='text' {...register("idioma")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.idioma && <p className="text-red-500 text-sm mt-1">{errors.idioma.message}</p>}
                </div>

                {/* Géneros dinámicos */}
                <div className="mb-4 flex flex-col">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2 pb-2'>Géneros: </label>
                    {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 mb-2">
                        <input placeholder=" Género" className=" p-2 border border-gray-300 rounded" {...register(`genero.${index}.genero` as const)} />
                        <button type="button" className='items-start bg-red-800 w-1/4 hover:bg-red-900 text-white font-bold py-2 px-2 rounded' onClick={() => remove(index)}>Eliminar</button>
                    </div>
                    ))}
                    <button type="button" className='items-start bg-[var(--colorPrincipal)] w-1/4 hover:bg-[var(--colorPrincipalHover)] text-white font-bold py-2 px-2 rounded' onClick={() => append({ genero: "" })}>Agregar género</button>
                    {errors.genero && <p className="text-red-500 text-sm mt-1">{errors.genero.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='resumen'>Resumen:</label>
                    <textarea title="Resumen del libro" {...register("resumen")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.resumen && <p className="text-red-500 text-sm mt-1">{errors.resumen.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='imagenPortada'>Imagen de Portada:</label>
                    <input title="URL de la imagen de portada del libro" type='url' {...register("imagenPortada")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.imagenPortada && <p className="text-red-500 text-sm mt-1">{errors.imagenPortada.message}</p>}
                </div>

                <button type='submit' className='bg-[var(--colorPrincipal)] hover:bg-[var(--colorPrincipalHover)] text-white font-bold py-2 px-4 rounded'>
                    Crear Solicitud
                </button>
            </form>
        </div>
    );
}

export default FormularioSolLibro;