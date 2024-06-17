import React from "react";

interface SegProps {
  title: string;
  isSelected: boolean;
  normalTabColor: string;
  selectedTabColor: string;
  onClick: () => void;
}

const SegmentItem: React.FC<SegProps> = ({
  title,
  isSelected,
  normalTabColor,
  selectedTabColor,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? selectedTabColor : normalTabColor,
      }}
      className={`h-9 text-white  cursor-pointer mx-1 rounded-t-lg flex justify-center items-center min-w-[120px] font-bold text-sm  ${
        isSelected ? ` h-10 transition` : " "
      }`}
    >
      {title}
    </div>
  );
};

interface Props {
  titles: string[];
  selectedIndex: number;
  className?: string;
  normalTabColor?: string;
  selectedTabColor?: string;
  onSelected: (index: number) => void;
}

const RoundedTabSegmented: React.FC<Props> = ({
  titles,
  selectedIndex,
  className,
  normalTabColor = "#9c9c9c",
  selectedTabColor = "#f44278",
  onSelected,
}) => {
  return (
    <div
      className={`${className} flex justify-evenly items-end flex-row rounded-full p-0`}
    >
      {titles.map((title, index) => (
        <SegmentItem
          key={index}
          title={title}
          normalTabColor={normalTabColor}
          selectedTabColor={selectedTabColor}
          isSelected={index == selectedIndex}
          onClick={() => onSelected(index)}
        />
      ))}
    </div>
  );
};

export default RoundedTabSegmented;
