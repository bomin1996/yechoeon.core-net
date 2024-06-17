import React, { useContext } from "react";
import ChartNode from "./ChartNode";
import ProfileCard from "../OrganizationChart/Profile/ProfileCard";
import { ISGUser } from "../../../../../shares/ISGUser";
import { showMemberModal } from "../OrganizationChart/OrganizationInfoPanel";
import DialogContext from "src/contexts/DialogContext";
import DepartLeaderCard from "../OrganizationChart/Profile/DepartLeaderCard";
import ColorInfoButton from "../ui/buttons/ColorInfoButton";
import KioskContext from "src/contexts/KioskContext";
import {
  ISGSCChartEntranceNode,
  ISGSCChartTitleNode,
  ISGSCLinkNode,
  ISGSCMemberNode,
  ISGSCNode,
  ISGSCTeamBannerNode,
} from "../../../../../shares/ISGSCNode";
import MemberNode from "./MemberNode";
import TeamBannerNode from "./TeamBannerNode";
import ChartTitleNode from "./ChartTitleNode";
import { ISGSeatPosChart } from "../../../../../shares/ISGSeatPosChart";
import EntranceNode from "./EntranceNode";
import {
  RightTitleLayout2NoImage,
  RightTitleLayoutSeatChartPos,
} from "../RightTitleLayout";
import useHorizontalScreen from "src/hooks/useHorizontalScreen";
import LinkPlaceHolder from "./Templates/LinkPlaceHolder";
import { showSeatPosChartModal } from "../Search";
import SvgCanvasNode from "../ui/svg/SvgCanvasNode";

type Props = {
  className?: string;
  classNameForFrame?: string;
  viewBox?: string;
  inputChart?: ISGSeatPosChart;
};

export default function SeatPositionChart({
  className,
  // viewBox = "0 0 1920 1080",
  // viewBox = "0 0 1080 1920",
  classNameForFrame,
  inputChart,
}: Props) {
  const kioskCtx = useContext(KioskContext);
  const snapSize = 10;
  // const dialogCtx = useContext(DialogContext);
  const isHorizontalScreen = useHorizontalScreen();

  const seatPosChart = inputChart ?? kioskCtx?.seatPosChart;
  //console.log("seatPosChart:", JSON.stringify(kioskCtx));

  if (!seatPosChart) {
    return null;
  }

  const viewBox = `0 0 ${seatPosChart?.width ?? 1920} ${
    seatPosChart?.height ?? 1080
  }`;
  const { svgWidth, svgHeight, sizeClassName } = getSvgSizeParams({
    isHorizontalScreen: isHorizontalScreen,
    seatPosChart: seatPosChart,
  });

  //console.log("svg params", svgWidth, svgHeight, sizeClassName);

  return (
    <div
      className={`w-full h-full
        2xl:pr-mainRightSpacing 2xl:pb-horizontal-bottombar-height 2xl:pt-mainTopSpacing
        max-2xl:pb-vertical-bottombar-height max-2xl:pt-vertical-topbar-height
          ${className}`}
    >
      <RightTitleLayoutSeatChartPos
        className={`w-full h-full bg-back-rightTitleLayout/10 ${classNameForFrame}`}
        title={seatPosChart?.name ?? ""}
      >
        <svg
          // width="100%"
          // height="1920px"

          // width="1920px"
          // height="100%"
          width={svgWidth}
          height={svgHeight}
          xmlns="http://www.w3.org/2000/svg"
          // viewBox={`0 0 1920 1080`}
          viewBox={viewBox}
          // className="absolute w-full h-full object-center "
          className={`absolute ${sizeClassName} `}
          preserveAspectRatio="xMidYMid meet"
        >
          {seatPosChart?.nodes?.map((node, index) => {
            return renderNodeContent(node);
          })}
        </svg>
        {/* <span className="absolute bottom-2 left-2">
          {svgWidth} / {svgHeight} / {viewBox}
        </span> */}
      </RightTitleLayoutSeatChartPos>
    </div>
  );

  // return (
  //   <div
  //     className={`w-full h-full
  //       2xl:pr-mainRightSpacing 2xl:pb-horizontal-bottombar-height 2xl:pt-mainTopSpacing
  //       max-2xl:pb-vertical-bottombar-height max-2xl:pt-vertical-topbar-height
  //         ${className}`}
  //   >
  //     <RightTitleLayoutSeatChartPos
  //       className={`w-full h-full bg-back-rightTitleLayout/10 ${classNameForFrame}`}
  //       title={seatPosChart?.name ?? ""}
  //     >
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         viewBox={viewBox}
  //         className={`w-full h-full   bg-purple-400`}
  //         //preserveAspectRatio="xMidYMid meet"
  //         //preserveAspectRatio="XMax meet"
  //         //preserveAspectRatio="xMidYMid "
  //       >
  //         {seatPosChart?.nodes?.map((node, index) => {
  //           return renderNodeContent(node);
  //         })}

  //         <SvgCanvasNode x={0} y={0} width={100} height={100}>
  //           <div className="w-[100px] h-[100px] bg-green-600"></div>
  //         </SvgCanvasNode>
  //       </svg>
  //       <span className="absolute bottom-2 left-2">
  //         {svgWidth} / {svgHeight} / {viewBox}
  //       </span>
  //     </RightTitleLayoutSeatChartPos>
  //   </div>
  // );
}

function renderNodeContent(node: ISGSCNode) {
  let contentNode;

  switch (node.nodeType) {
    case "Member":
      contentNode = <MemberNode memberNode={node as ISGSCMemberNode} />;
      break;
    case "TeamBanner":
      contentNode = <TeamBannerNode node={node as ISGSCTeamBannerNode} />;
      break;
    case "ChartTitle":
      contentNode = <ChartTitleNode node={node as ISGSCChartTitleNode} />;
      break;
    case "Entrance":
      contentNode = <EntranceNode node={node as ISGSCChartEntranceNode} />;
      break;
    case "Link":
      contentNode = (
        <LinkPlaceHolder node={node as ISGSCLinkNode} onSelect={(nd) => {}} />
      );
      break;
  }

  return (
    <ChartNode key={node.id} node={node} className="overflow-visible">
      {contentNode}
    </ChartNode>
  );
}

function getSvgSizeParams({
  isHorizontalScreen,
  seatPosChart,
}: {
  isHorizontalScreen: boolean;
  seatPosChart: ISGSeatPosChart;
}) {
  let isHorizontalSeatPosChart = true;
  if (seatPosChart.width && seatPosChart.height) {
    isHorizontalSeatPosChart = seatPosChart.width > seatPosChart.height;
  }
  if (isHorizontalScreen) {
    if (isHorizontalSeatPosChart) {
      return {
        svgWidth: "100%",
        svgHeight: "100%",
        sizeClassName: "w-full h-full",
      };
    } else {
      return {
        svgWidth: "100%",
        svgHeight: `${seatPosChart.height ?? 1920}px`,
        sizeClassName: "w-full ",
      };
    }
  } else {
    if (isHorizontalSeatPosChart) {
      return {
        svgWidth: `${seatPosChart.width ?? 1920}px`,
        //svgHeight: `${seatPosChart.height ?? 1080}px`,
        svgHeight: "100%",
        sizeClassName: " h-full",
      };
    } else {
      return {
        svgWidth: "100%",
        svgHeight: "100%",
        sizeClassName: "w-full h-full",
      };
    }
  }
}
