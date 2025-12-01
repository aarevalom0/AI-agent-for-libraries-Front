"use client"; 
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl";
import { API_BASE_URL } from "@/services/api.config";
import { getCurrentUser, getSession } from "@/lib/authClient";
import { useRouter } from "next/navigation";



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
    const t = useTranslations("formularios");
    const router = useRouter();

    const schema = z.object({
        titulo: z.string().min(1,{message: t("formulario_sol_libro.errors.titulo")}),
        nombreAutor: z.string().min(1,{message: t("formulario_sol_libro.errors.nombreAutor")}),
        isbn: z.string().min(1,{message: t("formulario_sol_libro.errors.isbn")}),
        editorial: z.string().min(1,{message: t("formulario_sol_libro.errors.editorial")}),
        anioPublicacion: z.string().min(1,{message: t("formulario_sol_libro.errors.anioPublicacion")}),
        numeroPaginas: z.number().min(1,{message: t("formulario_sol_libro.errors.numeroPaginas")}),
        idioma: z.string().min(1,{message: t("formulario_sol_libro.errors.idioma")}),
        genero: z.array(z.object({ genero: z.string().min(1, {message: t("formulario_sol_libro.errors.genero")}) })).min(1, {message: t("formulario_sol_libro.errors.genero")}).nonempty({message: t("formulario_sol_libro.errors.genero")}),
        resumen: z.string().min(10,{message: t("formulario_sol_libro.errors.resumenCorto")}).max(255, {message: t("formulario_sol_libro.errors.resumen")}),
        imagenPortada: z.url({message: t("formulario_sol_libro.errors.imagenPortada")}),
    })

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema), 
        
    })

    const [userId, setUserId] = useState<string>('');
    const [token, setToken] = useState('');

    useEffect(() => {
    const u = getCurrentUser();

    // Si no hay sesión, redirige a login
    if (!u) {
        router.replace("/login");
        return;
    }
    if (u?.id) {
        setUserId(u.id);
    }
    const session = getSession();
    setToken(session?.token?.toString() ?? "");
    }, [router]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "genero", 
    });

    const onSubmit = async (data: Inputs) => {
        try {
            // Enviar los datos al backend
            const response = await fetch(`${API_BASE_URL}/book-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
            });

            if (!response.ok) {
            throw new Error("Error al crear la solicitud de libro");
            }

            const result = await response.json();
            console.log("Solicitud creada:", result);


            alert("Solicitud enviada correctamente");
            reset();
        } catch (error) {
            console.error(error);
            alert("No se pudo enviar la solicitud. Intenta de nuevo.");
        }
    };
    

    return ( 
        <div title='Formulario Sol Libro' className=" p-5 w-[70%]">
            <form onSubmit={handleSubmit(onSubmit)} className=" p-8 w-full mx-auto border border-[var(--colorPrincipal)] rounded">
                <div className="mb-4">
                    <label  className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='titulo'>{t("formulario_sol_libro.form.fields.titulo")}:</label>
                    <input id="titulo" title="Título del libro" type='text' {...register("titulo")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='nombreAutor'>{t("formulario_sol_libro.form.fields.nombreAutor")}:</label>
                    <input  id='nombreAutor' title="Nombre del autor" type='text' {...register("nombreAutor")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.nombreAutor && <p className="text-red-500 text-sm mt-1">{errors.nombreAutor.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='isbn'>{t("formulario_sol_libro.form.fields.isbn")}:</label>
                    <input id='isbn' title="ISBN del libro" type='text' {...register("isbn")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='editorial'>{t("formulario_sol_libro.form.fields.editorial")}:</label>
                    <input id="editorial" title="Editorial del libro" type='text' {...register("editorial")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.editorial && <p className="text-red-500 text-sm mt-1">{errors.editorial.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='anioPublicacion'>{t("formulario_sol_libro.form.fields.anioPublicacion")}:</label>
                    <input id="anioPublicacion" title="Año de publicación del libro" type='date' {...register("anioPublicacion")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.anioPublicacion && <p className="text-red-500 text-sm mt-1">{errors.anioPublicacion.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='numeroPaginas'>{t("formulario_sol_libro.form.fields.numeroPaginas")}:</label>
                    <input id="numeroPaginas" title="Número de páginas del libro" type='number'{...register("numeroPaginas", { valueAsNumber: true })} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.numeroPaginas && <p className="text-red-500 text-sm mt-1">{errors.numeroPaginas.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='idioma'>{t("formulario_sol_libro.form.fields.idioma")}:</label>
                    <input id="idioma" title="Idioma del libro" type='text' {...register("idioma")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.idioma && <p className="text-red-500 text-sm mt-1">{errors.idioma.message}</p>}
                </div>

                {/* Géneros dinámicos */}
                <div className="mb-4 flex flex-col">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2 pb-2'>{t("formulario_sol_libro.form.fields.generos")}: </label>
                    {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 mb-2">
                        <input placeholder={t("formulario_sol_libro.form.placeholders.genero")} className=" p-2 border border-gray-300 rounded" {...register(`genero.${index}.genero` as const)} />
                        <button type="button" className='items-start bg-red-800 w-1/4 hover:bg-red-900 text-white font-bold py-2 px-2 rounded' onClick={() => remove(index)}>{t("formulario_sol_libro.form.buttons.eliminar")}</button>
                    </div>
                    ))}
                    <button type="button" className='items-start bg-[var(--colorPrincipal)] w-1/4 hover:bg-[var(--colorPrincipalHover)] text-white font-bold py-2 px-2 rounded' onClick={() => append({ genero: "" })}>{t("formulario_sol_libro.form.buttons.agregarGenero")}</button>
                    {errors.genero && <p className="text-red-500 text-sm mt-1">{errors.genero.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='resumen'>{t("formulario_sol_libro.form.fields.resumen")}:</label>
                    <textarea id="resumen" title="Resumen del libro" {...register("resumen")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.resumen && <p className="text-red-500 text-sm mt-1">{errors.resumen.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-[var(--colorSecundario)] font-bold mb-2' htmlFor='imagenPortada'>{t("formulario_sol_libro.form.fields.imagenPortada")}:</label>
                    <input id="imagenPortada" title="URL de la imagen de portada del libro" type='url' {...register("imagenPortada")} className='w-full p-2 border border-gray-300 rounded'/>
                    {errors.imagenPortada && <p className="text-red-500 text-sm mt-1">{errors.imagenPortada.message}</p>}
                </div>

                <button type='submit' className='bg-[var(--colorPrincipal)] hover:bg-[var(--colorPrincipalHover)] text-white font-bold py-2 px-4 rounded'>
                    {t("formulario_sol_libro.form.buttons.submit")}
                </button>
            </form>
        </div>
    );
}


export default FormularioSolLibro;


