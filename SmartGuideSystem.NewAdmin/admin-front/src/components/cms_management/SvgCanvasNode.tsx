import  { PropsWithChildren } from "react";
interface Props extends PropsWithChildren {
  x: number;
  y: number;
  width: number;
  height: number;
}
export default function SvgCanvasNode({
  x,
  y,
  width,
  height,
  children,
}: Props) {
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      className="overflow-visible"
    >
      {children}
    </foreignObject>
  );
}
