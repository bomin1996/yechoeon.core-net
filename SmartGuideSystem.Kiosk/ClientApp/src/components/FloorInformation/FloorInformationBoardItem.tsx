import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import { IFloorInformationItem } from "@shares/IFloorInformation";

interface Props {
  className: string;
  floorInfoItem: IFloorInformationItem;
  onClick: (floorName: string) => void;
}

export default function FloorInformationBoardItem({
  className,
  floorInfoItem,
  onClick,
}: Props) {
  return (
    <div
      className={`flex flex-col text-black ${className}`}
      onClick={() => {
        onClick(floorInfoItem.name);
      }}
    >
      {/* {floorInfoItem.title && (
        <p className="text-[18px] text-[#f44278] font-bold m-auto">
          {floorInfoItem.title}
        </p>
      )} */}
      <div className="flex items-center ">
        <div className="flex w-[43px] bg-[#f2f2f2] h-full ">
          <span className="m-auto text-[16px] font-[900]">
            {floorInfoItem.name}
          </span>
        </div>
        <p className="flex-1 text-center  whitespace-pre-line text-[14px] ">
          {floorInfoItem.contents}
        </p>
        {/* <ChevronRightIcon className="w-[28px] h-[28px] border py-[4px] " /> */}
      </div>
    </div>
  );
}
