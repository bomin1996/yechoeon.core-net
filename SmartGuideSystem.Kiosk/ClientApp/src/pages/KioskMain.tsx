import React, { PropsWithChildren, useContext, useEffect } from "react";
import KioskContext from "src/contexts/KioskContext";
import OrganizationMain from "./OrganizationChart/OrganizationMain";
import GosigonggoMain from "./GosigonggoPage/GosigonggoMain";
import { KioskType } from "@shares/*";
import { DialogProvider } from "src/contexts/DialogContext";
import NoData from "./NoData";
import FloorInformationMain from "./FloorInformation/FloorInformationMain";
import { WeatherAirProvider } from "src/contexts/WeatherAirContext";
import CityCouncilMain from "./CityCouncil/CityCouncilMain";
import MeetingInformationMain from "./MeetingInformation/MeetingInformationMain";
import GangseoGosiNoticeMain from "./GangseoGosiNotice";
import SignageMain from "./Signage/SignageMain";
import YecheonMain from "./Yecheon/YecheonMain";

export default function KioskMain() {
  const kioskContext = useContext(KioskContext);

  if (!kioskContext) {
    return <NoData />;
  }
  console.log("kioskContext", kioskContext);
  const kioskType = kioskContext!.deviceInfo!.kioskType;
  const MainComponet = selectMainLayout(kioskType);
  return <DialogProvider>{MainComponet}</DialogProvider>;
}

function selectMainLayout(kioskType: KioskType) {
  switch (kioskType) {
    case "OrganizationChart":
      return (
        <WeatherAirProvider>
          <OrganizationMain />
        </WeatherAirProvider>
      );
    case "Gosigonggo":
      return (
        <WeatherAirProvider>
          <GosigonggoMain />
        </WeatherAirProvider>
      );
    case "FloorInformation":
      return (
        <WeatherAirProvider>
          <FloorInformationMain />
        </WeatherAirProvider>
      );
    case "CityCouncil":
      return <CityCouncilMain />;
    case "MeetingRoomInformation":
      return (
        <WeatherAirProvider>
          <MeetingInformationMain />
        </WeatherAirProvider>
      );
    case "GangseoGosiNotice":
      return (
        <WeatherAirProvider>
          <GangseoGosiNoticeMain />
        </WeatherAirProvider>
      );
    case "Signage":
      return <SignageMain />;
    case "Yecheon":
      return (
        <WeatherAirProvider>
          <YecheonMain />
        </WeatherAirProvider>
      );
    default:
      return <div>Invalid Kiosk Type</div>;
  }

  // return <MeetingInformationMain />;
  // return <CityCouncilMain />;
}

function MockupHorizontalScreen({ children }: PropsWithChildren) {
  return (
    <div className="w-screen h-screen bg-sky-400">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 1920 1080`}
        //viewBox={viewBox}
        className="h-full object-center bg-sky-400"
        preserveAspectRatio="xMidYMid ">
        <foreignObject
          // className="rotate-90 origin-center hover:rotate-0 transition"
          x={0}
          y={0}
          width={1920}
          height={1080}>
          {children}
        </foreignObject>
      </svg>
    </div>
  );
}
