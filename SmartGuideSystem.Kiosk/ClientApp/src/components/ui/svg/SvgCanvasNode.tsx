import { PropsWithChildren } from "react";
interface Props extends PropsWithChildren {
  x: number;
  y: number;
  width: number;
  height: number;
  className?: string;
}
export default function SvgCanvasNode({
  x,
  y,
  width,
  height,
  className,
  children,
}: Props) {
  return (
    <foreignObject
      className={`${className}`}
      x={x}
      y={y}
      width={width}
      height={height}
    >
      {children}
    </foreignObject>
  );
}
