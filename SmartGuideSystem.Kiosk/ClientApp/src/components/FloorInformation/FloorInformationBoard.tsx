import { IFloorInformationItem } from "@shares/*";
import React from "react";
import FloorInformationBoardItem from "./FloorInformationBoardItem";

interface Props {
  className: string;
  floorInfoItems: IFloorInformationItem[];
  onClick: (floorName: string) => void;
}

export default function FloorInformationBoard({
  className,
  floorInfoItems,
  onClick,
}: Props) {
  return (
    <div
      className={`grid grid-col-2 items-baseline gap-x-2 divide-y-[2px] bg-blue-200 ${className}`}
    >
      {floorInfoItems.map((finfo, index) => (
        <FloorInformationBoardItem
          key={index}
          className={`${finfo.fullRow ? "col-span-2" : "col-span-1"}`}
          floorInfoItem={finfo}
          onClick={() => onClick(finfo.name)}
        />
      ))}
    </div>
  );
}

export function FloorInformationBoard2({
  className,
  floorInfoItems,
  onClick,
}: Props) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="flex flex-row border-b-2 gap-4 py-2">
        <FloorInformationBoardItem
          className="flex-1 "
          floorInfoItem={floorInfoItems[1]}
          onClick={() => onClick(floorInfoItems[1].name)}
        />
        <FloorInformationBoardItem
          className="flex-1"
          floorInfoItem={floorInfoItems[0]}
          onClick={() => onClick(floorInfoItems[0].name)}
        />
      </div>
      <div className="flex flex-row  border-b-2 gap-4">
        <FloorInformationBoardItem
          className="flex-1"
          floorInfoItem={floorInfoItems[3]}
          onClick={() => onClick(floorInfoItems[3].name)}
        />
        <FloorInformationBoardItem
          className="flex-1"
          floorInfoItem={floorInfoItems[2]}
          onClick={() => onClick(floorInfoItems[2].name)}
        />
      </div>
      <div className="flex flex-row  border-b-2 gap-4">
        <FloorInformationBoardItem
          className="flex-1"
          floorInfoItem={floorInfoItems[5]}
          onClick={() => onClick(floorInfoItems[5].name)}
        />
        <FloorInformationBoardItem
          className="flex-1"
          floorInfoItem={floorInfoItems[4]}
          onClick={() => onClick(floorInfoItems[4].name)}
        />
      </div>
      <div className="flex flex-row  border-b-2 gap-4">
        <FloorInformationBoardItem
          className="flex-1"
          floorInfoItem={floorInfoItems[7]}
          onClick={() => onClick(floorInfoItems[7].name)}
        />
        <FloorInformationBoardItem
          className="flex-1"
          floorInfoItem={floorInfoItems[6]}
          onClick={() => onClick(floorInfoItems[6].name)}
        />
      </div>
      <FloorInformationBoardItem
        className=" border-b-2"
        floorInfoItem={floorInfoItems[8]}
        onClick={() => onClick(floorInfoItems[8].name)}
      />
      <FloorInformationBoardItem
        className=" border-b-2"
        floorInfoItem={floorInfoItems[9]}
        onClick={() => onClick(floorInfoItems[9].name)}
      />
      <FloorInformationBoardItem
        className=""
        floorInfoItem={floorInfoItems[10]}
        onClick={() => onClick(floorInfoItems[10].name)}
      />
    </div>
  );
}
