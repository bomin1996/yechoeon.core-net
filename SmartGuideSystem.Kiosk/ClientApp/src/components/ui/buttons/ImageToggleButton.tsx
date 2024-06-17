import React from "react";

interface Props {
  src: string;
  className?: string;
  onClick: () => void;
  isSelected: boolean;
  selectedColor?: string;
}

export default function ImageToggleButton({
  src,
  className,
  onClick,
  isSelected,
  selectedColor,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`flex ${className} w-16 h-16  ${
        isSelected ? "bg-pink-600" : "bg-black/50"
      }`}>
      <img className="m-auto" src={src} alt="" />
    </div>
  );
}
