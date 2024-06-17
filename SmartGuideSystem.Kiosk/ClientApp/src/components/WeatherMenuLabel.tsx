import React, { useEffect, useState } from "react";

// import dummyIcon from "src/assets/icon/weather-menulabel/맑음@2x.png";
import dummyIcon from "src/assets/icon/weather-menulabel/구름.svg";

interface Props {
  className?: string;
}
export default function WeatherMenuLabel({ className }: Props) {
  return (
    <div className={`flex items-center text-white ${className} `}>
      <img src={dummyIcon} height={40} className="h-[40px]" />
      <span className="ml-[20px] text-[43px] font-normal">20</span>
      <span className="text-[21px] font-normal mb-[10px]">℃</span>
    </div>
  );
}
