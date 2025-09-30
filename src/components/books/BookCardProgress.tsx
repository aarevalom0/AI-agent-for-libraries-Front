
import Image from 'next/image';
import Link from 'next/link';

interface BookCardProgressProps {
  title: string;
  autor: string;
  imageUrl: string;
  porcentaje: number;
  href: string;
}


const BookCardProgress = ({ title, autor, imageUrl, porcentaje, href}: BookCardProgressProps) => {
    return(
        <Link href={href} className='grid grid-cols-1 md:grid-cols-4 items-center gap-0 w-full'>
            <div className='mr-auto md:col-span-1 flex items-center'>
                <div className="relative w-[90px] h-[150px]">
                    <Image 
                        src={imageUrl}
                        alt={`Imagen para el libro ${title}`}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
                <div className="w-[150px] text-center text-[1.2rem]" >
                    <h5 title='Titulo del libro' className='font-newsreader'> {title} </h5>
                    <p title='Autor' className='font-newsreader text-[var(--colorSecundario)] text-[0.8rem]'> Autor: {autor} </p>
                </div>
            </div>
            <div className='md:col-span-2'></div>

            <div className="flex items-center gap-2 w-full md:col-span-1 ml-auto">
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div className="bg-[var(--color-principal)] h-4 transition-all duration-500"
                        style={{ width: `${porcentaje}%` }} />
                </div>
                <p className='text-[var(--colorPrincipal)] font-newsreader'>{porcentaje}%</p>
            </div>
        </Link>
    );
}

export default BookCardProgress;