import { useTranslations } from "next-intl";
import Link from "next/link";

interface BotonProp{
    texto:string;
    href:string;
    background?:string;
    color?:string;
    hover?:string;
    ariaLabel?: string;
    disabled?: boolean;
}

const BotonPersonalizado = ({texto,href,background,color,hover,ariaLabel,disabled}:BotonProp) =>{
    const classes = "inline-block px-4 py-2 " + 
        (background ? background : "bg-[var(--color-principal)]") + " " + 
        (color ? color : "text-white") + " rounded-lg " + 
        (hover && !disabled ? hover : "hover:bg-[var(--colorSecundario)]") + 
        " transition focus:outline-none focus:ring-2 focus:ring-blue-300 " +
        (disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer");
    
    if (disabled) {
        return (
            <span 
                className={classes}
                aria-label={ariaLabel || texto}
                aria-disabled="true"
            >
                {texto}
            </span>
        );
    }

    return(
        <Link 
            href={href} 
            aria-label={ariaLabel || texto}
            className="focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg"
        >
            <span className={classes}> {texto} </span>
        </Link>
    );
}

export default BotonPersonalizado;