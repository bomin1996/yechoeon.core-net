import React, { useContext, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import FullRowMenuBar2, {
  IFullRowMenuBarItem,
} from "src/components/FullRowMenuBar2";
import Gosigonggo from "src/components/Gosigonggo";
import Notice from "src/components/Notice";
import DialogContext from "src/contexts/DialogContext";
import KioskContext from "src/contexts/KioskContext";
import homeIcon from "src/assets/fullrowmenu/home.svg";
import listIcon from "src/assets/fullrowmenu/list.svg";
import noticeIcon from "src/assets/fullrowmenu/notice.svg";
import promotionIcon from "src/assets/fullrowmenu/promotion.svg";
import { useIdleCheckerFireEvent } from "src/hooks/useIdleChecker";
import useHorizontalScreen from "src/hooks/useHorizontalScreen";
import { MENU_LOGO_IMAGE } from "src/const";
import VerticalTopMenuBar from "src/components/VerticalTopMenuBar";
import Promotion from "src/components/Promotion";
import LocalMapMain from "src/components/LocalMap/LocalMapMain";
import { FirstClickProvider } from "src/contexts/FirstClickContext";
import buildingIcon from "src/assets/fullrowmenu/buliding.svg";
import MockupScreen from "src/components/ui/MockupScreen";

const AllRoutes = [
  {
    index: true,
    path: "/",
    element: <Promotion />,
  },
  {
    path: "/notice_list",
    element: <Notice />,
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
    path: "/promotion",
    element: <Promotion />,
  },
  {
    path: "/local_map",
    element: <LocalMapMain />,
  },
  {
    path: "*",
    element: (
      <Gosigonggo
        layoutTypeItemCountByLayout={4}
        listTypeItemCountByPage={10}
        className="max-2xl:pt-[129px] max-2xl:pb-[196px] max-2xl:pr-[0px]"
      />
    ),
  },
];

const rotationScreenPaths = ["/", "/notice_list", "/gosi_list"];

export default function GangseoGosiNoticeMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const dialogCtx = useContext(DialogContext);
  const kioskCtx = useContext(KioskContext);

  const [clicked, setClicked] = useState(false);
  const [refreshScreenIndex, setRefreshScreenIndex] = useState(0);

  const refreshMS = kioskCtx?.deviceInfo?.extraSettings?.refreshMS ?? 1000 * 30;
  //const refreshMS = 1000 * 60 * 60; // for test

  useIdleCheckerFireEvent(Math.max(refreshMS, 5000), () => {
    dialogCtx?.popAllDialogs();
    setRefreshScreenIndex((pv) => {
      const nv = (pv + 1) % rotationScreenPaths.length;
      navigate(rotationScreenPaths[nv]);
      return nv;
    });
  });

  const MENU_ITEMS: Array<IFullRowMenuBarItem> = [
    {
      key: "home",
      title: "처음으로",
      icon: homeIcon,
      navigatePath: "/",
      isIndexPath: true,
    },
    {
      key: "gosi",
      title: "고시공고",
      icon: listIcon,
      navigatePath: "/gosi_list",
    },

    {
      key: "notice",
      title: "새소식",
      icon: noticeIcon,
      navigatePath: "/notice_list",
    },
    {
      key: "promotion",
      title: "홍보영상",
      icon: promotionIcon,
      navigatePath: "/promotion",
    },
    {
      key: "localmap",
      title: "관내도",
      icon: buildingIcon,
      navigatePath: "/local_map",
    },
  ];

  const isHorizontal = useHorizontalScreen();

  return (
    <div
      className="relative w-screen h-screen bg-no-repeat bg-cover bg-center bg-main-background "
      onContextMenu={(ev) => ev.preventDefault()}
      onClick={() => setClicked(true)}>
      <div className="w-full h-full">
        <FirstClickProvider isClicked={clicked}>
          <Routes>
            {AllRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </FirstClickProvider>
      </div>
      <FullRowMenuBar2
        menuItems={MENU_ITEMS}
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
