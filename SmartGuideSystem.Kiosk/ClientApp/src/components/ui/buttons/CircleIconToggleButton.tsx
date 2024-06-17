import React from "react";

interface Props {
  selectedImage: string;
  unSelectedImage: string;
  className?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function CircleIconToggleButton({
  selectedImage,
  unSelectedImage,
  className,
  isSelected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`text-[31px] leading-none font-[600]  border-[2px] active:scale-95 active:opacity-75 shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${className} 
      rounded-full border-accent-default  bg-black/50
      }`}>
      {isSelected ? (
        <img className="m-auto" src={selectedImage} />
      ) : (
        <img className="m-auto" src={unSelectedImage} />
      )}
    </button>
  );
}
