import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
interface Props {
  title: string;
  className?: string;
  onClick: () => void;
}
export default function PinkDetailButton({ title, className, onClick }: Props) {
  return (
    // <button
    //   onClick={onClick}
    //   className={`grid grid-cols-4 items-center text-[16px] active:outline-none active:scale-95 focus:outline-none font-medium w-[100px] h-[36px] bg-accent-pink rounded-[7px] text-white  `}
    // >
    //   <span className=" col-span-3 ">{title}</span>
    //   <ChevronRightIcon className="fill-white stroke-white h-[18px] w-[18px]" />
    // </button>

    <button
      onClick={onClick}
      className={`flex  items-center text-[16px] active:outline-none active:scale-95 focus:outline-none font-medium w-[100px] h-[36px] bg-accent-pink rounded-[7px] text-white  `}>
      <span className=" flex-1">{title}</span>
      <ChevronRightIcon className="fill-white stroke-white h-[18px] w-[18px] mx-1" />
    </button>
  );
}
