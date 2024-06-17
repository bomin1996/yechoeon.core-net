import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  className?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function CircleIconButton({
  icon,
  className,
  isSelected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full flex w-[70px] h-[70px] border-[2px] active:scale-95 active:opacity-75 shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${className} 
      rounded-full ${
        isSelected === true
          ? "border-white bg-accent-default  text-white"
          : "border-accent-default bg-white text-accent-text"
      }`}
    >
      {icon}
    </button>
  );
}
