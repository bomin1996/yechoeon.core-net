// import { XMarkIcon } from "@heroicons/react/24/solid";
import { CheckIcon, XIcon } from "lucide-react";
import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  title: string;
  menuType: "Save" | "Cancel";
}

const MenuButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function MenuButton(
    { className, title, menuType, ...props }: ButtonProps,
    ref
  ) {
    if (menuType === "Save") {
      return (
        <button
          ref={ref}
          {...props}
          className={`${className} items-center flex justify-center text-[#FFB800] hover:text-[#FFB800]/90 disabled:text-[#FFB800]/50 font-[600]`}
        >
          <CheckIcon className="stroke-[4px]" />
          <span>{title}</span>
        </button>
      );
    } else if (menuType === "Cancel") {
      return (
        <button
          ref={ref}
          {...props}
          className={`${className} items-center justify-center text-[#ACACAC] flex `}
        >
          <XIcon className="stroke-[4px]" />
          <span>{title}</span>
        </button>
      );
    } else {
      return null;
    }
  }
);

export default MenuButton;


