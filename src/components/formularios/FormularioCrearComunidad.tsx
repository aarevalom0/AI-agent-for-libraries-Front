"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

type Inputs = {
  nombre: string;
  descripcion: string;
  imagen: FileList;
};

const FormularioCrearComunidad = () => {
  const t = useTranslations("formularios");
  const [imagePreview, setImagePreview] = useState<string | null>(null);


const schema = z.object({
  nombre: z.string().min(1, { message: t("formulario_crear_comunidad.nameCommunity.errors.required") }),
  descripcion: z
    .string()
    .min(10, { message: t("formulario_crear_comunidad.description.errors.short") })
    .max(255, { message: t("formulario_crear_comunidad.description.errors.maxLength") }),
  imagen: z
    .any()
    .refine((fileList) => fileList && fileList.length > 0, {
      message: t("formulario_crear_comunidad.imagen.errors.required"),
    })
    .refine(
      (fileList) => fileList?.[0]?.type.startsWith("image/"),
      { message: t("formulario_crear_comunidad.imagen.errors.invalid") }
    ),
});


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Inputs) => {

  };

  const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/4 mx-auto p-4 border border-gray-300 rounded"
      >

        <div className="mb-4">
          <label
            className="block text-[var(--colorSecundario)] font-bold mb-2"
            htmlFor="nombre"
          >
            {t("formulario_crear_comunidad.nameCommunity.label")}
          </label>
          <input
            type="text"
            {...register("nombre")}
            placeholder={t("formulario_crear_comunidad.nameCommunity.placeholder")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>


        <div className="mb-4">
          <label
            className="block text-[var(--colorSecundario)] font-bold mb-2"
            htmlFor="descripcion"
          >
            {t("formulario_crear_comunidad.description.label")}
          </label>
          <textarea
            {...register("descripcion")}
            placeholder={t("formulario_crear_comunidad.description.placeholder")}
            className="w-full p-2 border border-gray-300 rounded"

          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">
              {errors.descripcion.message}
            </p>
          )}
        </div>


        <div className="mb-4">
          <label
            className="block text-[var(--colorSecundario)] font-bold mb-2"
            htmlFor="imagen"
          >
            {t("formulario_crear_comunidad.imagen.label")}
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("imagen")}
            onChange={(e) => {
              handleImagePreview(e);
              register("imagen").onChange(e);
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />

          {errors.imagen && (
            <p className="text-red-500 text-sm mt-1">
              {errors.imagen.message as string}
            </p>
          )}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"

            />
          )}
        </div>


        <button
          type="submit"
          className="bg-[var(--colorPrincipal)] hover:bg-[var(--colorPrincipalHover)] text-white font-bold py-2 px-4 rounded"
        >
          {t("formulario_crear_comunidad.button.submit")}
        </button>
      </form>
    </>
  );
};

export default FormularioCrearComunidad;
