import { useContext, useState } from "react";
import SimpleComboBox from "@/components/ui/dropdown/SimpleComboBox";
import DialogModal from "@/components/ui/modal/DialogModal";
import { ISGLoginUser } from "@shares/ISGDevice";
import { IDialogContextData } from "@/contexts/DialogContext";
import TitleCheckButton from "../ui/button/TitleCheckButton";
import AuthContext from "@/contexts/AuthContext";
import { managerAvailableMenus } from "@/const";

interface Props {
  loginUser: ISGLoginUser;
  onCancel?: () => void;
  onOk: (editedLoginUser: ISGLoginUser) => void;
}

export default function EditLoginUserPermissionModal({
  loginUser,
  onCancel,
  onOk,
}: Props) {
  const authCtx = useContext(AuthContext);
  const roleTitles =
    authCtx?.user?.role === "SystemAdmin"
      ? ["부서관리자", "전체부서관리자", "시스템관리자"]
      : ["부서관리자", "전체부서관리자"];

  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const isSelectedDepartmentManager = selectedRoleIndex === 0;

  const [isSelectedSignageMenu, ] = useState(
    loginUser.extraSettings?.useSignageMenu ?? false
  );
  const [isSelectedCouncilMenu, ] = useState(
    loginUser.extraSettings?.useCouncilMenu ?? false
  );

  const [useMenus, setUseMenus] = useState<Array<String>>(
    loginUser.extraSettings?.useMenus ?? []
  );

  const getRole = (index: number) => {
    switch (index) {
      case 1:
        return "Admin";
      case 2:
        return "SystemAdmin";
      case 0:
      default:
        return "DepartManager";
    }
  };

  return (
    <DialogModal
      isOpen={true}
      title={`[${loginUser.loginId} / ${loginUser.name}] 권한편집`}
      onOk={() => {
        let extraSettings;
        if (loginUser.extraSettings) {
          extraSettings = {
            ...loginUser.extraSettings,
            useSignageMenu: isSelectedSignageMenu,
            useCouncilMenu: isSelectedCouncilMenu,
            useMenus: useMenus,
          };
        } else {
          extraSettings = {
            useSignageMenu: isSelectedSignageMenu,
            useCouncilMenu: isSelectedCouncilMenu,
            useMenus: useMenus,
          };
        }
        onOk({
          ...loginUser,
          role: getRole(selectedRoleIndex),
          extraSettings: extraSettings,
        });
      }}
      onCancel={() => onCancel?.()}
      onClose={() => onCancel?.()}
    >
      <div className="w-full h-full flex flex-col  text-sm text-[#221e1f] p-8 gap-4">
        <div className="grid grid-cols-5 gap-[12px] items-center">
          <span className="font-bold text-right ">권한 선택</span>
          <SimpleComboBox
            items={roleTitles}
            selectedIdx={selectedRoleIndex}
            onSelectedItem={(name, index) => {
              setSelectedRoleIndex(index);
            }}
            className="col-span-4"
          />
        </div>

        {isSelectedDepartmentManager && (
          <div className=" flex flex-col space-y-2 ">
            {/* <TitleCheckButton
              className="border border-black"
              title="사이니지 메뉴사용"
              isSelected={isSelectedSignageMenu}
              onClick={() => setIsSelectedSignageMenu((p) => !p)}
            /> */}
            {/* <TitleCheckButton
              className="border border-black"
              title="의회설정 메뉴사용"
              isSelected={isSelectedCouncilMenu}
              onClick={() => setIsSelectedCouncilMenu((p) => !p)}
            /> */}
            {managerAvailableMenus.map((item, index) => (
              <TitleCheckButton
                key={index}
                className="text-left border border-black"
                title={item.title}
                isSelected={useMenus.includes(item.menuKey)}
                onClick={() => {
                  // const foundIndex = useMenus.findIndex(
                  //   (it) => it === item.menuKey
                  // );
                  // if (foundIndex !== -1) {
                  //   setUseMenus((p) => {
                  //     p.splice(foundIndex, 1);
                  //     return p;
                  //   });
                  // } else {
                  //   setUseMenus((p) => [...p, item.menuKey]);
                  // }

                  setUseMenus((p) => {
                    const foundIndex = p.findIndex((it) => it === item.menuKey);
                    if (foundIndex !== -1) {
                      p.splice(foundIndex, 1);
                      return [...p];
                    } else {
                      return [...p, item.menuKey];
                    }
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>
    </DialogModal>
  );
}

export function showEditLoginUserPermission(
  ctx: IDialogContextData,
  loginUser: ISGLoginUser,
  onOk: (editedLoginUser: ISGLoginUser) => void
) {
  ctx?.pushDialog(
    <EditLoginUserPermissionModal
      key={"showEditLoginUserPermission"}
      loginUser={loginUser}
      onOk={(edUser) => {
        ctx?.popDialog();
        onOk(edUser);
      }}
      onCancel={() => ctx?.popDialog()}
    />
  );
}
