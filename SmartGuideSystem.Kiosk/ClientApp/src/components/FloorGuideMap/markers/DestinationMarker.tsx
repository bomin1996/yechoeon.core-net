import { ISGFloorItem } from "@shares/*";
import React from "react";
import icon from "src/assets/icon/get-direction/길찾기위치.svg";

interface Props {
  marker: ISGFloorItem;
  title: string;
}
export default function DestinationMarker({ marker, title }: Props) {
  return (
    <div
      className="absolute  translate-x-[0%] translate-y-[0%] w-[50px] h-[50px] cursor-pointer"
      style={{
        left: `${marker.x}%`,
        top: `${marker.y}%`,
      }}
    >
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-800 opacity-90"></span>
      <div className="bg-red-600 h-[10px] w-[10px] rounded-full absolute left-[50%] top-[50%]  translate-x-[-50%] translate-y-[-50%]"></div>

      <img src={icon} width={80} className="w-[80px]" />
      <span className="absolute bottom-[-60%] w-[150%] left-[-20%] text-center font-bold bg-black/40 text-white rounded-md ">
        {title}
      </span>
    </div>
    // <div
    //   className="absolute flex items-center bg-[#ef4122] text-[14px] py-[4px] px-[14px] font-bold rounded-[6px] shadow text-white translate-x-[-50%] translate-y-[-50%] cursor-pointer"
    //   style={{
    //     left: `${marker.x}%`,
    //     top: `${marker.y}%`,
    //   }}
    // >
    //   <span className="m-auto">현위치</span>
    // </div>
  );
}
