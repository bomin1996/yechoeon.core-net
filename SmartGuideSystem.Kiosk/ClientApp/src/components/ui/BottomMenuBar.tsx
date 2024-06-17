import React, { FC, useState } from "react";
import PrimaryToggleButton from "./buttons/PrimaryToggleButton";

type SelectMenuHandler = (index: number) => void;

// interface BottomMenuItemProps {
//   title: string;
//   isSelected: boolean;
//   activeColor: string;
//   onClick: () => void;
// }

// const BottomMenuItem: FC<BottomMenuItemProps> = ({
//   title,
//   isSelected,
//   activeColor,
//   onClick,
// }) => {
//   return (
//     <div
//       onClick={onClick}
//       className={`h-[66px] bg-primary-back border-[3px] shadow-[0_5px_5px_0px_rgba(0,0,0,0.5)] border-white cursor-pointer mx-1 rounded-[17px] flex justify-center items-center min-w-[208px] font-bold text-[24px] text-black/90 `}
//     >
//       {title}
//     </div>
//   );
// };

interface Props {
  titles: string[];
  // activeColors: string[];
  activeIndex: number;
  onDidSelect: SelectMenuHandler;
  className?: string;
  buttonClassName?: string;
}

const BottomMenuBar: React.FC<Props> = ({
  titles,
  // activeColors,
  activeIndex,
  onDidSelect,
  buttonClassName,

  className = "",
}) => {
  // const [selectedIndex, setSelectedIndex] = useState<Number>(activeIndex);

  const handleClick = (title: string, index: number) => {
    // setSelectedIndex(index);
    onDidSelect(index);
  };

  return (
    <div
      className={`flex space-x-[10px] items-end  mb-[0px] justify-end  ${className}`}
    >
      {titles.map((title, index) => (
        <PrimaryToggleButton
          className={`h-[66px] min-w-[208px] text-[24px] ${buttonClassName} `}
          key={title}
          onClick={() => handleClick(title, index)}
          title={title}
          isSelected={index === activeIndex}
        />
      ))}
    </div>
  );
};

export default BottomMenuBar;
