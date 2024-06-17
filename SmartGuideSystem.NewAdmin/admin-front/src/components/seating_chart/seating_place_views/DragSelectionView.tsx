import { observer } from "mobx-react";
import React from "react";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
interface Props {
  item: BaseSeatingPlaceViewModel;
  className?: string;
  onSelectItem: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: BaseSeatingPlaceViewModel
  ) => void;
}
export default observer(function DragSelectionView({
  item,
  className,
  onSelectItem,
}: Props) {
  return (
    <foreignObject
      x={item.posX}
      y={item.posY}
      width={item.width}
      height={item.height}
      className={`p-[0px] absolute ${item.isSelected ? " z-10" : "z-0"}`}
    >
      <div
        onMouseDown={(ev) => onSelectItem(ev, item)}
        className={`${className} relative h-full w-full bg-green-600/30 border-[1px]`}
      >
        <span className="absolute right-0 bottom-0 px-2 py-1 font-light text-[7px] bg-green-800/70 m-[2px]">
          {Math.round(item.width)}x{Math.round(item.height)}
        </span>
        <span className="absolute left-0 top-0 px-2 py-1 font-light text-[7px] border border-black text-black bg-yellow-400 m-[2px]">
          {Math.round(item.posX)}x{Math.round(item.posY)}
        </span>
      </div>
    </foreignObject>
  );
});
