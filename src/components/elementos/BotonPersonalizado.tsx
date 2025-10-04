import { useTranslations } from "next-intl";
import Link from "next/link";

interface BotonProp{
    texto:string;
    href:string;
    background?:string;
    color?:string;
    hover?:string;

}

const BotonPersonalizado = ({texto,href,background,color,hover}:BotonProp) =>{
    return(
        <Link href={href} title={`Boton ${texto}`} >
            <p className={"inline-block px-4 py-2 " + (background ? background : "bg-[var(--color-principal)]") + " " + (color ? color : "text-white") + " rounded-lg " + (hover ? hover : "hover:bg-[var(--colorSecundario)]") + " transition"}> {texto} </p>
        </Link>
    );
}

export default BotonPersonalizado;