"use client";
import { ForwardedRef, forwardRef, ReactNode } from "react";
import clsx from "clsx";

function Inner(
  { className, fontSize, children, invertProse=false }:
  { className?: string; fontSize: number; children: ReactNode; invertProse?: boolean },
  ref: ForwardedRef<HTMLDivElement>
){
  return (
    <div
      ref={ref}
      className={clsx("h-[65vh] overflow-y-auto rounded-lg px-4 py-3 border reader-border reader-surface", className)}
      style={{ fontSize }}
    >
      <article className={clsx("prose max-w-none whitespace-pre-wrap leading-7", invertProse && "prose-invert")}>
        {children}
      </article>
    </div>
  );
}
export default forwardRef(Inner);
