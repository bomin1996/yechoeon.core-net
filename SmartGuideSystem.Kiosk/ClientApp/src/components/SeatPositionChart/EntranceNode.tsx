import React from "react";
import { ISGSCChartEntranceNode } from "@shares/*";
import icon from "src/assets/icon/seatpos-chart/출입문.svg";
import iconLeft from "src/assets/icon/seatpos-chart/출입문_left.svg";
import iconRight from "src/assets/icon/seatpos-chart/출입문_right.svg";
import iconBottom from "src/assets/icon/seatpos-chart/출입문_bottom.svg";
interface Props {
  node: ISGSCChartEntranceNode;
}

export default function EntranceNode({ node }: Props) {
  console.log("entrance node", node);

  if (node.templateName === "entrance1") {
    return (
      <div className="w-full h-full flex  flex-col justify-center items-center t">
        <img className="mt-auto mx-auto" src={icon} width={45} alt="" />
        <span
          className="m-auto text-white"
          style={{
            fontSize: `${node.fontSize}px`,
            fontWeight: `${node.fontWeight}`,
          }}>
          {node.title}
        </span>
      </div>
    );
  } else if (node.templateName === "entrance2") {
    return (
      <div className="w-full h-full flex  flex-col justify-center items-center t">
        <img className="mt-auto mx-auto" src={iconBottom} width={45} alt="" />
        <span
          className="m-auto text-white"
          style={{
            fontSize: `${node.fontSize}px`,
            fontWeight: `${node.fontWeight}`,
          }}>
          {node.title}
        </span>
      </div>
    );
  } else if (node.templateName === "entrance3") {
    return (
      <div className="w-full h-full flex  flex-col justify-center items-center t">
        <img className="mt-auto mx-auto" src={iconRight} width={45} alt="" />
        <span
          className="m-auto text-white"
          style={{
            fontSize: `${node.fontSize}px`,
            fontWeight: `${node.fontWeight}`,
          }}>
          {node.title}
        </span>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex  flex-col justify-center items-center t">
        <img className="mt-auto mx-auto" src={icon} width={45} alt="" />
        <span
          className="m-auto text-white"
          style={{
            fontSize: `${node.fontSize}px`,
            fontWeight: `${node.fontWeight}`,
          }}>
          {node.title}
        </span>
      </div>
    );
  }
}
