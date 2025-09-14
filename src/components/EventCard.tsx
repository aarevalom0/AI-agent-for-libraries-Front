import Image from 'next/image';
import BotonPersonalizado from '@/components/BotonPersonalizado';

interface EventCardProp {
    pretitulo?: string;
    title: string;
    descripcion: string;
    imageUrl: string;
    href: string;
}


const EventCard = ({ pretitulo, title, descripcion, imageUrl, href}: EventCardProp) => {
    return(
        <div className='flex py-8'>
            <div className='flex flex-col gap-3'>
                <div title='texto evento' className='font-newsreader pt-5'>
                    {pretitulo && (
                        <p className='text-[15px]'> {pretitulo} </p>
                    )}
                    <h3>{title}</h3>
                    <p className='text-[var(--colorSecundario)] text-[0.8rem'>{descripcion}</p>
                </div>
                <div className='mt-auto pb-5'>
                    <BotonPersonalizado texto='Ver más...' href={href}/>
                </div>
            </div>

            <div className="relative w-[350px] h-[220px] ml-auto">
                <Image 
                    src={imageUrl}
                    alt={`Imagen para el libro ${title}`}
                    fill
                    className="object-cover rounded-md"
                />
             </div>

        </div>

        
    );
}

export default EventCard;