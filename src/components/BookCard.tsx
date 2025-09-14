import Image from 'next/image';
import Link from 'next/link';

interface BookCardProps {
  title: string;
  autor: string;
  imageUrl: string;
  href: string;
}


const BookCard = ({ title, autor, imageUrl, href}: BookCardProps) => {
    return(
        <Link href={href} className='flex mx-auto flex-col items-center gap-1'>
            <div className="relative w-[150px] h-[220px]">
                <Image 
                    src={imageUrl}
                    alt={`Imagen para el libro ${title}`}
                    fill
                    className="object-cover rounded-md"
                />
            </div>
            <div className="w-[150px] text-center" >
                <h5 title='Titulo del libro' className='font-newsreader'> {title} </h5>
                <p title='Autor' className='font-newsreader text-[var(--colorSecundario)] text-[0.8rem]'> {autor} </p>
            </div>

        </Link>
    );
}

export default BookCard;