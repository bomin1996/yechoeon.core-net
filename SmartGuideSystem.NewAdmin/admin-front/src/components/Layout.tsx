import { PropsWithChildren, useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext";
import { BlockUIProvider } from "@/contexts/BlockUIContext";
import DialogContext, { DialogProvider } from "@/contexts/DialogContext";
import LeftMainMenuBar from "./LeftMainMenuBar";
import { useIdleCheckerFireEvent } from "@/hooks/useIdleChecker";
import { AUTO_LOGOUT_MS } from "@/const";

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const auth = useContext(AuthContext);

  let visibleLeftMenuBar = false;
  switch (location.pathname) {
    case "/":
    case "/organization":
    case "/guidemap":
    case "/buildings":
    case "/userlist":
    case "/memberlist":
    case "/deptlist":
    case "/noticelist":
    case "/devices":
    case "/setup":
    case "/signage":
    case "/seating_chart":
    case "/council_management":
    case "/meeting_management":
    case "/gosi_management":
    case "/cms":
      visibleLeftMenuBar = true;
      break;
    case "/cms_noleftmenu":
      visibleLeftMenuBar = false;
      break;
    default:
      visibleLeftMenuBar = auth?.user ? true : false;
      break;
  }

  // if (visibleLeftMenuBar) {
  //   useIdleCheckerFireEvent(1000 * 60 * 1, () => {
  //     console.log("Auto Logout");

  //     auth?.logout();
  //     // alert("logout");
  //   });
  // }

  return (
    <BlockUIProvider>
      <DialogProvider>
        <div className="h-screen w-screen min-h-[940px] min-w-[1200px]">
          <div className="w-full h-full items-stretch flex flex-row divide-x">
            <InnerLayout visibleLeftMenuBar={visibleLeftMenuBar}>
              {visibleLeftMenuBar && (
                <LeftMainMenuBar className="w-72 h-full flex-shrink-0  " />
              )}
              <div className="flex-1 w-0 flex-shrink-0  ">{children}</div>
            </InnerLayout>
          </div>
          <Toaster />
        </div>
      </DialogProvider>
    </BlockUIProvider>
  );
}

interface InnerProps extends PropsWithChildren {
  visibleLeftMenuBar: boolean;
}

function InnerLayout({ visibleLeftMenuBar, children }: InnerProps) {
  const auth = useContext(AuthContext);
  const digCtx = useContext(DialogContext);

  if (visibleLeftMenuBar) {
    useIdleCheckerFireEvent(AUTO_LOGOUT_MS, () => {
      console.log("Auto Logout");
      digCtx?.popAllDialogs();
      auth?.logout();
      // alert("logout");
    });
  }

  return <>{children}</>;
}
