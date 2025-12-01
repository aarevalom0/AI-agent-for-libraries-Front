"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { List, Check, Star } from "lucide-react";
import { createCollection } from "@/services/collectionService";
import { getCurrentUser } from "@/lib/authClient";

// Form inputs definition
type Inputs = {
    nameCollection: string;
    description: string;
    icon?: "list" | "check" | "star";
};

const FormularioCrearColeccion = ({ userId, onCollectionCreated }: { userId: string, onCollectionCreated: () => void }) => {
    const t = useTranslations("formularios");
    const router = useRouter();
    const [selectedIcon, setSelectedIcon] = useState<"list" | "check" | "star">("list");

    const [successMessage, setSuccessMessage] = useState<string>("");


    const schema = z.object({
        nameCollection: z.string().min(1, { message: t("formulario_crear_coleccion.nameCollection.errors.required") }),
        description: z.string().max(255, { message: t("formulario_crear_coleccion.description.errors.maxLength") }),
        icon: z.enum(["list", "check", "star"]).optional(),
    });

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
        defaultValues: { icon: "list" },
    });

    const onSubmit = async (data: Inputs) => {
        try {
            // Backend determines user from auth; passing empty string for userId placeholder
            await createCollection(userId, data.nameCollection, data.description, data.icon);
            onCollectionCreated(); // Refresh page to load new collection
            setSuccessMessage("Colección creada exitosamente!");

            // Reiniciar formulario y seleccionar icono por defecto
            reset({ nameCollection: "", description: "", icon: "list" });
            setSelectedIcon("list");

            // Opcional: ocultar mensaje después de 3 segundos
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (e) {
            console.error("Error creating collection", e);
        }
    };

    return (
        <div title={t("formulario_crear_coleccion.title")} className="p-6 bg-white">
            {successMessage && (
                <p className="bg-green-700 text-white text-center text-sm mb-4 py-2 px-4 rounded-md mx-auto w-max">
                    {successMessage}
                </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto p-4 border border-gray-300 rounded">
                <div className="mb-4">
                    <label className="block text-[var(--colorSecundario)] font-bold mb-2" htmlFor="nameCollection">
                        {t("formulario_crear_coleccion.nameCollection.label")}
                    </label>
                    <input
                        id="nameCollection"
                        type="text"
                        {...register("nameCollection")}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.nameCollection && (
                        <p className="text-red-500 text-sm mt-1">{errors.nameCollection.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-[var(--colorSecundario)] font-bold mb-2" htmlFor="description">
                        {t("formulario_crear_coleccion.description.label")}
                    </label>
                    <textarea
                        id="description"
                        placeholder={t("formulario_crear_coleccion.description.placeholder")}
                        {...register("description")}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                {/* Icon selector */}
                <div className="mb-4 flex items-center space-x-4">
                    <span className="text-[var(--colorSecundario)] font-bold">
                        {t("formulario_crear_coleccion.icon.label")}
                    </span>
                    <button
                        type="button"
                        onClick={() => setValue("icon", "list")}
                        className={`p-2 ${watch("icon") === "list" ? "bg-gray-200" : ""}`}
                    >
                        <List size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setValue("icon", "check")}
                        className={`p-2 ${watch("icon") === "check" ? "bg-gray-200" : ""}`}
                    >
                        <Check size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setValue("icon", "star")}
                        className={`p-2 ${watch("icon") === "star" ? "bg-gray-200" : ""}`}
                    >
                        <Star size={20} />
                    </button>
                    <input type="hidden" {...register("icon")} />
                </div>

                <button
                    type="submit"
                    className="bg-[var(--colorPrincipal)] hover:bg-[var(--colorPrincipalHover)] text-white font-bold py-2 px-4 rounded"
                >
                    {t("formulario_crear_coleccion.button.submit")}
                </button>
            </form>
        </div>
    );
};

export default FormularioCrearColeccion;