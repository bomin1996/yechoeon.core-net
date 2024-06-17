import { observer } from "mobx-react";
import React from "react";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { ChartTitlePlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/ChartTitlePlaceViewModel";

interface Props {
  item: ChartTitlePlaceViewModel;
  className?: string;
  onSelectItem: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: BaseSeatingPlaceViewModel
  ) => void;
}
export default observer(function ChartTitlePlaceHolder1({
  item,
  className,
  onSelectItem,
}: Props) {
  return (
    <foreignObject
      x={item.posX}
      y={item.posY}
      width={Math.max(100, item.fontSize * item.title.length * 1)}
      height={Math.max(50, item.fontSize * 1.5)}
      pointsAtZ={item.isSelected ? 100 : 0}
      className={`p-[0px] absolute ${item.isSelected ? " z-10" : "z-0"}`}
    >
      <div
        onMouseDown={(ev) => onSelectItem(ev, item)}
        className={`${className}  w-full h-full min-h-[60px] min-w-[100px] border-2 hover:border-dashed border-black flex flex-col select-none text-white/90 ${
          item.isSelected
            ? "bg-purple-600 hover:bg-purple-900 "
            : "bg-green-400/30 hover:bg-sky-500 "
        }`}
      >
        <div className="w-full h-full flex ">
          <span
            className="m-auto"
            style={{
              fontSize: `${item.fontSize}px`,
              fontWeight: `${item.fontWeight}`,
            }}
          >
            {item.title}
          </span>
        </div>

        {/* {item.isSelected && (
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
      </div>
    </foreignObject>
  );
});
