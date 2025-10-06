// components/reader/ReaderViewport.tsx
"use client";
import React, {forwardRef} from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;      // clases tipográficas / color de texto
  fontSize: number;
  // añadimos estos dos para fondo
  bg: "default" | "cream" | "sepia";
  night: boolean;
};

const ReaderViewport = forwardRef<HTMLDivElement, Props>(function ReaderViewport(
  {children, className, fontSize, bg, night}, ref
) {
  const bgColor = night
    ? "#1c1b1a"
    : bg === "cream"
      ? "#F8F4EA"
      : bg === "sepia"
        ? "#F3E5D0"
        : "var(--elev)";

  return (
    <div
      ref={ref}
      className={clsx(
        "h-[65vh] overflow-y-auto rounded-lg px-4 py-3 border reader-surface",
        className
      )}
      style={{ fontSize, backgroundColor: bgColor }}
    >
      <article className="prose max-w-none whitespace-pre-wrap leading-7">
        {children}
      </article>
    </div>
  );
});

export default ReaderViewport;
