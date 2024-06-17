// import { VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  title: string;
  imageSrc?: string;
  colorType?: "white" | "yellow" | "red";
  buttonType?: "LeftImage" | "TopImage";
  isSelected?: boolean;
  // disabled?: boolean;
}

const ImageMenuButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function ImageMenuButton(
    {
      className,
      title,
      imageSrc,
      colorType = "white",
      buttonType = "LeftImage",
      isSelected,
      // disabled,
      ...props
    }: ButtonProps,
    ref
  ) {
    let cn = "";
    switch (buttonType) {
      case "LeftImage":
        cn =
          "flex flex-row items-center justify-center text-[12px] space-x-[3px] p-2 min-w-[80px]";
        break;
      case "TopImage":
        cn =
          "flex flex-col items-center justify-center text-[12px] space-y-1 p-2 min-w-[60px]";
        break;
    }

    let bgColor = "";
    let bgColorHover = "";
    let bgColorActive = "";
    let ColorText = "";

    switch (colorType) {
      case "white":
        bgColor = "bg-[#19202A]";
        bgColorHover = "enabled:hover:bg-white/20";
        bgColorActive = "active:text-white/80";
        ColorText = "text-white";
        break;
      case "red":
        bgColor = "bg-[#F44178]";
        bgColorHover = "enabled:hover:bg-white/20";
        bgColorActive = "active:text-[#F44178]/80";
        ColorText = "text-[#F44178]";
        break;
      case "yellow":
        bgColor = "bg-[#FFB800]";
        bgColorHover = "enabled:hover:bg-white/20";
        bgColorActive = "active:text-[#FFB800]/80";
        ColorText = "text-[#FFB800]";
        break;
    }

    return (
      <button
        ref={ref}
        {...props}
        className={`${className} ${cn} ${ColorText} ${bgColorActive}
        enabled:hover:bg-black/20
        disabled:opacity-30
        px-3 text-center text-sm  ${isSelected === true ? bgColor : ""}
       
          `}>
        <img src={imageSrc} className="h-[20px]" />
        <span className="whitespace-pre-wrap font-bold ">{title}</span>
      </button>
    );
  }
);

const TopImageMenuButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function TopImageMenuButton(
    {
      className,
      title,
      imageSrc,
      colorType = "white",
      isSelected,
      ...props
    }: ButtonProps,
    ref
  ) {
    // let cn =
    //   "flex flex-col items-center justify-center text-[12px] space-y-1 p-2 min-w-[60px]";

    // let bgColor = "";
    // let bgColorHover = "";
    // let bgColorActive = "";
    // let ColorText = "";

    // switch (colorType) {
    //   case "white":
    //     bgColor = "bg-[#19202A]";
    //     bgColorHover = "enabled:hover:bg-white/20";
    //     bgColorActive = "active:text-white/80";
    //     ColorText = "text-white";
    //     break;
    //   case "red":
    //     bgColor = "bg-[#F44178]";
    //     bgColorHover = "enabled:hover:bg-white/20";
    //     bgColorActive = "active:text-[#F44178]/80";
    //     ColorText = "text-[#F44178]";
    //     break;
    //   case "yellow":
    //     bgColor = "bg-[#FFB800]";
    //     bgColorHover = "enabled:hover:bg-white/20";
    //     bgColorActive = "active:text-[#FFB800]/80";
    //     ColorText = "text-[#FFB800]";
    //     break;
    // }

    return (
      <button
        ref={ref}
        {...props}
        className={`
        flex flex-col justify-center items-center space-y-[8px]  py-1 px-[8px] rounded-[5px]
        ${className}  
        ${isSelected ? "bg-[#19202A]" : ""}
        disabled:opacity-30
        enabled:hover:bg-white/20
        active:text-white/80
        `}>
        <img src={imageSrc} className="w-full h-[20px] object-contain" />
        <span className="whitespace-pre-wrap w-full text-[12px] font-[500] leading-[12px] text-center">
          {title}
        </span>
      </button>
    );
  }
);

export default ImageMenuButton;

export { TopImageMenuButton };
