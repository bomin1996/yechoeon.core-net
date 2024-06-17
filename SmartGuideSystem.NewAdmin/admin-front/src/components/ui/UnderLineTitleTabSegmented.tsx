import React from "react";

interface SegProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const SegmentItem: React.FC<SegProps> = ({ title, isSelected, onClick }) => {
  return (
    // <div
    //   onClick={onClick}

    //   className={`h-9 text-white  cursor-pointer mx-1 rounded-t-lg flex justify-center items-center min-w-[120px] font-bold text-sm  ${
    //     isSelected ? ` h-10 transition` : " "
    //   }`}
    // >
    //   {title}
    // </div>
    <span
      onClick={onClick}
      className={`px-[8px] border-b-[4px] text-[12px] cursor-pointer  h-[46px] leading-[46px] text-center ${
        isSelected
          ? " font-[600] text-black border-black"
          : " font-[200] text-[#8B8B8B] border-transparent"
      }`}
    >
      {title}
    </span>
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

const UnderLineTitleTabSegmented: React.FC<Props> = ({
  titles,
  selectedIndex,
  className,
  onSelected,
}) => {
  return (
    <div className={`${className} flex justify-evenly items-end flex-row `}>
      {titles.map((title, index) => (
        <SegmentItem
          key={index}
          title={title}
          isSelected={index == selectedIndex}
          onClick={() => onSelected(index)}
        />
      ))}
    </div>
  );
};

export default UnderLineTitleTabSegmented;
