import React, { FC, useEffect, useState } from "react";
import CircleTitleButton from "src/components/ui/buttons/CircleTitleButton";
import { ISGFloor } from "@shares/ISGFloor";
import SecondaryToggleButton from "../ui/buttons/SecondaryToggleButton";

interface Props {
  floorList: Array<ISGFloor>;
  selectedIndex: number;
  className?: string;
  onClickFloor?: (floorInfo: ISGFloor, index: number) => void;
}

const BuildingFloorsHorizontalMenu: React.FC<Props> = (props) => {
  const handleClick = (selectedGuideMap: ISGFloor) => {
    if (props.onClickFloor) {
      const index = props.floorList.indexOf(selectedGuideMap);
      props.onClickFloor(selectedGuideMap, index);
    }
  };

  return (
    <div
      className={`${props.className} flex flex-row flex-wrap gap-5 justify-center`}
    >
      {props.floorList.map((f, index) => (
        <div key={f.buttonName} className="pb-5 ">
          <SecondaryToggleButton
            className="h-[56px] w-[185px] text-[24px]"
            key={f.buttonName}
            title={f.buttonName}
            onClick={() => {
              handleClick(f);
            }}
            isSelected={index == props.selectedIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default BuildingFloorsHorizontalMenu;