import React from "react";

interface Props {
  title: string;
  className?: string;
  onClick: () => void;
  disable?: boolean;
  colorStyle:
    | "normal"
    | "confirm"
    | "cancel"
    | "save"
    | "open"
    | "delete"
    | "modify"
    | "add";
}
export default function ColorButton({
  title,
  onClick,
  colorStyle = "normal",
  disable = false,
  className,
}: Props) {
  let color = "";
  switch (colorStyle) {
    case "normal":
      color = "bg-[#9c9c9c]";
      break;
    case "cancel":
      color = "bg-[#f44278]";
      break;
    case "confirm":
      color = "bg-[#464344]";
      break;
    case "save":
      color = "bg-[#00b4bf]";
      break;
    case "open":
      color = "bg-[#00b4bf]";
      break;
    case "delete":
      color = "bg-[#f44278]";
      break;
    case "modify":
      color = "bg-[#7831c1]";
      break;
    case "add":
      color = "bg-[#00b4bf]";
      break;
  }

  return (
    <button
      onClick={onClick}
      disabled={disable}
      type="button"
      className={`flex flex-shrink-0 flex-grow-0 px-3 py-2 disabled:opacity-30 enabled:transform enabled:transition  ${color} max-h-[52px] text-sm shadow-sm rounded-[4px] font-medium text-white enabled:hover:opacity-80 enabled:active:scale-95 ${className}`}
    >
      <span className="m-auto">{title}</span>
    </button>
  );
}

export function SmallColorButton({
  title,
  onClick,
  colorStyle = "normal",
  disable = false,
  className,
}: Props) {
  let color = "";
  switch (colorStyle) {
    case "normal":
      color = "bg-[#9c9c9c]";
      break;
    case "cancel":
      color = "bg-[#f44278]";
      break;
    case "confirm":
      color = "bg-[#464344]";
      break;
    case "save":
      color = "bg-[#00b4bf]";
      break;
    case "open":
      color = "bg-[#00b4bf]";
      break;
    case "delete":
      color = "bg-[#f44278]";
      break;
    case "modify":
      color = "bg-[#7831c1]";
      break;
    case "add":
      color = "bg-[#00b4bf]";
      break;
  }

  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`flex flex-shrink-0 flex-grow-0 disabled:opacity-30 enabled:transform enabled:transition  ${color}  shadow-sm  text-white enabled:hover:opacity-80 enabled:active:scale-95 ${className}`}
    >
      <span className="m-auto">{title}</span>
    </button>
  );
}
