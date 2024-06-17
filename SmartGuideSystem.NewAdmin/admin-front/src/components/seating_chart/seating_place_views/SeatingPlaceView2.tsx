import { observer } from "mobx-react";
import React from "react";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";
interface Props {
  item: MemberSeatingPlaceViewModel;
  className?: string;
  onSelectItem: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: BaseSeatingPlaceViewModel
  ) => void;
}
export default observer(function SeatingPlaceView2({
  item,
  className,
  onSelectItem,
}: Props) {
  return (
    <foreignObject
      x={item.posX}
      y={item.posY}
      //transform={`translate(${item.posX}, ${item.posY})`}
      width={item.width}
      height={item.height}
      pointsAtZ={item.isSelected ? 100 : 0}
      className={`p-[0px] absolute ${item.isSelected ? " z-10" : "z-0"}`}
    >
      <div
        onMouseDown={(ev) => onSelectItem(ev, item)}
        className={`${className}  w-full h-full  border-2 hover:border-dashed border-black flex flex-col select-none text-white/90 ${
          item.isSelected
            ? "bg-purple-600 hover:bg-purple-900 "
            : "bg-gray-400 hover:bg-sky-500 "
        }`}
      >
        {/* <span className="m-auto font-bold">{item.title}</span>
        <span className="m-auto font-light">
          {item.posX}x{item.posY}
        </span> */}

        <div className="border-2 border-black/80 absolute left-[10px] top-[10px] w-[60px] h-[60px] "></div>

        <div className="border-1 border-black/80 absolute right-[10px] top-[10px] w-[60px] h-[60px] flex ">
          <span className="m-auto">{item.title}</span>
        </div>

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
        )}
      </div>
    </foreignObject>
  );
});
