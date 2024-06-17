import React from "react";

interface SegProps {
  title: string;
  icon?: string;
  isSelected: boolean;
  onClick: () => void;
}

const SegmentItem: React.FC<SegProps> = ({
  title,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={` h-[40px] min-w-[130px] rounded-t-[20px] text-white cursor-pointer space-x-1 flex justify-center items-center  font-bold text-sm  ${
        isSelected ? `transition bg-[#231F20]` : "bg-[#9C9C9C]"
      }`}
    >
      <img src={icon} />
      <span>{title}</span>
    </div>
  );
};

export type SegmentItemType = {
  title: string;
  icon?: string;
};

interface Props {
  items: Array<SegmentItemType>;
  selectedIndex: number;
  className?: string;
  onSelected: (index: number) => void;
}

const IconRoundedTabSegmented: React.FC<Props> = ({
  items,
  selectedIndex,
  className,
  onSelected,
}) => {
  return (
    <div
      className={`${className} flex justify-evenly items-end flex-row rounded-full space-x-2`}
    >
      {items.map((item, index) => (
        <SegmentItem
          key={index}
          title={item.title}
          icon={item.icon}
          isSelected={index == selectedIndex}
          onClick={() => onSelected(index)}
        />
      ))}
    </div>
  );
};

export default IconRoundedTabSegmented;
