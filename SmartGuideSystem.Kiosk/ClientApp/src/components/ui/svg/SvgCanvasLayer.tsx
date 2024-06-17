import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  viewWidth: number;
  viewHeight: number;
  className?: string;
}

export default function SvgCanvasLayer({
  children,
  viewWidth,
  viewHeight,
  className,
}: Props) {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      className={`relative overflow-visible ${className}`}
      preserveAspectRatio="none"
    >
      {children}
    </svg>
  );
}
