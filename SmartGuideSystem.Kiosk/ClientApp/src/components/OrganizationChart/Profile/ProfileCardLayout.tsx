import { MemberCardColor, MemberCardSize } from "@shares/*";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  colorStyle?: MemberCardColor;
  sizeStyle?: MemberCardSize;
  onClick?: () => void;
}

export default function ProfileCardLayout({
  className,
  children,
  colorStyle,
  sizeStyle,
  onClick,
}: Props) {
  let cn1 = "bg-red-600";
  let cn2 = "bg-red-400";

  switch (colorStyle) {
    case "Blue":
      cn1 = "bg-[#607FBD]";
      cn2 = "bg-[#C4D5F8]";
      break;
    case "Yellow":
      cn1 = "bg-[#FCB004]";
      cn2 = "bg-[#FFEBC2]";
      break;
    case "Mint":
      cn1 = "bg-[#7FBFC7]";
      cn2 = "bg-[#C3EFF4]";
      break;
    case "Red":
      cn1 = "bg-[#FF3F5E]";
      cn2 = "bg-[#FFDEE4]";
      break;
    case "Orange":
      cn1 = "bg-[#FD865B]";
      cn2 = "bg-[#FFE8DF]";
      break;
    case "Green":
      cn1 = "bg-[#60BD9B]";
      cn2 = "bg-[#C2EFDF]";
      break;
  }

  let roundedCn = "rounded-tr-2xl rounded-b-2xl";
  switch (sizeStyle) {
    case "Large":
      roundedCn = "rounded-tr-2xl rounded-b-2xl";
      break;
    case "Medium":
      roundedCn = "rounded-tr-xl rounded-b-xl";
      break;
    case "Small":
      roundedCn = "rounded-tr-xl rounded-b-xl";
      break;
  }

  return (
    <div
      onClick={onClick}
      className={`${className} overflow-hidden relative ${roundedCn}  bg-white shadow-[5px_3px_0px_rgba(92,98,125,1)]`}>
      <div
        className={`absolute rounded-full w-[40%] h-[76%] left-[0%] top-[48%] translate-y-[-50%] ${cn2}`}
      />
      <div
        className={`absolute rounded-full w-[40%] h-[76%] translate-x-[-40%] left-0 top-[48%] translate-y-[-50%] ${cn1} `}
      />

      {children}
    </div>
  );
}

export function LeaderCardLayout({
  className,
  children,
  colorStyle,
  sizeStyle,
  onClick,
}: Props) {
  let cn1 = "bg-red-600";
  let cn2 = "bg-red-400";

  switch (colorStyle) {
    case "Blue":
      cn1 = "bg-[#607FBD]";
      cn2 = "bg-[#C4D5F8]";
      break;
    case "Yellow":
      cn1 = "bg-[#FCB004]";
      cn2 = "bg-[#FFEBC2]";
      break;
    case "Mint":
      cn1 = "bg-[#7FBFC7]";
      cn2 = "bg-[#C3EFF4]";
      break;
    case "Red":
      cn1 = "bg-[#FF3F5E]";
      cn2 = "bg-[#FFDEE4]";
      break;
    case "Orange":
      cn1 = "bg-[#FD865B]";
      cn2 = "bg-[#FFE8DF]";
      break;
    case "Green":
      cn1 = "bg-[#60BD9B]";
      cn2 = "bg-[#C2EFDF]";
      break;
  }

  let roundedCn = "rounded-tr-2xl rounded-b-2xl";
  switch (sizeStyle) {
    case "Large":
      roundedCn = "rounded-tr-3xl rounded-b-3xl";
      break;
    case "Medium":
      roundedCn = "rounded-tr-2xl rounded-b-2xl";
      break;
    case "Small":
      roundedCn = "rounded-tr-3xl rounded-b-3xl";
      break;
  }

  return (
    <div
      onClick={onClick}
      className={`${className} overflow-hidden relative ${roundedCn}  bg-white shadow-[5px_3px_0px_rgba(92,98,125,1)]`}>
      <div
        className={`absolute rounded-full w-[35%] h-[72%] left-[0%] top-[9%]  ${cn2}`}
      />
      <div
        className={`absolute rounded-full w-[35%] h-[72%] translate-x-[-40%] left-0 top-[9%]  ${cn1} `}
      />

      {children}
    </div>
  );
}

export function DepartLeaderCardLayout({
  className,
  children,
  colorStyle = "Red",
  sizeStyle,
  onClick,
}: Props) {
  let cn1 = "bg-red-600";
  let cn2 = "bg-red-400";

  switch (colorStyle) {
    case "Blue":
      cn1 = "bg-[#607FBD]";
      cn2 = "bg-[#C4D5F8]";
      break;
    case "Yellow":
      cn1 = "bg-[#FCB004]";
      cn2 = "bg-[#FFEBC2]";
      break;
    case "Mint":
      cn1 = "bg-[#7FBFC7]";
      cn2 = "bg-[#C3EFF4]";
      break;
    case "Red":
      cn1 = "bg-[#FF3F5E]";
      cn2 = "bg-[#FFDEE4]";
      break;
    case "Orange":
      cn1 = "bg-[#FD865B]";
      cn2 = "bg-[#FFE8DF]";
      break;
    case "Green":
      cn1 = "bg-[#60BD9B]";
      cn2 = "bg-[#C2EFDF]";
      break;
  }

  return (
    <div
      onClick={onClick}
      className={`${className} overflow-hidden relative rounded-tr-[24px] rounded-b-[24px]  bg-white shadow-[5px_3px_0px_rgba(92,98,125,1)]`}>
      <div
        className={`absolute rounded-full w-[70%] h-[60%] left-[6%] top-[8%]  ${cn2}`}
      />
      <div
        className={`absolute rounded-full w-[70%]  h-[60%] translate-x-[-40%] left-0 top-[8%]  ${cn1} `}
      />

      {children}
    </div>
  );
}
