import React, { useState } from "react";

interface Props {
  titles: string[];
  selectedIndex: number;
  className?: string;
  onSelected: (title: string, index: number) => void;
}

interface SegProps {
  title: string;
  isSelected: boolean;
  onClick: (title: string) => void;
}

const SegmentItem: React.FC<SegProps> = (segProps) => {
  return (
    <div
      onClick={() => {
        console.log("Click SegmentItem:", segProps.title);
        segProps.onClick(segProps.title);
      }}
      className={`flex cursor-pointer rounded-full border-[1px] px-[36px] py-[10px] min-w-[154px] ${
        segProps.isSelected
          ? " text-white border-[#33579f] bg-accent-default"
          : " text-balck border-[#8a8a8a] bg-white"
      }`}
    >
      <span className="m-auto">{segProps.title}</span>
    </div>
  );
};

const RoundedButtonSegmented: React.FC<Props> = (props) => {
  const handleSelected = (title: string) => {
    console.log("handleSelected:", title);
    const idx = props.titles.findIndex((e) => e === title);
    props.onSelected(title, idx);
  };

  return (
    <div
      className={`text-[21px] space-x-[16px] ${props.className} flex justify-start items-center flex-row `}
    >
      {props.titles.map((title, index) => (
        <SegmentItem
          key={index}
          title={title}
          isSelected={index == props.selectedIndex}
          onClick={handleSelected}
        />
      ))}
    </div>
  );
};

export default RoundedButtonSegmented;
