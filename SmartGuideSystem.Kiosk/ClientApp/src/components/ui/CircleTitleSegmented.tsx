import React from "react";
import CircleToggleButton from "./buttons/CircleToggleButton";

interface Props {
  titles: string[];
  selectedIndex: number;
  className?: string;
  onSelected: (title: string, index: number) => void;
}

const CircleTitleSegmented: React.FC<Props> = (props) => {
  const handleSelected = (title: string) => {
    const idx = props.titles.findIndex((e) => e === title);
    props.onSelected(title, idx);
  };

  return (
    <div
      className={`h-[70px] px-[5px] text-[31px] space-x-[30px]  flex justify-evenly items-center flex-row ${props.className}`}
    >
      {props.titles.map((title, index) => (
        <CircleToggleButton
          key={index}
          title={title}
          isSelected={index == props.selectedIndex}
          onClick={() => {
            handleSelected(title);
          }}
        />
      ))}
    </div>
  );
};

export default CircleTitleSegmented;
