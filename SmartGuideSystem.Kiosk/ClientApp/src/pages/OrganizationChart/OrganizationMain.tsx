import { useContext } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import FloorGuideMap from "src/components/FloorGuideMap";
import OrganizationChart from "src/components/OrganizationChart";
import Search from "src/components/Search";
import Notice from "src/components/Notice";
import { ViewDirectionType } from "src/types/Defines";
import { useIdleCheckerFireEvent } from "src/hooks/useIdleChecker";
// import PrimaryNormalButton from "src/components/ui/buttons/PrimaryNormalButton";
// import { randomInt } from "crypto";
// import DeviceContext from "src/contexts/DeviceContext";
import KioskContext from "src/contexts/KioskContext";
import DialogContext from "src/contexts/DialogContext";
import { findFloorIndexByOrgchartName } from "src/helpers/findFloorIndex";
import FullRowMenuBar from "src/components/FullRowMenuBar";
import SeatPositionChart from "src/components/SeatPositionChart";
import FullRowMenuBar2, {
  IFullRowMenuBarItem,
} from "src/components/FullRowMenuBar2";

import searchIcon from "src/assets/fullrowmenu/search.svg";
import homeIcon from "src/assets/fullrowmenu/home.svg";
import organizationIcon from "src/assets/fullrowmenu/organization.svg";
import buildingIcon from "src/assets/fullrowmenu/buliding.svg";
import listIcon from "src/assets/fullrowmenu/list.svg";
import noticeIcon from "src/assets/fullrowmenu/notice.svg";
import layoutIcon from "src/assets/fullrowmenu/layout.svg";
import menuLogo from "src/assets/logo.svg";
import useHorizontalScreen from "src/hooks/useHorizontalScreen";
import VerticalTopMenuBar from "src/components/VerticalTopMenuBar";
import Gosigonggo from "src/components/Gosigonggo";
import { MENU_LOGO_IMAGE } from "src/const";
import {
  RightTitleLayout2NoImage,
  RightTitleLayout3NoImage,
} from "src/components/RightTitleLayout";
// import menuLogo from "src/assets/jin_white_logo.svg";

const AllRoutes = [
  {
    index: true,
    path: "/",
    element: <SeatPositionChart />,
  },
  {
    path: "/organization_chart",
    element: <OrganizationChart />,
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
    path: "/gosi_list",
    element: (
      <Gosigonggo
        layoutTypeItemCountByLayout={4}
        listTypeItemCountByPage={10}
        className="max-2xl:pt-[129px] max-2xl:pb-[196px] max-2xl:pr-[0px]"
      />
    ),
  },
  {
    path: "*",
    element: <SeatPositionChart />,
  },
];

export default function OrganizationMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const dialogCtx = useContext(DialogContext);
  const kioskCtx = useContext(KioskContext);
  const refreshMS = kioskCtx?.deviceInfo?.extraSettings?.refreshMS ?? 1000 * 30;
  //const refreshMS = 1000 * 60 * 60; // for test

  useIdleCheckerFireEvent(Math.max(refreshMS, 5000), () => {
    dialogCtx?.popAllDialogs();
    navigate("/");
  });

  // let initMenuIndex = 1;

  // switch (true) {
  //   case /^\/search/.test(location.pathname):
  //     initMenuIndex = 0;
  //     break;
  //   case /^\/$/.test(location.pathname):
  //     initMenuIndex = 1;
  //     break;
  //   case /^\/seat_poschart/.test(location.pathname):
  //     initMenuIndex = 2;
  //     break;
  //   case /^\/organization_chart/.test(location.pathname):
  //     initMenuIndex = 3;
  //     break;

  //   case /^\/floor_guidemap/.test(location.pathname):
  //     initMenuIndex = 4;
  //     break;
  //   case /^\/notice_list/.test(location.pathname):
  //     initMenuIndex = 5;
  //     break;
  // }

  const myfloorInfo = findFloorIndexByOrgchartName(
    kioskCtx?.buildingInfo,
    kioskCtx?.seatPosChart?.name
  );

  const MENU_ITEMS: Array<IFullRowMenuBarItem> = [
    { key: "search", title: "검색", icon: searchIcon, navigatePath: "/search" },
    {
      key: "home",
      title: "처음으로",
      icon: homeIcon,
      navigatePath: "/",
      isIndexPath: true,
    },
    // {
    //   key: "organizationChart",
    //   title: "조직도",
    //   icon: organizationIcon,
    //   navigatePath: "/organization_chart",
    // },
    {
      key: "seatPosChart",
      title: "조직도",
      icon: organizationIcon,
      navigatePath: "/seat_poschart",
    },
    {
      key: "guideMap",
      title: "청사안내도",
      icon: buildingIcon,
      navigatePath: `/floor_guidemap/${myfloorInfo.bindex}/${myfloorInfo.findex}`,
    },
    {
      key: "notice",
      title: "새소식",
      icon: noticeIcon,
      navigatePath: "/notice_list",
    },
    {
      key: "gosi",
      title: "고시공고",
      icon: listIcon,
      navigatePath: "/gosi_list",
    },
  ];

  const isHorizontal = useHorizontalScreen();

  return (
    <div
      // className="relative w-screen h-screen bg-no-repeat bg-cover bg-center bg-[url('assets/background/main.webp')]  "
      className="relative w-screen h-screen bg-no-repeat bg-cover bg-center bg-main-background "
      onContextMenu={(ev) => ev.preventDefault()}
    >
      <div className="w-full h-full">
        <Routes>
          {AllRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </div>
      <FullRowMenuBar2
        menuItems={MENU_ITEMS}
        // logoImage={menuLogo}
        logoImage={MENU_LOGO_IMAGE}
        currentPathName={location.pathname}
        className="w-full absolute bottom-0 
        text-white border-t-[1px] border-white z-40
        max-2xl:h-vertical-bottombar-height 
        2xl:h-horizontal-bottombar-height "
      />

      {!isHorizontal && (
        <VerticalTopMenuBar className="absolute top-0 h-vertical-topbar-height w-full" />
      )}
    </div>
  );
}
