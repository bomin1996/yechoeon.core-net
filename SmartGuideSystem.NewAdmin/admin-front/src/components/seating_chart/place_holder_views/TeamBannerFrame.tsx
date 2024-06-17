import React, { PropsWithChildren } from "react";
import { MemberCardColor } from "@shares/*";

interface Props extends PropsWithChildren {
  className?: string;
  onMouseDown?: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: object;
  colorStyle?: MemberCardColor;
  visibleArrow?: boolean;
}

export default function TeamBannerFrame({
  className,
  colorStyle,
  onMouseDown,
  children,
  style,
  visibleArrow = true,
}: Props) {
  let cn1 = "bg-[#EAEAEA]";

  switch (colorStyle) {
    case "Blue":
      cn1 = "bg-[#607FBD]";
      break;
    case "Yellow":
      cn1 = "bg-[#FCB004]";
      break;
    case "Mint":
      cn1 = "bg-[#7FBFC7]";
      break;
    case "Red":
      cn1 = "bg-[#FF3F5E]";
      break;
    case "Orange":
      cn1 = "bg-[#FD865B]";
      break;
    case "Green":
      cn1 = "bg-[#60BD9B]";
      break;
  }

  return (
    <div
      style={style}
      onMouseDown={onMouseDown}
      className={`${className} ${cn1} shadow-[2px_2px_0px_rgba(92,98,125,1)] rounded-tr-xl rounded-b-xl`}
    >
      {children}
    </div>
  );
}
