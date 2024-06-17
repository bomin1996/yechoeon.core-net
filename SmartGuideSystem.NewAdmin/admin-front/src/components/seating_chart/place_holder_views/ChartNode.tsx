import { PropsWithChildren } from "react";
interface Props extends PropsWithChildren {
  className?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shaowMargin?: number;
  isSelected?: boolean;
}
export default function ChartNode({
  className,
  x,
  y,
  width,
  height,
  shaowMargin = 5,
  isSelected = false,
  children,
}: Props) {
  return (
    <foreignObject
      x={x}
      y={y}
      // style={{
      //   transform: "rotate(-90deg)",
      //   transformOrigin: "50% 50%",
      // }}
      width={width + shaowMargin} //Shadow
      height={height + shaowMargin} //Shadow
      className={`relative ${isSelected ? "text-purple-600" : ""} ${className}`}
    >
      {/* <div className="relative w-full h-full bg-red-800">
        {children}
        {isSelected && (
          <CheckCircleIcon className="w-5 h-5 absolute top-1 right-1" />
        )}
      </div> */}

      <>
        {children}
        {/* {isSelected && (
          <CheckCircleIcon className="w-5 h-5 absolute top-[0px] right-[0px]" />
        )} */}
        {isSelected && (
          <div className="h-full w-full bg-red-600/30 rounded-lg absolute top-0 left-0 pointer-events-none"></div>
        )}
      </>
    </foreignObject>
  );
}
