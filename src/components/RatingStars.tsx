"use client";
import { useState } from "react";

interface RatingStarsProps {
  value?: number;                // valor inicial o promedio (ej: 4.3)
  onChange?: (v: number) => void; 
  readOnly?: boolean;            // true si es solo lectura
}

const RatingStars = ({  value = 0,  onChange,  readOnly = false,}: RatingStarsProps) => {
  const [hover, setHover] = useState(0);  const [val, setVal] = useState(value);

  // en este caso mostramos el valor promedio
  // si no es readOnly, mostramos hover o val
  const displayValue = readOnly ? value : hover || val;

  const handleClick = (i: number) => {
    if (readOnly) return;
    setVal(i);
    onChange?.(i);
  };

  return (
    <div role="radiogroup" aria-label="Valoración" className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = displayValue >= i;
        const half =
          !filled && displayValue >= i - 0.5 && displayValue < i;

        return (
          <button
            key={i}
            type="button"
            onMouseEnter={() => !readOnly && setHover(i)}
            onMouseLeave={() => !readOnly && setHover(0)}
            onClick={() => handleClick(i)}
            aria-checked={val === i}
            role="radio"
            title={`${i} estrella${i > 1 ? "s" : ""}`}
            className={`transition-colors ${
              readOnly ? "cursor-default" : "cursor-pointer"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={
                filled
                  ? "text-[var(--colorMenus)] fill-[var(--colorMenus)]"
                  : half
                  ? "text-[var(--colorMenus)] fill-[var(--colorMenus)]"
                  : "text-gray-400 stroke-gray-400"
              }
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              {half ? (
                <>
                  <defs>
                    <linearGradient id={`half-${i}`}>
                      <stop offset="50%" stopColor="#A04D2C" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.6L19.335 24 12 20.013 4.665 24l1.585-8.65L0.5 9.75l7.832-1.732L12 .587z"
                    fill={`url(#half-${i})`}
                    stroke="#A04D2C"
                  />
                </>
              ) : (
                <path d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.6L19.335 24 12 20.013 4.665 24l1.585-8.65L0.5 9.75l7.832-1.732L12 .587z" />
              )}
            </svg>
          </button>
        );
      })}
    </div>
  );
}


export default RatingStars;