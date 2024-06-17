import React, { useContext } from "react";
import CityCouncilHome from "./CityCouncilHome";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Search from "src/components/Search";
import FullRowMenuBar from "src/components/FullRowMenuBar";
import { WeatherAirProvider } from "src/contexts/WeatherAirContext";
import FloorGuideMap from "src/components/FloorGuideMap";
import { findFloorIndexByDeviceId } from "src/helpers/findFloorIndex";
import KioskContext from "src/contexts/KioskContext";
const AllRoutes = [
  {
    index: true,
    path: "/",
    element: <CityCouncilHome />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "*",
    element: <CityCouncilHome />,
  },
  {
    path: "/floor_guidemap/:buildingIndex/:floorIndex",
    element: <FloorGuideMap />,
  },
];

export default function CityCouncilMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const kioskCtx = useContext(KioskContext);

  let initMenuIndex = 0;
  switch (true) {
    case /^\/search/.test(location.pathname):
      initMenuIndex = 0;
      break;

    case /^\/floor_guidemap/.test(location.pathname):
      initMenuIndex = 4;
      break;
    case /^\/$/.test(location.pathname):
      initMenuIndex = 1;
      break;
  }

  const myfloorInfo = findFloorIndexByDeviceId(
    kioskCtx?.buildingInfo,
    kioskCtx?.deviceInfo?.deviceId
  );

  return (
    <div
      className="relative w-screen h-screen bg-no-repeat bg-cover bg-center bg-[url('assets/background/main.webp')]  "
      onContextMenu={(ev) => ev.preventDefault()}
    >
      <Routes>
        {AllRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>

      <WeatherAirProvider>
        <FullRowMenuBar
          selectedIndex={initMenuIndex}
          visibleOrgChart={false}
          visibleSeatChart={false}
          visibleFloorMap={true}
          visibleNotice={false}
          className="absolute bottom-0 h-[120px] w-full text-white border-t-[1px] border-white z-40"
          onDidSelect={(idx, title) => {
            // setSelectedMenuIndex(idx);
            switch (title) {
              case "검색": // 검색
                navigate("/search");
                break;
              case "처음으로": // 처음화면
                navigate("/");
                break;
              case "청사안내도": //
                navigate(
                  `/floor_guidemap/${myfloorInfo.bindex}/${myfloorInfo.findex}`
                );
                break;
            }
          }}
        />
      </WeatherAirProvider>
    </div>
  );
}
