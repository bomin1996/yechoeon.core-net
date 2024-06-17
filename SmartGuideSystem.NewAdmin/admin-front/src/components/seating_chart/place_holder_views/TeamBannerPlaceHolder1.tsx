import { observer } from "mobx-react";
import React from "react";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { TeamBannerPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/TeamBannerPlaceViewModel";
import TeamBannerFrame from "./TeamBannerFrame";
import ChartNode from "./ChartNode";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface Props {
  item: TeamBannerPlaceViewModel;
  className?: string;
  onSelectItem: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: BaseSeatingPlaceViewModel
  ) => void;
}
export default observer(function TeamBannerPlaceHolder1({
  item,
  className,
  onSelectItem,
}: Props) {
  // const backImageClassName = getBackImageClassName(item.color);

  return (
    <ChartNode
      x={item.posX}
      y={item.posY}
      width={item.width}
      height={item.height}
      isSelected={item.isSelected}
    >
      <TeamBannerFrame
        style={{ width: `${item.width}px`, height: `${item.height}px` }}
        colorStyle={item.color}
        onMouseDown={(ev) => onSelectItem(ev, item)}
        className={`${className} relative flex flex-col border-black hover:bg-purple-600/30 select-none hover:border-dashed hover:border-2 ${
          item.isSelected ? "bg-opacity-50 border-[2px]" : " "
        }`}
      >
        <div
          className={`px-4 w-full h-full flex font-[600] text-white ${
            item.title.length < 10 ? "text-[24px]" : "text-[18px]"
          }`}
        >
          <span className="mr-auto my-auto">{item.title}</span>
          <ChevronRightIcon className="ml-auto my-auto h-8 w-8 fill-white" />
        </div>
        {/* 
        {item.isSelected && (
          <div className="h-full w-full absolute ">
            <span
              className={`absolute  right-0 bottom-0 px-2 py-1 font-light text-[7px] bg-green-800/70 m-[2px]`}
            >
              {item.width}x{item.height}
            </span>
            <span className="absolute left-0 bottom-0 px-2 py-1 font-light text-[7px] border border-black text-black bg-yellow-400 m-[2px]">
              {item.posX}x{item.posY}
            </span>
          </div>
        )} */}
      </TeamBannerFrame>
    </ChartNode>
  );
});

// function getBackImageClassName(color: MemberCardColor) {
//   switch (color) {
//     case "Yellow":
//       return "bg-[url('src/assets/seat_chart/templates/yellow-button-frame.svg')] bg-no-repeat bg-contain";
//     case "Blue":
//       return "bg-[url('src/assets/seat_chart/templates/blue-button-frame.svg')] bg-no-repeat bg-contain";
//     case "Green":
//       return "bg-[url('src/assets/seat_chart/templates/green-button-frame.svg')] bg-no-repeat bg-contain";
//     case "Mint":
//       return "bg-[url('src/assets/seat_chart/templates/mint-button-frame.svg')] bg-no-repeat bg-contain";
//     case "Orange":
//       return "bg-[url('src/assets/seat_chart/templates/orange-button-frame.svg')] bg-no-repeat bg-contain";
//   }
// }
