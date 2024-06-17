import { useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import title_logo from "@/assets/admin-text-logo-2.svg";
import DialogModal from "./ui/modal/DialogModal";
import AuthContext from "@/contexts/AuthContext";
import placePhoto from "@/assets/user-photo-placeholder.webp";
import { showMessageOkCancelDialog } from "./modals";
import DialogContext from "@/contexts/DialogContext";
import { showChangePasswordDialog } from "./modals/ChangePasswordModal";
import BlockUIContext from "@/contexts/BlockUIContext";
import { AccountApi } from "@/server/accountApi";
import { descForRole } from "@/helpers/desc-helpers";
import { toast } from "react-hot-toast";
import { SITE_LOGO_IMAGE } from "@/const";
import { menuMap, MenuContent } from "@/const";

interface Props {
  className?: string;
}

function pushIfExist(
  keyName: string,
  srcMap: Map<string, MenuContent>,
  dstArr: MenuContent[],
  useMenus?: Array<String>
) {
  if (useMenus && !useMenus.includes(keyName)) {
    return;
  }
  const menuContent = srcMap.get(keyName);
  if (menuContent) {
    dstArr.push(menuContent);
  }
}

export default function LeftMainMenuBar({ className = "w-[376px]" }: Props) {
  const navigate = useNavigate();
  const dialogCtx = useContext(DialogContext);
  const currentUser = useContext(AuthContext)?.user;
  const blockUICtx = useContext(BlockUIContext);
  const location = useLocation();

  const { menuTitles, menuIcons, menuRoutes } = useMemo(() => {
    if (currentUser) {
      const availableMenus: Array<MenuContent> = [];
      const userRole = currentUser.role;
      const useMenus = currentUser.extraSettings?.useMenus ?? [
        "OrganizationChart",
        "SeatPositionChart",
        "MemberManagement",
        "MeetingManagement",
      ];
      switch (userRole) {
        case "DepartManager":
          pushIfExist("Home", menuMap, availableMenus);
          pushIfExist("OrganizationChart", menuMap, availableMenus, useMenus);
          pushIfExist("SeatPositionChart", menuMap, availableMenus, useMenus);
          pushIfExist("MemberManagement", menuMap, availableMenus, useMenus);
          pushIfExist("MeetingManagement", menuMap, availableMenus, useMenus);
          // availableMenus.push(menuMap.get("Home")!);
          // availableMenus.push(menuMap.get("OrganizationChart")!);
          // availableMenus.push(menuMap.get("SeatPositionChart")!);
          // availableMenus.push(menuMap.get("MemberManagement")!);
          // availableMenus.push(menuMap.get("MeetingManagement")!);

          // if (currentUser.extraSettings?.useSignageMenu) {
          //   pushIfExist("Signage", menuMap, availableMenus);
          // }
          // if (currentUser.extraSettings?.useCouncilMenu) {
          //   pushIfExist("CouncilManagement", menuMap, availableMenus);
          // }
          pushIfExist("NoticeManagement", menuMap, availableMenus, useMenus);
          pushIfExist("Signage", menuMap, availableMenus, useMenus);
          pushIfExist("CouncilManagement", menuMap, availableMenus, useMenus);
          pushIfExist("LocalMapManagement", menuMap, availableMenus, useMenus);
          pushIfExist("CMSManagement", menuMap, availableMenus, useMenus);

          pushIfExist("WatcherManagement", menuMap, availableMenus);
          pushIfExist("ScheduleManagement", menuMap, availableMenus);

          break;
        case "Admin":
          pushIfExist("Home", menuMap, availableMenus);
          pushIfExist("OrganizationChart", menuMap, availableMenus);
          pushIfExist("SeatPositionChart", menuMap, availableMenus);
          pushIfExist("BuildingInformation", menuMap, availableMenus);
          pushIfExist("LocalMapManagement", menuMap, availableMenus);
          pushIfExist("MemberManagement", menuMap, availableMenus);
          pushIfExist("MeetingManagement", menuMap, availableMenus);
          pushIfExist("MeetingManagement", menuMap, availableMenus);
          pushIfExist("Signage", menuMap, availableMenus);
          pushIfExist("CouncilManagement", menuMap, availableMenus);
          pushIfExist("DepartmentManagement", menuMap, availableMenus);
          pushIfExist("DeviceManagement", menuMap, availableMenus);
          pushIfExist("LoginUserManagement", menuMap, availableMenus);

          pushIfExist("BusManagement", menuMap, availableMenus);
          pushIfExist("StoreManagement", menuMap, availableMenus);

          pushIfExist("CMSManagement", menuMap, availableMenus);

          pushIfExist("WatcherManagement", menuMap, availableMenus);
          pushIfExist("ScheduleManagement", menuMap, availableMenus);

          break;
        case "SystemAdmin":
          pushIfExist("Home", menuMap, availableMenus);
          pushIfExist("OrganizationChart", menuMap, availableMenus);
          pushIfExist("SeatPositionChart", menuMap, availableMenus);
          pushIfExist("BuildingInformation", menuMap, availableMenus);
          pushIfExist("LocalMapManagement", menuMap, availableMenus);
          pushIfExist("MemberManagement", menuMap, availableMenus);
          pushIfExist("MeetingManagement", menuMap, availableMenus);
          pushIfExist("NoticeManagement", menuMap, availableMenus);
          pushIfExist("Signage", menuMap, availableMenus);
          pushIfExist("CouncilManagement", menuMap, availableMenus);
          pushIfExist("DepartmentManagement", menuMap, availableMenus);
          pushIfExist("DeviceManagement", menuMap, availableMenus);
          pushIfExist("LoginUserManagement", menuMap, availableMenus);
          pushIfExist("ServerManagement", menuMap, availableMenus);

          pushIfExist("BusManagement", menuMap, availableMenus);
          pushIfExist("StoreManagement", menuMap, availableMenus);

          pushIfExist("CMSManagement", menuMap, availableMenus);

          pushIfExist("WatcherManagement", menuMap, availableMenus);
          pushIfExist("ScheduleManagement", menuMap, availableMenus);
          break;
      }

      const menuTitles = availableMenus.map((it) => it.title);
      const menuIcons = availableMenus.map((it) => it.icon);
      const menuRoutes = availableMenus.map((it) => it.path);
      return { menuTitles, menuIcons, menuRoutes };
    }
    return { menuTitles: [], menuIcons: [], menuRoutes: [] };
  }, [currentUser]);

  const handleChangeMenuIndex = (index: number) => {
    const path = menuRoutes[index];
    navigate(path);
  };

  let initMenuIndex = 0;
  for (let i = 0; i < menuRoutes.length; i++) {
    const path = menuRoutes[i];
    if (path === location.pathname) {
      initMenuIndex = i;
      break;
    }
  }

  const authContext = useContext(AuthContext);

  const [isOpenLogoutDialog, setIsOpenLogoutDialog] = useState(false);

  return (
    <div
      className={`relative p-10 text-[#221e1f] flex flex-col bg-[#e8e6da] h-full ${className}`}>
      <img
        className="absolute left-[50%] translate-x-[-50%] bottom-[38px] h-[120px] w-[200px]"
        src={SITE_LOGO_IMAGE}
        alt=""
      />

      <a href="/" className="absolute left-5 top-5 h-3">
        <img className="h-3" src={title_logo} alt="" />
      </a>

      <div className="font-bold justify-start items-center w-full flex mt-[41px] space-x-5">
        <img
          className="w-[70px] shadow h-[70px] object-contain rounded-full"
          src={placePhoto}
          alt=""
        />

        <div className="flex flex-col items-start">
          <span className="text-right text-base text-black/90">
            {authContext?.user?.name}
          </span>
          <span className="text-sm font-medium text-black/50">
            {descForRole(authContext?.user?.role)}
          </span>
          <p>{authContext?.user?.deptName}</p>
        </div>
      </div>

      <ul className="mt-[40px] select-none cursor-pointer">
        {menuTitles.map((title, index) => (
          <MenuItem
            isSelected={initMenuIndex === index}
            key={index}
            title={title}
            icon={menuIcons[index]}
            onSelected={() => handleChangeMenuIndex(index)}
          />
        ))}
      </ul>

      <div className="absolute flex flex-col right-3 top-3">
        <button
          onClick={() => setIsOpenLogoutDialog(true)}
          className="text-white text-xs px-3 py-2 rounded-[10px] hover:opacity-80 active:opacity-90  bg-[#464344] ">
          로그아웃
        </button>
        <button
          onClick={() => {
            showMessageOkCancelDialog(
              dialogCtx!,
              "암호변경",
              "암호를 변경합니다.",
              () => {
                showChangePasswordDialog(
                  dialogCtx!,
                  authContext?.user!,
                  async (oldPwd, newPwd) => {
                    blockUICtx?.setBlock(true);
                    const res = await AccountApi.changePassword(
                      authContext?.user!,
                      oldPwd,
                      newPwd
                    );
                    blockUICtx?.setBlock(false);
                    if (res?.status !== 200) {
                      toast(`암호 변경에 실패하였습니다`);
                    } else {
                      toast("암호가 변경되었습니다.");
                    }
                  }
                );
              }
            );
          }}
          className="font-normal text-[10px] mt-2 text-gray-600 hover:text-pink-500 ">
          암호변경
        </button>
      </div>

      <DialogModal
        isOpen={isOpenLogoutDialog}
        title="사용자 로그아웃"
        onClose={() => setIsOpenLogoutDialog(false)}
        onOk={() => {
          setIsOpenLogoutDialog(false);
          authContext?.logout();
        }}
        onCancel={() => setIsOpenLogoutDialog(false)}>
        로그아웃 합니다?
      </DialogModal>
    </div>
  );
}

interface MenuItemProps {
  title: string;
  isSelected: boolean;
  onSelected: () => void;
  icon: string;
}

function MenuItem({ title, isSelected, onSelected, icon }: MenuItemProps) {
  return (
    <li
      className={`flex flex-row items-center py-2 px-3 text-base hover:opacity-100 hover:bg-slate-50/50 rounded-md ${
        isSelected ? "opacity-100  font-bold " : "opacity-60 font-medium"
      }`}
      onClick={() => onSelected()}>
      <img className="w-7 h-7" src={icon} alt="" />
      <span
        className={`mx-5 w-1 h-8 bg-[#221e1f] ${
          isSelected ? "opacity-100" : "opacity-0"
        }`}
      />
      {title}
    </li>
  );
}
