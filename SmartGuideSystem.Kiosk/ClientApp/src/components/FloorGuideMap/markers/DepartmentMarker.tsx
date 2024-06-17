import React, { useContext } from "react";
import { ISGFloorItem } from "@shares/ISGFloorItem";
import DialogContext, { IDialogContextData } from "src/contexts/DialogContext";
import SearchOrganizationChart from "src/components/Search/SearchOrganizationChart";

interface Props {
  marker: ISGFloorItem;
  onClick: () => void;
}
export default function DepartmentMarker({ marker, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="absolute  active:bg-black/10 flex cursor-pointer    "
      style={{
        left: `${marker.x}%`,
        top: `${marker.y}%`,
        width: `${marker.width}%`,
        height: `${marker.height}%`,
      }}>
      {/* <span className="animate-ping m-auto inline-flex h-[30px] w-[30px] rounded-full bg-sky-500 opacity-90"></span> */}
      <span
        className={`animate-pulse m-auto px-[18px] py-[6px] border-[1px] border-white text-[14px] font-[600] text-white rounded-full  ${
          marker.action === "ShowOrganizationChart"
            ? "bg-accent-default"
            : "bg-[#5aa947]"
        }`}>
        {/* {marker.action === "ShowOrganizationChart" ? "조직도" : "안내"} */}
        {marker.action === "ShowOrganizationChart" ? marker.title : "안내"}
      </span>
    </div>
  );
}
