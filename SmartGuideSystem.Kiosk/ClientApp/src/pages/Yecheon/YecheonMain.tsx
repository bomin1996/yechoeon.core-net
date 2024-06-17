import React, { useContext, useState } from "react";
import FullRowMenuBar from "src/components/FullRowMenuBar";
import KioskContext from "src/contexts/KioskContext";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DialogContext from "src/contexts/DialogContext";
import { useIdleCheckerFireEvent } from "src/hooks/useIdleChecker";
import YecheonHome from "./YecheonHome";
import FullRowMenuBar2, {
  IFullRowMenuBarItem,
} from "src/components/FullRowMenuBar2";
import homeIcon from "src/assets/fullrowmenu/home.svg";
import { MENU_LOGO_IMAGE, MENU_LOGO_IMAGE_2 } from "src/const";
import FullRowMenuBar3 from "src/components/FullRowMenuBar3";

const AllRoutes = [
  {
    index: true,
    path: "/",
    element: <YecheonHome />,
  },
];

export default function YecheonMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const dialogCtx = useContext(DialogContext);
  const kioskCtx = useContext(KioskContext);
  const refreshMS = kioskCtx?.deviceInfo?.extraSettings?.refreshMS ?? 1000 * 30;

  useIdleCheckerFireEvent(refreshMS, () => {
    dialogCtx?.popAllDialogs();
    navigate("/");
  });

  const MENU_ITEMS: Array<IFullRowMenuBarItem> = [
    {
      key: "home",
      title: "처음으로",
      icon: homeIcon,
      navigatePath: "/",
      isIndexPath: true,
    },
  ];

  let initMenuIndex = 0;
  switch (true) {
    case /^\/$/.test(location.pathname):
      initMenuIndex = 0;
      break;
  }

  return (
    <div className="relative bg-secondary-back1 w-scree h-screen bg-no-repeat bg-cover bg-[url('assets/background/main_yecheon.png')] ">
      <div className="w-full h-full absolute z-0 ">
        <Routes>
          {AllRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </div>

      <FullRowMenuBar3 className="absolute bottom-0 h-[120px] w-full text-white border-t-[1px] border-white z-40" />
    </div>
  );
}
