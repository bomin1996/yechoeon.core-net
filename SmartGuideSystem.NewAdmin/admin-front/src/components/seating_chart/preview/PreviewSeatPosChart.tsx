//import "./grid.css";

import MockupScreen from "@/components/ui/MockupScreen";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import { PropsWithChildren, useContext, useState } from "react";
import { renderSeatingComponent } from "../SeatingChart";
import DialogContext from "@/contexts/DialogContext";
import { XIcon } from "lucide-react";
import { ColorButton, NormalColorButton } from "@/components/ui/button";
import {
  SITE_SEATPOST_HOR_PREVIEW_IMAGE,
  SITE_SEATPOST_VER_PREVIEW_IMAGE,
} from "@/const";
import SvgGridBack from "../SvgGridBack";
import SimpleComboBox from "@/components/ui/dropdown/SimpleComboBox";

interface MainProps {
  chart: SeatingChartViewModel;
}
export default function PreviewSeatPosChart({ chart }: MainProps) {
  const dialogCtx = useContext(DialogContext);

  const [modeIndex, setModeIndex] = useState(0);

  const mockWidth = modeIndex === 0 ? 1920 : 1080;
  const mockHeight = modeIndex === 0 ? 1080 : 1920;

  return (
    <div className="left-0 top-0 w-screen h-screen z-30 fixed bg-black/70 p-[20px] flex">
      <div className="relative w-[90%] h-[90%] bg-[#e8e6da] shadow-lg m-auto rounded-[10px] px-4 pt-20 pb-20 ">
        <div className="absolute w-full h-16 left-0 top-0 flex items-center justify-between px-5 border-b border-black/20 space-x-3">
          <span>미리보기</span>
          <SimpleComboBox
            selectedIdx={modeIndex}
            items={["가로(1920x1080)", "세로(1080x1920)"]}
            onSelectedItem={(title, index) => {
              setModeIndex(index);
            }}
          />
          <XIcon
            onClick={() => dialogCtx?.popDialog()}
            className="ml-auto h-10 w-10 p-2 hover:bg-black/5 active:bg-black/20 rounded-md"
          />
        </div>
        <MockupScreen
          className="w-full h-full  pt1"
          mockupWidth={mockWidth}
          mockupHeight={mockHeight}
        >
          <SeatPositionChart
            inputChart={chart}
            mode={modeIndex === 0 ? "horizontal" : "vertical"}
          />
        </MockupScreen>

        <ColorButton
          className="absolute bottom-4 right-4"
          colorStyle="confirm"
          title="닫기"
          onClick={() => dialogCtx?.popDialog()}
        />
      </div>
    </div>
  );
}

interface SeatProps {
  className?: string;
  viewBox?: string;
  inputChart: SeatingChartViewModel;
  mode: string;
}

function SeatPositionChart({ className, inputChart, mode }: SeatProps) {
  //   const kioskCtx = useContext(KioskContext);
  const isHorizontalScreen = true; // useHorizontalScreen();
  const seatPosChart = inputChart;

  if (!seatPosChart) {
    return null;
  }

  const viewBox = `0 0 ${seatPosChart?.width ?? 1920} ${
    seatPosChart?.height ?? 1080
  }`;
  //   const { svgWidth, svgHeight, sizeClassName } = getSvgSizeParams({
  //     isHorizontalScreen: isHorizontalScreen,
  //     seatPosChart: seatPosChart,
  //   });
  const svgWidth = seatPosChart.width;
  const svgHeight = seatPosChart.height;
  //console.log("svg params", svgWidth, svgHeight, sizeClassName);

  className =
    mode === "horizontal"
      ? "pr-mainRightSpacing pb-horizontal-bottombar-height pt-mainTopSpacing"
      : "pb-vertical-bottombar-height pt-vertical-topbar-height";

  return (
    <div
      className={`w-full h-full
          
            ${className}`}
      style={{
        backgroundImage: `url("${
          mode === "horizontal"
            ? SITE_SEATPOST_HOR_PREVIEW_IMAGE
            : SITE_SEATPOST_VER_PREVIEW_IMAGE
        }")`,
      }}
    >
      <RightTitleLayoutSeatChartPos
        className={`w-full h-full  `}
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
          className={` `}
          preserveAspectRatio="xMidYMid meet"
        >
          {seatPosChart.placeItems?.map((node, index) => {
            return renderSeatingComponent(node, index, () => {});
          })}
        </svg>
        <span className="absolute bottom-2 left-2">
          {svgWidth} / {svgHeight} / {viewBox}
        </span>
      </RightTitleLayoutSeatChartPos>
    </div>
  );

  //renderSeatingComponent(item, index, handleSelectItem)
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

interface Props extends PropsWithChildren {
  title: string;
  className?: string;
}
function RightTitleLayoutSeatChartPos({ children, title, className }: Props) {
  return (
    <div
      className={`relative w-full h-full  max-2xl:rounded-[100px] 2xl:rounded-tr-[100px] ${className} `}
    >
      <div className="relative overflow-auto w-full h-full scrollbar">
        {children}
      </div>

      <CurvedRightTitleLabel3
        className="absolute right-[0px] top-[0px] text-white bg-[#FF3F5E] h-[100px] text-[40px] font-[600] w-[528px] "
        title={title}
      />
    </div>
  );
}

interface CurvedRightTitleLabelProps {
  className?: string;
  title?: string;
  // titleColor?: string;
  classNameForTitle?: string;
}
function CurvedRightTitleLabel3({
  className,
  title,
  classNameForTitle,
}: // titleColor = "#131834",
CurvedRightTitleLabelProps) {
  return (
    <div
      className={`${className} rounded-bl-[100px] rounded-tr-[100px] flex shadow-[0_4px_4px_4px_rgba(0,0,0,0.25)] `}
    >
      <span className={`m-auto ${classNameForTitle}`}>{title}</span>
    </div>
  );
}
