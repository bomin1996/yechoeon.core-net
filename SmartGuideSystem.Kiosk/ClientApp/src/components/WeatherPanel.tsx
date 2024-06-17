import React, { useContext, useEffect, useState } from "react";

import dummyIcon from "src/assets/weather/icon-weather-sky-1.svg";
import { KioskApi } from "src/server/kioskApi";
import { IWeatherInfo } from "@shares/IWeatherInfo";

import weather_0 from "src/assets/weather/icon-weather-0.svg";
import weather_1 from "src/assets/weather/icon-weather-1.svg";
import weather_2 from "src/assets/weather/icon-weather-2.svg";
import weather_3 from "src/assets/weather/icon-weather-3.svg";
import weather_5 from "src/assets/weather/icon-weather-5.svg";
import weather_6 from "src/assets/weather/icon-weather-6.svg";
import weather_7 from "src/assets/weather/icon-weather-7.svg";
import weather_11 from "src/assets/weather/icon-weather-sky-1.svg";
import weather_13 from "src/assets/weather/icon-weather-13.svg";
import weather_14 from "src/assets/weather/icon-weather-14.svg";
import weather_111 from "src/assets/weather/icon-weather-111.svg";
import weather_113 from "src/assets/weather/icon-weather-113.svg";

import { useIdleCheckerFireEvent } from "src/hooks/useIdleChecker";
import WeatherAirContext from "src/contexts/WeatherAirContext";

function weatherIconForWeatherCode(weatherCode?: string) {
  const now = new Date();
  const hoursOfDay = now.getHours();

  if (weatherCode) {
    switch (weatherCode) {
      case "1":
        return weather_1;
      case "2":
        return weather_2;
      case "3":
        return weather_3;
      case "5":
        return weather_5;
      case "6":
        return weather_6;
      case "7":
        return weather_7;
      case "11":
        return 7 < hoursOfDay && hoursOfDay < 18 ? weather_11 : weather_111;
      case "13":
        return 7 < hoursOfDay && hoursOfDay < 18 ? weather_13 : weather_113;
      case "14":
        return weather_14;
    }
  }
}

interface Props {
  className?: string;
}

export default function WeatherPanel({ className }: Props) {
  // const [weatherInfo, setWeatherInfo] = useState<IWeatherInfo>();
  // const [lastUpdateTime, setLastUpdateTime] = useState<string>();
  // const requestData = async () => {
  //   try {
  //     const res = await KioskApi.requestWeatherAndAir();
  //     if (res.status === 200) {
  //       setWeatherInfo(res.data as IWeatherInfo);
  //       const lt = new Date().toLocaleTimeString();
  //       setLastUpdateTime(lt);
  //     }
  //   } catch (exc) {}
  // };

  // useIdleCheckerFireEvent(60 * 1000, () => {
  //   requestData();
  // });

  // useEffect(() => {
  //   requestData();
  // }, []);

  const weatherInfo = useContext(WeatherAirContext);

  return (
    <div
      className={` flex flex-col items-center ${className} pl-[12px] pr-[10px] `}
    >
      <div className="flex-1 flex items-center w-full border-b-[2px] border-black text-black font-[500] ">
        <img
          width={81}
          height={81}
          className="w-[81px] h-[81px] mx-[6px] [my-12px]"
          src={weatherIconForWeatherCode(weatherInfo?.weatherCode)}
          alt=""
        />
        <div className="flex-1 mt-1 text-right">
          <p className="text-[14px]">{weatherInfo?.location}</p>
          <p className="text-[20px]">{weatherInfo?.time}</p>
          <p className="text-[42px] mr-2">{weatherInfo?.temp}℃</p>
        </div>
      </div>
      <AirLabel
        className="w-full  border-b-[2px] border-[#dfdfdf] "
        title="초미세먼지"
        value={weatherInfo?.choMise}
        status={weatherInfo?.choMiseStatus}
      />
      <AirLabel
        className="w-full  border-b-[2px] border-[#dfdfdf] "
        title="미세먼지"
        value={weatherInfo?.mise}
        status={weatherInfo?.miseStatus}
      />
      <AirLabel
        className="w-full "
        title="오존"
        value={weatherInfo?.ozon}
        status={weatherInfo?.ozonStatus}
      />
    </div>
  );
}

function AirLabel({
  title,
  value,
  status,
  className,
}: {
  title: string;
  value: string | undefined;
  status: string | undefined;
  className?: string;
}) {
  let statusBackgroundColor = "bg-gray-600";
  if (status === "좋음") {
    statusBackgroundColor = "bg-[#0171c5]";
  } else if (status === "보통") {
    statusBackgroundColor = "bg-[#4ba634]";
  } else if (status === "나쁨") {
    statusBackgroundColor = "bg-[#c6614a]";
  } else if (status === "매우나쁨") {
    statusBackgroundColor = "bg-[#e8340c]";
  }
  return (
    <div
      className={`text-black h-[50px] flex-shrink-0 flex-grow-0 font-[500] text-[18px] flex items-center ${className}`}
    >
      <span className="leading-[30px]">{title}</span>
      <span className="flex-1 text-right leading-[30px] mr-[20px]">
        {value}
      </span>
      <span
        className={` rounded-full font-[700] text-[12px] text-white w-[58px] py-[8px] text-center ${statusBackgroundColor}`}
      >
        {status}
      </span>
    </div>
  );
}

interface Props2 {
  className?: string;
  weatherInfo?: IWeatherInfo;
}

export function WeatherPanel2({ className, weatherInfo }: Props2) {
  return (
    <div
      className={` flex flex-col items-center ${className} pl-[12px] pr-[10px] `}
    >
      <div className="flex-1 flex items-center w-full border-b-[2px] border-black text-black font-[500] ">
        <img
          width={81}
          height={81}
          className="w-[81px] h-[81px] mx-[6px] [my-12px]"
          src={weatherIconForWeatherCode(weatherInfo?.weatherCode)}
          alt=""
        />
        <div className="flex-1 mt-1 text-right">
          <p className="text-[14px]">{weatherInfo?.location}</p>
          <p className="text-[20px]">{weatherInfo?.time}</p>
          <p className="text-[42px] mr-2">{weatherInfo?.temp}</p>
        </div>
      </div>
      <AirLabel
        className="w-full  border-b-[2px] border-[#dfdfdf] "
        title="초미세먼지"
        value={weatherInfo?.choMise}
        status={weatherInfo?.choMiseStatus}
      />
      <AirLabel
        className="w-full  border-b-[2px] border-[#dfdfdf] "
        title="미세먼지"
        value={weatherInfo?.mise}
        status={weatherInfo?.miseStatus}
      />
      <AirLabel
        className="w-full "
        title="오존"
        value={weatherInfo?.ozon}
        status={weatherInfo?.ozonStatus}
      />
    </div>
  );
}
