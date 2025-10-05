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
        <article className="flex mx-auto flex-col items-center gap-1 group">
            <Link 
                href={href} 
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-transform hover:scale-105"
                aria-label={`Ver detalles del libro "${title}" por ${autor}`}
            >
                <div className="relative w-[150px] h-[220px] rounded-md overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                    <Image 
                        src={imageUrl}
                        alt={`Portada del libro "${title}" por ${autor}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 150px, 150px"
                        priority={false}
                    />
                </div>
                <div className="w-[150px] text-center mt-2" >
                    <h3 className="font-newsreader font-semibold text-[var(--colorPrincipal)] group-hover:text-[var(--colorSecundario)] transition-colors"> 
                        {title} 
                    </h3>
                    <p className="font-newsreader text-[var(--colorSecundario)] text-[0.8rem] mt-1"> 
                        {autor} 
                    </p>
                </div>
            </Link>
        </article>
    );
}

export default BookCard;