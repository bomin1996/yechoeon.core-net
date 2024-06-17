import React from "react";
import { ISGSCChartTitleNode } from "@shares/*";

interface Props {
  node: ISGSCChartTitleNode;
}

export default function ChartTitleNode({ node }: Props) {
  return (
    <div className="w-full h-full flex ">
      <span
        className="m-auto text-white"
        style={{
          fontSize: `${node.fontSize}px`,
          fontWeight: `${node.fontWeight}`,
        }}
      >
        {node.title}
      </span>
    </div>
  );
}
