import React, { useContext } from "react";
import dummyIcon from "src/assets/icon/weather-menulabel/구름.svg";
import WeatherAirContext from "src/contexts/WeatherAirContext";

import iconCloud from "src/assets/icon/weather-menulabel/구름.svg";
import iconSnow from "src/assets/icon/weather-menulabel/눈.svg";
import iconSnowRain from "src/assets/icon/weather-menulabel/눈비.svg";
import iconRain from "src/assets/icon/weather-menulabel/비.svg";
import iconSunny from "src/assets/icon/weather-menulabel/해.svg";

// //# 특정 요소의 코드값 및 범주
// //-하늘상태(SKY) 코드: 맑음(1), 구름많음(3), 흐림(4)
// //- 강수형태(PTY) 코드: (초단기)없음(0), 비(1), 비 / 눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
// //                      (단기) 없음(0), 비(1), 비 / 눈(2), 눈(3), 소나기(4)
// //- 초단기예보, 단기예보 강수량(RN1, PCP) 범주 및 표시방법(값)

// if (pty != "0")
// {
//     CurrentWeatherAir.weatherCode= pty;
// }
// else
// {
//     CurrentWeatherAir.weatherCode = "1" + sky;
// }

function weatherIconForWeatherCode(weatherCode?: string) {
  const now = new Date();
  const hoursOfDay = now.getHours();

  if (weatherCode) {
    switch (weatherCode) {
      case "1":
        return iconRain;
      case "2":
        return iconSnowRain;
      case "3":
        return iconSnow;
      case "4":
        return iconRain;
      case "5":
        return iconRain;
      case "6":
        return iconSnowRain;
      case "7":
        return iconSnow;
      case "11":
        return iconSunny;
      case "13":
        return iconCloud;
      case "14":
        return iconCloud;
    }
  }
}

interface Props {
  className?: string;
}
export default function WeatherAirBar({ className }: Props) {
  const weatherAirCtx = useContext(WeatherAirContext);
  const icon = weatherIconForWeatherCode(weatherAirCtx?.weatherCode);
  return (
    <div className={`flex items-center text-white ${className} `}>
      <img src={icon} height={40} className="h-[40px]" />
      <span className="ml-[20px] text-[43px] font-normal">
        {weatherAirCtx?.temp ?? ""}
      </span>
      <span className="text-[21px] font-normal mb-[10px]">℃</span>
      <Label
        className="ml-[20px]"
        title="미세먼지"
        status={weatherAirCtx?.miseStatus ?? ""}
      />
      <Label
        className="ml-[24px]"
        title="초미세먼지"
        status={weatherAirCtx?.choMiseStatus ?? ""}
      />
    </div>
  );
}

interface LabelProps {
  title: string;
  status: string;
  className?: string;
}

function Label({ title, status, className }: LabelProps) {
  return (
    <div className={`${className} flex flex-row items-center`}>
      <span className="mr-[20px]">{title}</span>
      {/* <img className="ml-[17px]" src={iconForStatus(status)} alt="" /> */}
      {IconForStatus(status)}
      <span className="ml-[14px]">{status}</span>
    </div>
  );
}

function IconForStatus(status: string) {
  switch (status) {
    case "좋음":
      return (
        <div className="w-[16px] h-[16px] bg-[#1A7CC8] rounded-full  border-[3px] border-white"></div>
      );
    case "보통":
      return (
        <div className="w-[16px] h-[16px] bg-[#37C81A] rounded-full  border-[3px] border-white"></div>
      );
    case "나쁨":
      return (
        <div className="w-[16px] h-[16px] bg-[#E07900] rounded-full  border-[3px] border-white"></div>
      );
    case "아주나쁨":
      return (
        <div className="w-[16px] h-[16px] bg-[#E83810] rounded-full  border-[3px] border-white"></div>
      );
  }

  return (
    <div className="w-[16px] h-[16px] bg-gray-600 rounded-full  border-[3px] border-white"></div>
  );
}
