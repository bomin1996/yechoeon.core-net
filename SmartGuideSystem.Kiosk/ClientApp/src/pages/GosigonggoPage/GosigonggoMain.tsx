import React, { PropsWithChildren, useContext, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import logoImage from "src/assets/jin_logo.svg";
import AirMenuLabel from "src/components/AirMenuLabel";
import DateAndTimeDayperiodLabel from "src/components/DateAndTimeDayperiodLabel";
import Gosigonggo from "src/components/Gosigonggo";
import TimeDateInfo from "src/components/TimeDateInfo";
import WeatherAirBar from "src/components/WeatherAirBar";
import WeatherMenuLabel from "src/components/WeatherMenuLabel";
import DialogContext from "src/contexts/DialogContext";
import { WeatherAirProvider } from "src/contexts/WeatherAirContext";
import { useIdleCheckerFireEvent } from "src/hooks/useIdleChecker";

const AllRoutes = [
  {
    index: true,
    element: (
      <Gosigonggo
        layoutTypeItemCountByLayout={4}
        listTypeItemCountByPage={10}
      />
    ),
  },
  {
    path: "*",
    element: (
      <Gosigonggo
        layoutTypeItemCountByLayout={4}
        listTypeItemCountByPage={10}
      />
    ),
  },
];

export default function GosigonggoMain({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const dialogCtx = useContext(DialogContext);

  useIdleCheckerFireEvent(1000 * 60 * 3, () => {
    dialogCtx?.popAllDialogs();
    navigate("/");
  });

  return (
    <div
      onContextMenu={(ev) => ev.preventDefault()}
      className="relative w-screen h-screen bg-no-repeat bg-cover bg-[url('assets/background/gosi_bg.png')] ">
      <div className=" absolute w-full left-0 top-0 right-0 h-[172px] flex items-baseline ">
        <WeatherAirBar className="m-auto text-white" />
      </div>

      <Routes>
        {AllRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>

      <div className=" absolute w-full left-0 bottom-0 right-0 h-[153px] flex items-baseline ">
        <DateAndTimeDayperiodLabel className="m-auto" />
      </div>
    </div>
  );
}
