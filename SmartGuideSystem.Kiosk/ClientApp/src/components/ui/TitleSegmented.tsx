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
      className={`flex  justify-center items-center h-[56px] min-w-[162px]  cursor-pointer   ${
        segProps.isSelected
          ? " font-bold border-b-[11px] border-accent-popupTitle text-accent-popupTitle"
          : " text-[#cacaca] border-b-[5px] border-[#cacaca] font-normal"
      }`}>
      <span className="m-auto">{segProps.title}</span>
    </div>
  );
};

const TitleSegmented: React.FC<Props> = (props) => {
  // const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex);

  const handleSelected = (title: string) => {
    console.log("handleSelected:", title);
    const idx = props.titles.findIndex((e) => e === title);
    //setSelectedIndex(idx);
    props.onSelected(title, idx);
  };

  return (
    <div
      className={`h-[70px] px-[5px] text-[32px] space-x-[42px] ${props.className} flex justify-evenly items-center flex-row `}>
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

export default TitleSegmented;
