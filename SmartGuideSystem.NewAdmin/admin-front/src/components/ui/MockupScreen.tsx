import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  mockupWidth: number;
  mockupHeight: number;
}

export default function MockupScreen({
  className,
  mockupWidth,
  mockupHeight,
  children,
}: Props) {
  return (
    <div className={`${className} `}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${mockupWidth} ${mockupHeight}`}
        //viewBox={viewBox}
        className="h-full object-center shadow-xl"
        preserveAspectRatio="xMidYMid "
      >
        <foreignObject
          // className="rotate-90 origin-center hover:rotate-0 transition"
          x={0}
          y={0}
          width={mockupWidth}
          height={mockupHeight}
        >
          {children}
        </foreignObject>
      </svg>
    </div>
  );
}
