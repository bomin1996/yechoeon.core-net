import React from "react";

interface Props {
  title: string;
  className?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function CircleToggleButton({
  title,
  className,
  isSelected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`text-[31px] leading-none font-[600] px-[36px] py-[12px] border-[2px] active:scale-95 active:opacity-75 shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${className} 
      rounded-full ${
        isSelected === true
          ? "border-white bg-accent-default  text-white"
          : "border-accent-default bg-white text-accent-text"
      }`}
    >
      {title}
    </button>
  );
}
