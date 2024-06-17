import React from "react";
import WeatherAirBar from "./WeatherAirBar";
import DateAndTimeDayperiodLabel from "./DateAndTimeDayperiodLabel";
interface Props {
  className?: string;
}
export default function VerticalTopMenuBar({ className }: Props) {
  return (
    <div className={`flex flex-row items-center px-[55px] ${className}`}>
      <WeatherAirBar className="" />
      <div className="flex-1"></div>
      <DateAndTimeDayperiodLabel className="mr-[0px] flex-shrink-0" />
    </div>
  );
}
