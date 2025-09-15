import Image from 'next/image';
import BotonPersonalizado from '@/components/BotonPersonalizado';

interface ComunityCardProp {
    autor:string;
    descripcion: string;
    imageUrl: string;

}

const communityCard = ({ autor, descripcion, imageUrl }: ComunityCardProp) => {
    return(
        <div className='flex py-8'>
            <div className='flex flex-col gap-3'>
                <div title='texto evento' className='font-newsreader pt-5'>
                    {autor && (
                        <p className='text-[15px]'> {autor} </p>
                    )}

                    <p className='text-[var(--colorSecundario)] text-[0.8rem'>{descripcion}</p>
                </div>
                
            </div>

            <div className="relative w-[350px] h-[220px] ml-auto">
                <Image 
                    src={imageUrl}
                    alt={`Imagen para el libro ${autor}`}
                    fill
                    className="object-cover rounded-md"
                />
            </div>

        </div>

        
    );
}

export default communityCard;