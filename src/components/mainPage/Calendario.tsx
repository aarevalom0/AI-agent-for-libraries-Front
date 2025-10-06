"use client";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";

interface CalendarioProp{
    numStreaks: number;
}

const CalendarioRachas = ({numStreaks}: CalendarioProp) => {
    const t = useTranslations("mainPage");  
    const locale = useLocale();
    const days = t.raw('mainPage.calendar.days') as { title: string; abbr: string }[];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const [completed, setCompleted] = useState<number[]>([]); 

    useEffect(() => {
        const today = new Date().getDate(); // día del mes actual
        const streakDays = Array.from({ length: numStreaks }, (_, i) => today - i).filter(d => d > 0);
        setCompleted(streakDays);
    }, [numStreaks]);

    return (
        <div className="p-6  mx-auto">
            <div title="Titulos" className="flex justify-between items-center w-full px-4 pb-4">
                <h2 className="text-xl font-bold !font-newsreader !text-[var(--colorClaro)]">
                    {t("mainPage.calendar.title")}
                </h2>
                 <p className="font-semibold !font-newsreader !text-[var(--colorClaro)]" data-testid="streak-counter">
                    {numStreaks} {t("mainPage.calendar.tiempo")}
                </p>

            </div>
        

        <div>
            <div title='Mes y año' className="flex justify-between items-center text-center mb-4">
                <button><ArrowBackIosIcon className='text-[var(--colorClaro)]'/></button>
                <h2 className="!font-newsreader !text-[var(--colorClaro)]">
                    {today.toLocaleString(locale, { month: "long" })} {year}
                </h2>
                <button><ArrowForwardIosIcon className='text-[var(--colorClaro)]'/></button>
            </div>

            {/* Días de la semana */}
            <div title='Dias de la semana' className="grid grid-cols-7 text-center font-semibold">
                {days.map((day, index) => (
                    <span
                        key={index}
                        title={day.title}
                        className="font-newsreader text-[var(--colorClaro)]"
                    >
                        {day.abbr}
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-7 text-center gap-y-2 mt-2">
                {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const isCompleted = completed.includes(day);
                const isToday = day === today.getDate();

                    return (
                        <div key={day} className="flex justify-center">
                            <div
                                className={`w-10 h-10 flex items-center font-newsreader justify-center rounded-full text-[var(--colorClaro)]
                                ${isToday ? "bg-[var(--colorClaroDetalles)] text-[var(--colorSecundario)]" 
                                    : isCompleted ? "bg-[var(--colorClaroDetallesTransp)] text-[var(--colorSecundario)]" 
                                        : ""} `}>
                                {day}
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
        </div>
    );
}

export default CalendarioRachas;