import React from "react";
import { MemberCardColor } from "../../../../../../shares/ISGSCNode";

interface Props {
  title: string;
  className?: string;
  onClick: () => void;
  disable?: boolean;
  colorStyle: MemberCardColor;
}
export default function NormalColorButton({
  title,
  onClick,
  disable = false,
  className,
  colorStyle,
}: Props) {
  let color = "";
  switch (colorStyle) {
    case "Blue":
      color = "bg-[#607FBD]";
      break;
    case "Mint":
      color = "bg-[#7FBFC7]";
      break;
    case "Green":
      color = "bg-[#60BD9B]";
      break;
    case "Orange":
      color = "bg-[#FD865B]";
      break;
    case "Red":
      color = "bg-[#FF3F5E]";
      break;
    case "Yellow":
      color = "bg-[#FCB004]";
      break;
  }

  return (
    <button
      onClick={onClick}
      disabled={disable}
      type="button"
      className={`flex flex-shrink-0 flex-grow-0 px-3 py-2 
      disabled:opacity-30 enabled:transform enabled:transition  max-h-[52px] text-sm shadow-sm rounded-[4px] font-medium text-white enabled:hover:opacity-80 enabled:active:scale-95 ${className} px-3 text-white py-2 font-bold text-sm ${color} disabled:opacity-50 enabled:hover:${color}/70 enabled:active:${color}/90 rounded-lg`}
    >
      <span className="m-auto">{title}</span>
    </button>
  );
}
