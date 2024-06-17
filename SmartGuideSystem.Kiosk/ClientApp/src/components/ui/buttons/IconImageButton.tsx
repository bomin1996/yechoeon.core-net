import React from "react";

type IconImageButtonType = "Rounded" | "Circle" | "Rectangle";

interface Props {
  src: string;
  onClick: () => void;
  buttonType?: IconImageButtonType;
  className?: string;
}

export default function IconImageButton({
  src,
  onClick,
  buttonType = "Rectangle",
  className = "p-3 ",
}: Props) {
  let buttonClassCss = "";
  switch (buttonType) {
    case "Circle":
      buttonClassCss = "rounded-full";
      break;
    case "Rectangle":
      buttonClassCss = "";
      break;
    case "Rounded":
      buttonClassCss = "rounded-lg";
      break;
  }

  return (
    <button
      className={`${className} ${buttonClassCss}  active:bg-black/80`}
      onClick={onClick}
    >
      <img src={src} alt="" />
    </button>
  );
}
