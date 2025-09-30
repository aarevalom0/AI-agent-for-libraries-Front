"use client";
import React, { forwardRef } from "react";
import clsx from "clsx";

type Props = React.PropsWithChildren<{
  className?: string;
  fontSize: number;
}>;

const ReaderViewport = forwardRef<HTMLDivElement, Props>(
  ({ className, fontSize, children }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "h-[65vh] overflow-y-auto rounded-lg px-4 py-3 border reader-surface",
          className
        )}
        style={{ fontSize }}
      >
        <article className="prose max-w-none whitespace-pre-wrap leading-7">
          {children}
        </article>
      </div>
    );
  }
);
ReaderViewport.displayName = "ReaderViewport";
export default ReaderViewport;
