import React, { PropsWithChildren, useContext, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import FloorGuideMap from "src/components/FloorGuideMap";
import Search from "src/components/Search";
import Notice from "src/components/Notice";
import { ViewDirectionType } from "src/types/Defines";
import DialogContext from "src/contexts/DialogContext";
import FloorInformationHome from "./FloorInformationHome";
import KioskContext from "src/contexts/KioskContext";
import { findFloorIndexByDeviceId } from "src/helpers/findFloorIndex";
import FullRowMenuBar from "src/components/FullRowMenuBar";
import SeatPositionChart from "src/components/SeatPositionChart";
import { useIdleCheckerFireEvent2 } from "src/hooks/useIdleCheckerFireEvent2";

const AllRoutes = [
  {
    index: true,
    element: <FloorInformationHome />,
  },
  {
    path: "/floor_guidemap/:buildingIndex",
    element: <FloorGuideMap />,
  },
  {
    path: "/floor_guidemap/:buildingIndex/:floorIndex",
    element: <FloorGuideMap />,
  },
  {
    path: "/notice_list/:boardIdx",
    element: <Notice />,
  },
  {
    path: "/notice_list",
    element: <Notice />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/seat_poschart",
    element: <SeatPositionChart />,
  },
  {
    path: "*",
    element: <FloorInformationHome />,
  },
];

export default function FloorInformationMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const dialogCtx = useContext(DialogContext);
  const kioskCtx = useContext(KioskContext);

  const refreshMS = kioskCtx?.deviceInfo?.extraSettings?.refreshMS ?? 1000 * 30;
  // const refreshMS = 1000 * 60 * 5; // kioskCtx?.deviceInfo?.extraSettings?.refreshMS ?? 1000 * 100;

  useIdleCheckerFireEvent2(refreshMS, () => {
    dialogCtx?.popAllDialogs();
    navigate("/");
  });

  let initMenuIndex = 0;
  switch (true) {
    case /^\/$/.test(location.pathname):
      initMenuIndex = 1;
      break;
    case /^\/floor_guidemap/.test(location.pathname):
      initMenuIndex = 4;
      break;
    case /^\/notice_list/.test(location.pathname):
      initMenuIndex = 5;
      break;

    case /^\/search/.test(location.pathname):
      initMenuIndex = 0;
      break;
  }

  const myfloorInfo = findFloorIndexByDeviceId(
    kioskCtx?.buildingInfo,
    kioskCtx?.deviceInfo?.deviceId
  );

  return (
    <div className="relative bg-secondary-back1 w-scree h-screen bg-no-repeat bg-cover bg-[url('assets/background/main.webp')] ">
      <div className="w-full h-full absolute z-0 ">
        <Routes>
          {AllRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </div>
      <FullRowMenuBar
        selectedIndex={initMenuIndex}
        visibleOrgChart={false}
        visibleSeatChart={false}
        className="absolute bottom-0 h-[120px] w-full text-white border-t-[1px] border-white z-40"
        onDidSelect={(idx, menuName) => {
          switch (menuName) {
            case "검색": //
              navigate("/search");
              break;
            case "처음으로": //
              navigate("/");
              break;
            case "청사안내도": //
              navigate(
                `/floor_guidemap/${myfloorInfo.bindex}/${myfloorInfo.findex}`
              );
              break;
            case "새소식": //
              navigate("/notice_list");
              break;
          }
        }}
      />
    </div>
  );
}
