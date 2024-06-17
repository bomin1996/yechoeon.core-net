import BuildingInfoList from "./components/building_guide/BuildingInfoList";
import DeviceList from "./components/kiosk_devices/DeviceList";
import Home from "@/components/Home";
import UserListMain from "./components/user_management/UserListMain";
import Login from "./components/Login";
import SeatingChartList from "./components/seating_chart/SeatingChartList";
import MemberList from "./components/member_management/MemberList";
import DeptList from "./components/dept_management/DeptList";
import CMSManagement from "./components/cms_management/CMSManagement";
import LocalMapInfoList from "./components/local_map/LocalMapInfoList";
import Setup from "./components/setup";
import { SITE_TYPE } from "./const";
import StoreList from "./components/store_management/storeList";
import BusRouteList from "./components/busroute_management/BusRouteList";
import FakeLogin from "./components/FakeLogin";
import WatcherMain from "./components/watcher_management/WatcherList";
import ScheduleMain from "./components/schedule_management/ScheduleMain";

// const AppRoutes_ = [
//   {
//     requireAuth: false,
//     path: "/Account/Login",
//     element: <Login />,
//   },
//   {
//     index: true,
//     requireAuth: true,
//     path: "/",
//     element: <Home />,
//   },
//   {
//     requireAuth: true,
//     path: "/organization",
//     element: <OrganizationChartList />,
//   },

//   // {
//   //   requireAuth: true,
//   //   path: "/guidemap",
//   //   element: <GuideMapList />,
//   // },
//   {
//     requireAuth: true,
//     path: "/buildings",
//     element: <BuildingInfoList />,
//   },
//   // {
//   //   requireAuth: true,
//   //   path: "/buildings/:floorId",
//   //   element: <EditFloorGuideMapPopup />,
//   // },
//   {
//     requireAuth: true,
//     path: "/localmap",
//     element: <LocalMapInfoList />,
//   },
//   {
//     requireAuth: true,
//     path: "/devices",
//     element: <DeviceList />,
//   },
//   {
//     requireAuth: true,
//     path: "/userlist",
//     element: <UserListMain />,
//   },
//   {
//     requireAuth: true,
//     path: "/memberlist",
//     element: <MemberList />,
//   },
//   {
//     requireAuth: true,
//     path: "/deptlist",
//     element: <DeptList />,
//   },
//   {
//     requireAuth: true,
//     path: "/noticelist",
//     element: <NoticeListMain />,
//   },
//   {
//     requireAuth: true,
//     path: "/setup",
//     element: <Setup />,
//   },
//   {
//     requireAuth: true,
//     path: "/signage",
//     element: <SignAgeMain />,
//   },

//   {
//     requireAuth: true,
//     path: "/seating_chart",
//     element: <SeatingChartList />,
//   },
//   {
//     requireAuth: true,
//     path: "/council_management",
//     element: <CityCouncilSettings />,
//   },
//   {
//     requireAuth: true,
//     path: "/meeting_management",
//     element: <MeetingInfoList />,
//   },
//   // {
//   //   requireAuth: true,
//   //   path: "/gosi_management",
//   //   element: <GosigonggoList />,
//   // },

//   {
//     requireAuth: true,
//     path: "/cms",
//     element: <CMSManagement />,
//   },

//   {
//     requireAuth: true,
//     path: "/*",
//     element: <Home />,
//   },
// ];
const AppRoutes = getAppRoutes();
export default AppRoutes;

function getAppRoutes() {
  const CURRENT_SITE: SITE_TYPE = import.meta.env.VITE_SITE_TYPE;
  if (CURRENT_SITE === "jinju") {
    const appRoutes = [
      {
        requireAuth: false,
        path: "/Account/Login",
        element: <Login />,
      },
      {
        requireAuth: false,
        path: "/Account/FakeLogin",
        element: <FakeLogin />,
      },
      {
        index: true,
        requireAuth: true,
        path: "/",
        element: <Home />,
      },
      // {
      //   requireAuth: true,
      //   path: "/organization",
      //   element: <OrganizationChartList />,
      // },
      // {
      //   requireAuth: true,
      //   path: "/buildings",
      //   element: <BuildingInfoList />,
      // },
      {
        requireAuth: true,
        path: "/devices",
        element: <DeviceList />,
      },
      {
        requireAuth: true,
        path: "/userlist",
        element: <UserListMain />,
      },
      // {
      //   requireAuth: true,
      //   path: "/memberlist",
      //   element: <MemberList />,
      // },
      // {
      //   requireAuth: true,
      //   path: "/deptlist",
      //   element: <DeptList />,
      // },
      // {
      //   requireAuth: true,
      //   path: "/setup",
      //   element: <Setup />,
      // },
      // {
      //   requireAuth: true,
      //   path: "/signage",
      //   element: <SignAgeMain />,
      // },
      // {
      //   requireAuth: true,
      //   path: "/seating_chart",
      //   element: <SeatingChartList />,
      // },
      // {
      //   requireAuth: true,
      //   path: "/council_management",
      //   element: <CityCouncilSettings />,
      // },
      // {
      //   requireAuth: true,
      //   path: "/meeting_management",
      //   element: <MeetingInfoList />,
      // },
      {
        requireAuth: true,
        path: "/cms",
        element: <CMSManagement />,
      },
      {
        requireAuth: true,
        path: "/cms_noleftmenu",
        element: <CMSManagement />,
      },
      {
        requireAuth: true,
        path: "/*",
        element: <Home />,
      },
    ];
    return appRoutes;
  } else if (CURRENT_SITE === "uiryeong") {
    const appRoutes = [
      {
        requireAuth: false,
        path: "/Account/Login",
        element: <Login />,
      },
      {
        index: true,
        requireAuth: true,
        path: "/",
        element: <Home />,
      },

      {
        requireAuth: true,
        path: "/buildings",
        element: <BuildingInfoList />,
      },

      {
        requireAuth: true,
        path: "/devices",
        element: <DeviceList />,
      },
      {
        requireAuth: true,
        path: "/userlist",
        element: <UserListMain />,
      },
      {
        requireAuth: true,
        path: "/memberlist",
        element: <MemberList />,
      },
      {
        requireAuth: true,
        path: "/deptlist",
        element: <DeptList />,
      },
      // {
      //   requireAuth: true,
      //   path: "/noticelist",
      //   element: <NoticeListMain />,
      // },
      {
        requireAuth: true,
        path: "/setup",
        element: <Setup />,
      },
      // {
      //   requireAuth: true,
      //   path: "/signage",
      //   element: <SignAgeMain />,
      // },

      {
        requireAuth: true,
        path: "/seating_chart",
        element: <SeatingChartList />,
      },

      {
        requireAuth: true,
        path: "/cms",
        element: <CMSManagement />,
      },

      {
        requireAuth: true,
        path: "/*",
        element: <Home />,
      },
    ];
    return appRoutes;
  } else if (CURRENT_SITE === "gangseo") {
    const appRoutes = [
      {
        requireAuth: false,
        path: "/Account/Login",
        element: <Login />,
      },
      {
        index: true,
        requireAuth: true,
        path: "/",
        element: <Home />,
      },

      {
        requireAuth: true,
        path: "/localmap",
        element: <LocalMapInfoList />,
      },
      {
        requireAuth: true,
        path: "/devices",
        element: <DeviceList />,
      },
      {
        requireAuth: true,
        path: "/userlist",
        element: <UserListMain />,
      },

      {
        requireAuth: true,
        path: "/deptlist",
        element: <DeptList />,
      },

      {
        requireAuth: true,
        path: "/cms",
        element: <CMSManagement />,
      },

      {
        requireAuth: true,
        path: "/*",
        element: <Home />,
      },
    ];
    return appRoutes;
  } else if (CURRENT_SITE === "haman") {
    const appRoutes = [
      {
        requireAuth: false,
        path: "/Account/Login",
        element: <Login />,
      },
      {
        index: true,
        requireAuth: true,
        path: "/",
        element: <Home />,
      },

      {
        requireAuth: true,
        path: "/devices",
        element: <DeviceList />,
      },
      {
        requireAuth: true,
        path: "/userlist",
        element: <UserListMain />,
      },
      {
        requireAuth: true,
        path: "/stores",
        element: <StoreList />,
      },
      {
        requireAuth: true,
        path: "/bus",
        element: <BusRouteList />,
      },
      {
        requireAuth: true,
        path: "/cms",
        element: <CMSManagement />,
      },
      {
        requireAuth: true,
        path: "/*",
        element: <Home />,
      },
    ];
    return appRoutes;
  } else if (CURRENT_SITE === "yecheon") {
    const appRoutes = [
      {
        requireAuth: false,
        path: "/Account/Login",
        element: <Login />,
      },
      {
        index: true,
        requireAuth: true,
        path: "/",
        element: <Home />,
      },

      {
        requireAuth: true,
        path: "/devices",
        element: <DeviceList />,
      },
      {
        requireAuth: true,
        path: "/userlist",
        element: <UserListMain />,
      },

      {
        requireAuth: true,
        path: "/deptlist",
        element: <DeptList />,
      },

      {
        requireAuth: true,
        path: "/watcher_management",
        element: <WatcherMain />,
      },

      {
        requireAuth: true,
        path: "/schedule_management",
        element: <ScheduleMain />,
      },

      {
        requireAuth: true,
        path: "/*",
        element: <Home />,
      },
    ];
    return appRoutes;
  } else {
    throw "Not Support Site!!";
  }
}
