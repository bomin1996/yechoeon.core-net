import { useContext, useEffect, useState } from "react";
import DialogContext from "@/contexts/DialogContext";
import { AccountApi } from "@/server/accountApi";
import { ISGLoginUser } from "@shares/*";

import { showMessageOkCancelDialog } from "../modals";
import { showAddNewUserDialog } from "../modals/AddNewUserModal";
import TableList from "../TableList";
import { descForRole, descTime } from "@/helpers/desc-helpers";
import { showResetPasswordDialog } from "../modals/ResetPasswordModal";
import toast from "react-hot-toast";
import AuthContext from "@/contexts/AuthContext";
import BlockUIContext from "@/contexts/BlockUIContext";
import { showEditLoginUserPermission } from "../modals/EditLoginUserPermissionModal";

import 새로만들기아이콘 from "@/assets/buttons/menus/직원변경.svg";
import 삭제아이콘 from "@/assets/buttons/menus/삭제.svg";
import 수정아이콘 from "@/assets/buttons/menus/수정레드.svg";
import 암호아이콘 from "@/assets/buttons/menus/암호.svg";

import TopTitlePanel from "../TopTitlePanel";
import { ImageMenuButton } from "../ui/button";

const columnNames = [
  "loginId",
  "name",
  "role",
  "deptName",
  "lastLoggedInTime",
  "modifiedTime",
  "modifier",
  "desc",
];

const columnTitles = [
  "로그인아이디",
  "이름",
  "권한",
  "부서명",
  "마지막로그인",
  "수정일",
  "수정자",
  "설명",
];

export default function UserListMain() {
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [users, setUsers] = useState<ISGLoginUser[]>([]);
  const dialogCtx = useContext(DialogContext);
  const blockUI = useContext(BlockUIContext);
  const [searchText, setSearchText] = useState("");
  const currentUser = useContext(AuthContext)?.user!;

  const queryUserList = () => {
    blockUI?.setBlock(true);
    AccountApi.userList()
      .then((data) => {
        console.log("AccountApi.userList:", data);
        setUsers(data);
      })
      .finally(() => {
        blockUI?.setBlock(false);
      });
  };

  useEffect(() => {
    queryUserList();
  }, []);

  const handleAddNewUser = () => {
    showAddNewUserDialog(dialogCtx!, (user) => {
      // blockUI?.setBlock(true);
      // AccountApi.addUser(user)
      //   .then((newUser) => {
      //     AccountApi.userList().then((data) => setUsers(data));
      //   })
      //   .finally(() => blockUI?.setBlock(false));

      const msg = `[${user.loginId}/${user.name}] 사용자\n사용자를 추가합니다.`;

      showMessageOkCancelDialog(dialogCtx!, "사용자 추가", msg, async () => {
        blockUI?.setBlock(true);
        const { result, error } = await AccountApi.addUser(user);
        blockUI?.setBlock(false);
        if (!error) {
          setUsers([...users, result]);
          toast(`사용자추가완료`);
        } else {
          toast(`오류발생: ${error}`);
        }
      });
    });
  };

  const handleDeleteUser = () => {
    const user = filteredUserList[selectedRowIndex];
    showMessageOkCancelDialog(
      dialogCtx!,
      "사용자 삭제",
      `${user.loginId}[${user.name}] 사용자를 삭제합니다.`,
      async () => {
        // const res = await AccountApi.deleteUser(user);
        // if (res?.status === 200) {
        //   toast("삭제되었습니다.");
        //   queryUserList();
        // } else {
        //   toast("오류가 발생하였습니다.");
        // }
        blockUI?.setBlock(true);
        const { error } = await AccountApi.deleteUser(user);
        blockUI?.setBlock(false);
        if (!error) {
          const idx = users.findIndex((u) => u.loginId === user.loginId);
          users.splice(idx, 1);
          setUsers([...users]);
          toast(`삭제완료`);
        } else {
          toast(`오류발생: ${error}`);
        }
      }
    );
  };

  const handleModifyPassword = () => {
    const user = filteredUserList[selectedRowIndex];
    showResetPasswordDialog(dialogCtx!, user, async (newPwd) => {
      const msg = `[${user.loginId}/${user.name}] 사용자\n패스워드를 [${newPwd}] 변경합니다.`;

      showMessageOkCancelDialog(
        dialogCtx!,
        "사용자 패스워드 변경",
        msg,
        async () => {
          blockUI?.setBlock(true);
          const { error } = await AccountApi.resetPassword(
            user,
            newPwd
          );
          blockUI?.setBlock(false);
          if (!error) {
            const idx = users.findIndex((u) => u.loginId === user.loginId);
            users.splice(idx, 1);
            setUsers([...users]);
            toast(`패스워드변경완료`);
          } else {
            toast(`오류발생: ${error}`);
          }
        }
      );

      // const res = await AccountApi.resetPassword(user, newPwd);
      // if (res?.status === 200) {
      //   toast("패스워드가 변경되었습니다.");
      // } else {
      //   toast("오류가 발생하였습니다.");
      // }
    });
  };

  const handleModifyPermission = () => {
    const user = filteredUserList[selectedRowIndex];
    showEditLoginUserPermission(dialogCtx!, user, (editedUser) => {
      const msg = `[${user.loginId}/${user.name}] 사용자권한을 변경합니다.`;
      showMessageOkCancelDialog(
        dialogCtx!,
        "사용자 권한 변경",
        msg,
        async () => {
          blockUI?.setBlock(true);
          const { error } = await AccountApi.modifyPermission(
            editedUser
          );
          blockUI?.setBlock(false);
          if (!error) {
            toast(`권한변경완료`);
            queryUserList();
          } else {
            toast(`오류발생: ${error}`);
          }
        }
      );
    });
  };

  const filteredUserList = users?.filter(
    (u) =>
      u.loginId !== currentUser.loginId &&
      (searchText === "" ||
        u.name.includes(searchText) ||
        u.deptName?.includes(searchText))
  );

  return (
    <div className="h-full w-full relative flex flex-col text-white bg-[#231f20] pt-topMenuBarHeight">
      {/* <span className="absolute top-5 left-5 text-2xl font-bold ">
        사용자 관리
      </span> */}
      {/* <div className="h-32 bg-[#464344] flex flex-row items-end gap-2 pb-0 pl-8 pr-16 flex-shrink-0">
        <div className="flex flex-row mb-3 pl-4">
          <SearchInput2
            placeholder="로그인아이디,이름,부서명으로 검색"
            inputText={searchText}
            onChange={(text) => {
              setSearchText(text);
            }}
          />
        </div>

        <ColorButton
          className="ml-auto mb-3"
          colorStyle="delete"
          title="삭제"
          onClick={handleDeleteUser}
        />
        <ColorButton
          className="mb-3"
          colorStyle="modify"
          title="암호변경"
          onClick={handleModifyPassword}
        />
        <ColorButton
          className="mb-3"
          colorStyle="modify"
          title="권한편집"
          // onClick={() => {
          //   const user = filteredUserList[selectedRowIndex];
          //   showEditLoginUserPermission(dialogCtx!, user, (editedUser) => {

          //      UserApis.editUser(editedUser);
          //   });
          // }}
          onClick={handleModifyPermission}
        />
        <ColorButton
          className="mb-3"
          colorStyle="add"
          title="사용자추가"
          onClick={handleAddNewUser}
        />
      </div> */}

      <TopTitlePanel
        title="사용자 관리"
        className="absolute left-0 top-0 w-full h-[120px]"
        searchText={searchText}
        placeholder="로그인아이디,이름,부서명으로 검색"
        onChangedSearchText={(st) => setSearchText(st)}
      >
        <div className="flex absolute right-[32px] bottom-0 divide-x space-x-[12px] py-[12px]">
          <ImageMenuButton
            title={"권한편집"}
            imageSrc={수정아이콘}
            colorType="red"
            disabled={!filteredUserList[selectedRowIndex]}
            onClick={handleModifyPermission}
          />
          <ImageMenuButton
            title={"암호변경"}
            imageSrc={암호아이콘}
            disabled={!filteredUserList[selectedRowIndex]}
            onClick={handleModifyPassword}
          />
          <ImageMenuButton
            title={"삭제"}
            imageSrc={삭제아이콘}
            disabled={!filteredUserList[selectedRowIndex]}
            onClick={handleDeleteUser}
          />
          <ImageMenuButton
            title={"사용자추가"}
            colorType="yellow"
            imageSrc={새로만들기아이콘}
            onClick={handleAddNewUser}
          />
        </div>
      </TopTitlePanel>

      <TableList
        selectedRowIndex={selectedRowIndex}
        onSelectRow={(idx) => {
          setSelectedRowIndex(idx);
        }}
        className="w-full h-full px-[33px]  overflow-auto"
        columnNames={columnNames}
        columnTitles={columnTitles}
        rowItems={filteredUserList}
        onDoubleClickRow={(index) => console.log("인덱스", index)}
        // const columnNames = [
        //   "loginId",
        //   "name",
        //   "role",
        //   "deptName",
        //   "lastLoggedInTime",
        //   "createdTime",
        //   "modifiedTime",
        // ];

        columnsForRow={(index) => {
          return (
            <>
              <td className="pl-4 text-left ">
                {filteredUserList[index].loginId}
              </td>
              <td className="pl-4 text-left ">
                {filteredUserList[index].name}
              </td>
              <td className="pl-4 text-left ">
                {descForRole(filteredUserList[index].role)}
              </td>
              <td className="pl-4 text-left ">
                {filteredUserList[index].deptName}
              </td>
              <td className="pl-4 text-left ">
                {descTime(filteredUserList[index].lastLoggedInTime)}
              </td>

              <td className="pl-4 text-left ">
                {descTime(filteredUserList[index].modifiedTime)}
              </td>
              <td className="pl-4 text-left ">
                {filteredUserList[index].modifier}
              </td>
              <td className="pl-4 text-left ">
                {filteredUserList[index].desc}
              </td>
            </>
          );
        }}
      />
    </div>
  );
}
