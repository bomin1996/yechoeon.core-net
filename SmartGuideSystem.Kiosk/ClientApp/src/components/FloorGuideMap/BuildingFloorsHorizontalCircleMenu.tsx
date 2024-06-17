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

const BuildingFloorsHorizontalCircleMenu: React.FC<Props> = (props) => {
  const handleClick = (selectedGuideMap: ISGFloor) => {
    if (props.onClickFloor) {
      const index = props.floorList.indexOf(selectedGuideMap);
      props.onClickFloor(selectedGuideMap, index);
    }
  };

  return (
    <div className={`${props.className}  `}>
      {props.floorList.map((f, index) => (
        <CircleMenuButton
          key={f.buttonName}
          title={f.buttonName}
          onClick={() => {
            handleClick(f);
          }}
          isSelected={index === props.selectedIndex}
        />
      ))}
    </div>
  );
};

export default BuildingFloorsHorizontalCircleMenu;

interface CircleMenuButtonProps {
  className?: string;
  title: string;
  onClick: () => void;
  isSelected: boolean;
}
function CircleMenuButton({
  className,
  title,
  isSelected,
  onClick,
}: CircleMenuButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`${className} relative flex shadow-[0px_4px_5px_rgba(0,0,0,0.25)] border-[2px] border-[#3b3b3b] flex-row flex-wrap gap-5 justify-center w-[100px] h-[100px] rounded-full ${
        isSelected ? "bg-button-default " : "bg-[#dddddd]/20 "
      } `}
    >
      <span
        className={`leading-none m-auto   font-[500] text-[33px] ${
          isSelected ? "text-white" : "text-[#3b3b3b]"
        } `}
      >
        {title}
      </span>
    </div>
  );
}
