import React from "react";

interface Props {
  title: string;
  className?: string;
  isSelected: boolean;
  onClick: () => void;
}
export default function SecondaryToggleButton({
  title,
  className,
  isSelected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      //   className={`${
      //     isSelected
      //       ? "bg-primary-back border-white text-black/90 "
      //       : "bg-black/30 border-[#a6a6a6] text-white/50 "
      //   } h-[66px]  border-[3px] shadow-[0_5px_5px_0px_rgba(0,0,0,0.5)]  cursor-pointer mx-1 rounded-[17px] flex justify-center items-center min-w-[208px] font-bold text-[24px] ${className}`}

      className={` active:outline-none active:scale-95 focus:outline-none ${
        isSelected ? "round_secondary selected" : "round_secondary "
      } ${className}`}
    >
      {title}
    </button>
  );
}
