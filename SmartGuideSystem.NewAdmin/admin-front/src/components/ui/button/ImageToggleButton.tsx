import React, { ReactNode } from "react";

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
      className={`flex ${className}  ${
        isSelected ? "bg-[#04bcbe]" : "bg-black/50"
      }`}
    >
      <img className="m-auto" src={src} alt="" />
    </div>
  );
}

interface IconProps {
  //SvgTypeIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  svgIconNode: ReactNode;
  className?: string;
  onClick: () => void;
  isSelected: boolean;
  selectedColor?: string;
  backgroundColor?: string;
}

export function IconToggleButton({
  svgIconNode,
  className,
  onClick,
  isSelected,
  selectedColor = "bg-[#04bcbe]",
  backgroundColor = "bg-black/50",
}: IconProps) {
  return (
    <div
      onClick={onClick}
      className={`flex ${className}  ${
        isSelected ? selectedColor : backgroundColor
      } `}
    >
      {svgIconNode}
    </div>
  );
}
