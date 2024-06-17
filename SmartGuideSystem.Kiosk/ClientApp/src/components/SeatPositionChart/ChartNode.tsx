import React, { PropsWithChildren } from "react";
import { ISGSCNode } from "@shares/*";

interface Props extends PropsWithChildren {
  className?: string;
  node: ISGSCNode;
}
export default function ChartNode({ children, node, className }: Props) {
  return (
    <foreignObject
      x={node.x}
      y={node.y}
      width={node.w}
      height={node.h}
      className={`${className}`}
    >
      {children}
    </foreignObject>
  );
}
