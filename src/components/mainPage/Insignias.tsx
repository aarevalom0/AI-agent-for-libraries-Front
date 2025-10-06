import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';

interface InsigniaProp{
    nombre:string;
    imageUrl?:string;
}

const Insignia = ({nombre, imageUrl, ...props}:InsigniaProp) => {

    return (
        <div title={`${nombre}`} {...props} className="relative w-40 h-40 flex items-center justify-center rounded-full overflow-hidden bg-[var(--colorClaroTrans)]">
            {imageUrl? (
                <Image
                    src={imageUrl}
                    alt={`Imagen para el libro ${nombre}`}
                    fill
                    className="object-cover rounded-md"
                />
            ):(
                <span title="Espacio para insignias" className="text-2xl font-bold">
                    <CloseIcon className='text-[var(--colorMenusTrans)] transform rotate-45 scale-500'
                    />
                </span>
            )}
        </div>
    );

}

export default Insignia;