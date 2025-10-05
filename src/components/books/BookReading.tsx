import Image from 'next/image';

interface BookReadingProps{
    title:string;
    autor:string;
    imageUrl:string;
    progreso?:number;
}


const BookReading = ({ title, autor, imageUrl, progreso }: BookReadingProps) => {
    return(
        <div className="flex items-center gap-5">
                <Image src={imageUrl} alt={title} className="w-20 h-28 object-cover rounded-md border" width={80} height={112} />
                <div>
                    <h3 className="text-2xl font-newsreader text-[var(--colorMenus)]">{title}</h3>
                    <p className="text-[var(--colorText)]"> {autor}</p>
                    <div className="flex items-center gap-3 mt-1">
                    <div className="h-2 w-36 bg-gray-200 rounded">
                        <div className="h-2 rounded bg-[var(--colorMenus)]" style={{ width: `${progreso ?? 0}%` }} />
                    </div>
                    <span className="text-sm text-[var(--colorText)]">{progreso ?? 0}%</span>
                    </div>
                </div>
        </div>
    );
}

export default BookReading;