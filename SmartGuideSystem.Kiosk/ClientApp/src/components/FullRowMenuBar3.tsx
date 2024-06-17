import React, { ReactNode } from "react";

import { MENU_LOGO_IMAGE, MENU_LOGO_IMAGE_2 } from "src/const";
import DateAndTimeDayperiodLabel2 from "./DateAndTimeDayperiodLabel2";
import WeatherAirBar2 from "./WeatherAirBar2";
import WeatherAirBar from "./WeatherAirBar";
interface Props {
  className?: string;
}
export default function FullRowMenuBar3({ className }: Props) {
  return (
    <div
      className={`${className} h-[120px] px-[22px] flex flex-row items-center w-full `}>
      <img className=" h-[74px] px-[75px]" src={MENU_LOGO_IMAGE} />
      <DateAndTimeDayperiodLabel2 className="mr-[0px] flex-shrink-0" />

      <div className="flex-1"></div>
      <WeatherAirBar className="" />
      <img className=" h-[74px] px-[63px]" src={MENU_LOGO_IMAGE_2} />
    </div>
  );
}

interface MenuItemProps {
  className?: string;
  title: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}
function MenuItem({
  className,
  title,
  icon,
  onClick,
  isSelected = false,
}: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className={`${className} mx-1 flex flex-row justify-center items-center hover:opacity-80 active:opacity-90 active:scale-95  px-4 text-[25px] space-x-[12px] `}>
      <img src={icon} className="w-[38px] h-[38px]" width={38} height={38} />
      <span
        className={` ${
          isSelected
            ? "border-b-[1px] py-[2px] border-white font-bold"
            : "font-medium"
        } leading-none`}>
        {title}
      </span>
    </div>
  );
}
