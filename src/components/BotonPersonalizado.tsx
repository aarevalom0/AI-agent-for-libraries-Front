import Link from "next/link";

interface BotonProp{
    texto:string;
    href:string;

}

const BotonPersonalizado = ({texto,href}:BotonProp) =>{
    return(
        <Link href={href} title={`Boton ${texto}`} >
            <p className="inline-block px-4 py-2 bg-[var(--color-principal)] text-white rounded-lg hover:bg-[var(--colorSecundario)] transition"> {texto} </p>
            
        </Link>
    );
}

export default BotonPersonalizado;