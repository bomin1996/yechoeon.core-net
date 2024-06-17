import { observer } from "mobx-react";
import React from "react";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import ChartNode from "./ChartNode";
import icon from "@/assets/seat_chart/templates/출입문_right.svg";
import { EntrancePlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/EntrancePlaceViewModel";

interface Props {
  item: EntrancePlaceViewModel;
  className?: string;
  onSelectItem: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: BaseSeatingPlaceViewModel
  ) => void;
}
export default observer(function EntranceHolder3({
  item,
  className,
  onSelectItem,
}: Props) {
  return (
    <ChartNode
      x={item.posX}
      y={item.posY}
      width={item.width}
      height={item.height}
      isSelected={item.isSelected}
    >
      <div
        onMouseDown={(ev) => onSelectItem(ev, item)}
        className={`${className}  w-full h-full  border-slate-500 bg-slate-700 hover:bg-sky-500/30 select-none hover:border-dashed hover:border-2 flex flex-col justify-center items-center text-white ${
          item.isSelected ? "bg-sky-500 border-2" : " "
        }`}
      >
        <img
          draggable={false}
          className="mt-auto mx-auto"
          src={icon}
          alt=""
          width={45}
        />
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
    </ChartNode>
  );
});
