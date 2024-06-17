// import { SITE_LOGO_IMAGE } from "@/const";
import icon_home from "@/assets/icons/icon-menu-00.svg";
import icon_organization from "@/assets/icons/icon-menu-01.svg";

import SITE_LOGO_IMAGE1 from "@/assets/jin_logo.svg";
import SITE_LOGO_IMAGE2 from "@/assets/gangseo_logo.svg";
import SITE_LOGO_IMAGE3 from "@/assets/logo-ury.svg";
import SITE_LOGO_YECHOEN from "@/assets/logo-yc.svg";

// import SITE_SEATPOST_BACK_IMAGE from "@/assets/background/main_jinju.webp"
import SITE_SEATPOST_HOR_PREVIEW_IMAGE from "@/assets/background/preview_seatchart_ury.png"; //의령
import SITE_SEATPOST_VER_PREVIEW_IMAGE from "@/assets/background/preview_vertical_seatchart_ury.png"; //의령

import SITE_HOR_FLOOR_GUIDE_PREVIEW_IMAGE from "@/assets/background/청사안내도 가로형.png";
import SITE_VER_FLOOR_GUIDE_PREVIEW_IMAGE from "@/assets/background/청사안내도 세로형.png";

import { KioskType } from "@shares/*";

export type SITE_TYPE = "jinju" | "uiryeong" | "gangseo" | "haman" | "yecheon";
const CURRENT_SITE: SITE_TYPE = import.meta.env.VITE_SITE_TYPE;

export type MenuContent = {
  icon: string;
  title: string;
  path: string;
  order: number;
};

function getKioskTypeDesc(kioskType: KioskType) {
  switch (kioskType) {
    case "OrganizationChart":
      return "부서조직도";
    case "BuildingGuideHorizontalChart":
      return "청사안내도(가로)";
    case "BuildingGuideVerticalChart":
      return "청사안내도(세로)";
    case "Gosigonggo":
      return "고시공고";
    case "FloorInformation":
      return "층별안내도";
    case "CityCouncil":
      return "의회안내도";
    case "MeetingRoomInformation":
      return "회의실안내";
    case "GangseoGosiNotice":
      return "강서고시새소식안내";
    case "Signage":
      return "사이니지";
    case "HamanCycleKioskGuide":
      return "함안자전거주차장키오스크";
    case "None":
    default:
      return "지정되지않음";
  }
}

const gosiTypeTitls = ["공고", "고시", "채용공고"];
const floorMapTypeTitls = ["정방향", "역방향"];
const admin_version = "2.6.0.11102023"; // 2023-09-26

const AUTO_LOGOUT_MS = 30 * 60 * 1000; // 30분

// ver.[2.4.3]
// 1. 컨텐츠 기본 표시방법 변경 object-contain => object-fill
//const admin_version = "2.4.3";

//const MAX_UPLOAD_FILE_SIZE = 1024 * 1024 * 300; // 300MB
const MAX_UPLOAD_FILE_SIZE = 1024 * 1024 * 1024 * 10; // 10GB
const UPLOAD_FILE_TYPES = [
  "image/png",
  "image/gif",
  "image/jpeg",
  "image/webp",
  "video/mp4",
];

const {
  SITE_LOGO_IMAGE,
  menuMap,
  managerAvailableMenus,
  availableKioskTypeTitls,
  availableKioskTypes,
} = getConfig(CURRENT_SITE);

export {
  SITE_LOGO_IMAGE,
  SITE_SEATPOST_HOR_PREVIEW_IMAGE,
  SITE_SEATPOST_VER_PREVIEW_IMAGE,
  SITE_HOR_FLOOR_GUIDE_PREVIEW_IMAGE,
  SITE_VER_FLOOR_GUIDE_PREVIEW_IMAGE,
  menuMap,
  managerAvailableMenus,
  availableKioskTypeTitls,
  availableKioskTypes,
  admin_version,
  getKioskTypeDesc,
  gosiTypeTitls,
  floorMapTypeTitls,
  MAX_UPLOAD_FILE_SIZE,
  UPLOAD_FILE_TYPES,
  CURRENT_SITE,
  AUTO_LOGOUT_MS,
};

function getConfig(curSite: SITE_TYPE) {
  if (curSite === "jinju") {
    return getConfigJinju();
  } else if (curSite === "uiryeong") {
    return getConfigUry();
  } else if (curSite === "gangseo") {
    return getConfigGangseo();
  } else if (curSite === "yecheon") {
    return getConfigYecheon();
  } else {
    throw "NotSupport Admin Site!!!!!";
  }
}
function getConfigJinju() {
  const menuMap = new Map<string, MenuContent>();
  menuMap.set("Home", {
    icon: icon_home,
    title: "처음화면",
    path: "/",
    order: 0,
  });

  // menuMap.set("OrganizationChart", {
  //   icon: icon_organization,
  //   title: "조직도",
  //   path: "/organization",
  //   order: 0,
  // });

  // menuMap.set("BuildingInformation", {
  //   icon: icon_organization,
  //   title: "청사안내도",
  //   path: "/buildings",
  //   order: 0,
  // });

  // menuMap.set("SeatPositionChart", {
  //   icon: icon_organization,
  //   title: "자리배치도",
  //   path: "/seating_chart",
  //   order: 0,
  // });
  // menuMap.set("MemberManagement", {
  //   icon: icon_organization,
  //   title: "직원관리",
  //   path: "/memberlist",
  //   order: 0,
  // });
  // menuMap.set("MeetingManagement", {
  //   icon: icon_organization,
  //   title: "회의관리",
  //   path: "/meeting_management",
  //   order: 0,
  // });

  // menuMap.set("CouncilManagement", {
  //   icon: icon_organization,
  //   title: "의회설정",
  //   path: "/council_management",
  //   order: 0,
  // });
  // menuMap.set("DepartmentManagement", {
  //   icon: icon_organization,
  //   title: "부서관리",
  //   path: "/deptlist",
  //   order: 0,
  // });
  menuMap.set("DeviceManagement", {
    icon: icon_organization,
    title: "장치관리",
    path: "/devices",
    order: 0,
  });
  menuMap.set("LoginUserManagement", {
    icon: icon_organization,
    title: "사용자관리",
    path: "/userlist",
    order: 0,
  });
  // menuMap.set("ServerManagement", {
  //   icon: icon_organization,
  //   title: "서버관리",
  //   path: "/setup",
  //   order: 0,
  // });

  menuMap.set("CMSManagement", {
    icon: icon_organization,
    title: "컨텐츠관리",
    path: "/cms",
    order: 0,
  });

  const managerAvailableMenus = [
    // { title: "조직도 메뉴사용", menuKey: "OrganizationChart" },
    // { title: "자리배치도 메뉴사용", menuKey: "SeatPositionChart" },
    // { title: "사이니지 메뉴사용", menuKey: "Signage" },
    // { title: "직원관리 메뉴사용", menuKey: "MemberManagement" },
    // { title: "회의관리 메뉴사용", menuKey: "MeetingManagement" },
    // { title: "공지관리 메뉴사용", menuKey: "NoticeManagement" },
    // { title: "의회설정 메뉴사용", menuKey: "CouncilManagement" },
    // { title: "관내도 메뉴사용", menuKey: "LocalMapManagement" },
    { title: "컨텐츠관리 메뉴사용", menuKey: "CMSManagement" },
  ];

  const availableKioskTypeTitls = [
    "조직도키오스크",
    // "청사안내가로",
    // "청사안내세로",
    "고시공고",
    "층별청사안내",
    "의회안내",
    "회의실안내",
    // "강서고시새소식",
    "사이니지",
  ];
  const availableKioskTypes: Array<KioskType> = [
    "OrganizationChart",
    // "BuildingGuideHorizontalChart",
    // "BuildingGuideVerticalChart",
    "Gosigonggo",
    "FloorInformation",
    "CityCouncil",
    "MeetingRoomInformation",
    // "GangseoGosiNotice",
    "Signage",
  ];

  return {
    SITE_LOGO_IMAGE: SITE_LOGO_IMAGE1,
    menuMap,
    managerAvailableMenus,
    availableKioskTypeTitls,
    availableKioskTypes,
  };
}
function getConfigUry() {
  const menuMap = new Map<string, MenuContent>();
  menuMap.set("Home", {
    icon: icon_home,
    title: "처음화면",
    path: "/",
    order: 0,
  });

  menuMap.set("BuildingInformation", {
    icon: icon_organization,
    title: "청사안내도",
    path: "/buildings",
    order: 0,
  });

  menuMap.set("SeatPositionChart", {
    icon: icon_organization,
    title: "자리배치도",
    path: "/seating_chart",
    order: 0,
  });

  menuMap.set("MemberManagement", {
    icon: icon_organization,
    title: "직원관리",
    path: "/memberlist",
    order: 0,
  });

  // menuMap.set("Signage", {
  //   icon: icon_organization,
  //   title: "사이니지",
  //   path: "/signage",
  //   order: 0,
  // });
  // menuMap.set("CouncilManagement", {
  //   icon: icon_organization,
  //   title: "의회설정",
  //   path: "/council_management",
  //   order: 0,
  // });
  menuMap.set("DepartmentManagement", {
    icon: icon_organization,
    title: "부서관리",
    path: "/deptlist",
    order: 0,
  });
  menuMap.set("DeviceManagement", {
    icon: icon_organization,
    title: "장치관리",
    path: "/devices",
    order: 0,
  });
  menuMap.set("LoginUserManagement", {
    icon: icon_organization,
    title: "사용자관리",
    path: "/userlist",
    order: 0,
  });
  menuMap.set("ServerManagement", {
    icon: icon_organization,
    title: "서버관리",
    path: "/setup",
    order: 0,
  });
  // menuMap.set("NoticeManagement", {
  //   icon: icon_organization,
  //   title: "공지관리",
  //   path: "/noticelist",
  //   order: 0,
  // });
  menuMap.set("CMSManagement", {
    icon: icon_organization,
    title: "컨텐츠관리",
    path: "/cms",
    order: 0,
  });
  const managerAvailableMenus = [
    { title: "자리배치도 메뉴사용", menuKey: "SeatPositionChart" },
    { title: "사이니지 메뉴사용", menuKey: "Signage" },
    { title: "공지관리 메뉴사용", menuKey: "NoticeManagement" },
  ];

  const availableKioskTypeTitls = ["조직도키오스크", "사이니지"];
  const availableKioskTypes: Array<KioskType> = [
    "OrganizationChart",
    "Signage",
  ];

  return {
    SITE_LOGO_IMAGE: SITE_LOGO_IMAGE3,
    menuMap,
    managerAvailableMenus,
    availableKioskTypeTitls,
    availableKioskTypes,
  };
}
function getConfigGangseo() {
  const menuMap = new Map<string, MenuContent>();
  menuMap.set("Home", {
    icon: icon_home,
    title: "처음화면",
    path: "/",
    order: 0,
  });

  menuMap.set("LocalMapManagement", {
    icon: icon_organization,
    title: "관내도",
    path: "/localmap",
    order: 0,
  });

  menuMap.set("DepartmentManagement", {
    icon: icon_organization,
    title: "부서관리",
    path: "/deptlist",
    order: 0,
  });
  menuMap.set("DeviceManagement", {
    icon: icon_organization,
    title: "장치관리",
    path: "/devices",
    order: 0,
  });
  menuMap.set("LoginUserManagement", {
    icon: icon_organization,
    title: "사용자관리",
    path: "/userlist",
    order: 0,
  });

  menuMap.set("CMSManagement", {
    icon: icon_organization,
    title: "컨텐츠관리",
    path: "/cms",
    order: 0,
  });
  const managerAvailableMenus = [
    { title: "관내도 메뉴사용", menuKey: "LocalMapManagement" },
    { title: "컨텐츠관리 메뉴사용", menuKey: "CMSManagement" },
  ];

  const availableKioskTypeTitls = ["강서고시새소식"];
  const availableKioskTypes: Array<KioskType> = ["GangseoGosiNotice"];

  return {
    SITE_LOGO_IMAGE: SITE_LOGO_IMAGE2,
    menuMap,
    managerAvailableMenus,
    availableKioskTypeTitls,
    availableKioskTypes,
  };
}

function getConfigYecheon() {
  const menuMap = new Map<string, MenuContent>();

  menuMap.set("Home", {
    icon: icon_home,
    title: "처음화면",
    path: "/",
    order: 0,
  });

  // menuMap.set("DepartmentManagement", {
  //   icon: icon_organization,
  //   title: "부서관리",
  //   path: "/deptlist",
  //   order: 0,
  // });

  menuMap.set("WatcherManagement", {
    icon: icon_organization,
    title: "당직자관리",
    path: "/watcher_management",
    order: 0,
  });

  menuMap.set("ScheduleManagement", {
    icon: icon_organization,
    title: "일정관리",
    path: "/schedule_management",
    order: 0,
  });

  menuMap.set("LoginUserManagement", {
    icon: icon_organization,
    title: "사용자관리",
    path: "/userlist",
    order: 0,
  });
  menuMap.set("DeviceManagement", {
    icon: icon_organization,
    title: "장치관리",
    path: "/devices",
    order: 0,
  });

  const managerAvailableMenus = [
    { title: "관내도 메뉴사용", menuKey: "LocalMapManagement" },
  ];

  const availableKioskTypeTitls = ["예천농업기술원"];
  const availableKioskTypes: Array<KioskType> = ["Yecheon"];

  return {
    SITE_LOGO_IMAGE: SITE_LOGO_YECHOEN,
    menuMap,
    managerAvailableMenus,
    availableKioskTypeTitls,
    availableKioskTypes,
  };
}
