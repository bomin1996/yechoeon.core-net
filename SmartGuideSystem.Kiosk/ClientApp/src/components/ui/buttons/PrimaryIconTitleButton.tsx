import React from "react";

interface Props {
  title: string;
  icon: string;
  className?: string;
  onClick: () => void;
}
export default function PrimaryIconTitleButton({
  title,
  icon,
  className,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`active:scale-95 active:opacity-75 text-[14px] disabled:opacity-50 active:outline-none focus:outline-none text-black/90  round_primary selected w-[80px] h-[80px] flex flex-col justify-between items-center ${className}`}
    >
      <img className="h-[40px] p-[5px]" src={icon} alt="" />
      <span>{title}</span>
    </button>
  );
}
