import React, { PropsWithChildren, useContext, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useIdleCheckerFireEvent } from "src/hooks/useIdleChecker";
import DialogContext from "src/contexts/DialogContext";
import KioskContext from "src/contexts/KioskContext";
import { findFloorIndexByDeviceId } from "src/helpers/findFloorIndex";
import FullRowMenuBar from "src/components/FullRowMenuBar";
import MeetingInformationHome from "./MeetingInformationHome";

const AllRoutes = [
  {
    index: true,
    element: <MeetingInformationHome />,
  },
];

export default function MeetingInformationMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const dialogCtx = useContext(DialogContext);
  const kioskCtx = useContext(KioskContext);
  const refreshMS = kioskCtx?.deviceInfo?.extraSettings?.refreshMS ?? 1000 * 30;

  useIdleCheckerFireEvent(refreshMS, () => {
    dialogCtx?.popAllDialogs();
    navigate("/");
  });

  let initMenuIndex = 0;
  switch (true) {
    case /^\/$/.test(location.pathname):
      initMenuIndex = 0;
      break;
    case /^\/floor_guidemap/.test(location.pathname):
      initMenuIndex = 1;
      break;
    case /^\/notice_list/.test(location.pathname):
      initMenuIndex = 2;
      break;
  }

  // const isSearchMode = location.pathname === "/search";
  // const isHome = location.pathname === "/";

  // const myfloorInfo = findFloorIndexByDeviceId(
  //   kioskCtx?.buildingInfo,
  //   kioskCtx?.deviceInfo?.deviceId
  // );

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
        visibleFloorMap={false}
        visibleNotice={false}
        visibleOrgChart={false}
        visibleSearch={false}
        visibleSeatChart={false}
        visibleHome={false}
        selectedIndex={initMenuIndex}
        className="absolute bottom-0 h-[120px] w-[1649px] text-white border-t-[1px] border-white z-40 pl-[22px] pr-[42px]"
        onDidSelect={(idx) => {}}
      />
    </div>
  );
}
