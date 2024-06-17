import { useContext, useEffect, useState } from "react";
import DialogContext from "@/contexts/DialogContext";
import { ISGUser } from "@shares/ISGLoginUser";
import TableList from "../TableList";
import { UserApis } from "@/server/userApis";
import { showChangeStatusMemberPopup } from "../modals/ChangeStatusMemberModal";
import BlockUIContext from "@/contexts/BlockUIContext";
import { showEditUserDialog } from "../modals/EditMemberModal";
import { guid } from "@/helpers/guid";
import { showMessageOkCancelDialog } from "../modals";
import toast from "react-hot-toast";
import AuthContext from "@/contexts/AuthContext";
import { descTime24 } from "@/helpers/desc-helpers";
import { showSelectDepartmentPopup } from "../modals/SelectFindDepartmentModal";
import { ManageApi } from "@/server/manageApi";
import TopTitlePanel from "../TopTitlePanel";
import { ImageMenuButton } from "../ui/button";

import 직원추가아이콘 from "@/assets/buttons/menus/직원변경.svg";
import 삭제아이콘 from "@/assets/buttons/menus/삭제.svg";
import 수정아이콘 from "@/assets/buttons/menus/수정.svg";
import 인사디비동기화아이콘 from "@/assets/buttons/menus/인사디비동기화.svg";
import SimpleComboBox from "../ui/dropdown/SimpleComboBox";

const columnNames = [
  "name",
  "deptName",
  "teamName",
  "positionName",
  "workerType",
  "status",
  "modifiedTime",
  "modifier",
];

const columnTitles = [
  "이름",
  "부서",
  "팀",
  "직위",
  "근무형태",
  "상태",
  "수정일",
  "변경자",
];

// const columns: ColumnDef<ISGUser>[] = [
//   {
//     accessorKey: "name",
//     header: "이름",
//     enableSorting: true,
//   },
//   {
//     accessorKey: "deptName",
//     header: "부서",
//   },
//   {
//     accessorKey: "teamName",
//     header: "팀",
//   },
//   {
//     accessorKey: "status",
//     header: "상태",
//   },
// ];

export default function MemberList() {
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [users, setUsers] = useState<ISGUser[]>([]);
  const dialogCtx = useContext(DialogContext);
  const [searchText, setSearchText] = useState("");
  const blockUICtx = useContext(BlockUIContext);
  const authCtx = useContext(AuthContext);
  const [selectedWorkTypeIndex, SetselectedWorkTypeIndex] = useState(0);

  // const canDeleteMember =
  //   authCtx?.user?.role === "Admin" || authCtx?.user?.role === "SystemAdmin";

  useEffect(() => {
    blockUICtx?.setBlock(true);
    UserApis.allUserList()
      .then((data) => {
        //console.log("UserApis.userList:", data);
        setUsers(data);
      })
      .finally(() => blockUICtx?.setBlock(false));
  }, []);

  const handleChangeStatusUser = () => {
    showChangeStatusMemberPopup(
      dialogCtx!,
      filterdMembers[selectedRowIndex],
      (member, status) => {
        console.log(member);
        UserApis.updateUserStatus(member, status)
          .then((m) => {
            let user = filterdMembers.find((u) => u.sid === m.sid);
            if (user) {
              user.status = m.status === "일정없음" ? "" : m.status;
            }
            setUsers([...users]);
          })
          .catch((e) => console.log(e));
      }
    );
  };

  const handleEditUser = () => {
    showEditUserDialog(
      dialogCtx!,
      filterdMembers[selectedRowIndex],
      async (user) => {
        showMessageOkCancelDialog(
          dialogCtx!,
          "직원정보수정",
          `알림) ${user.name} 정보를 수정합니다.\n배치도,조직도를 업데이트해야 수정된 정보가 반영됩니다. `,
          async () => {
            blockUICtx?.setBlock(true);
            const { result, error } = await UserApis.editUser(user);
            blockUICtx?.setBlock(false);
            if (!error) {
              const idx = users.findIndex((u) => u.sid === result.sid);
              if (idx !== -1) {
                users[idx] = result;
                setUsers([...users]);
              }

              toast(`수정완료`);
            } else {
              toast(`오류발생: ${error}`);
            }
          }
        );
      }
    );
  };

  const handleAddUser = () => {
    const deptCode = authCtx?.user?.deptCode ?? "";
    const deptName = authCtx?.user?.deptName ?? "";
    const canChangeDept =
      authCtx?.user?.role === "Admin" || authCtx?.user?.role === "SystemAdmin";

    const newUser: ISGUser = {
      sid: guid(),
      name: "",
      deptCode: deptCode,
      deptName: deptName,
      deptDescription: "",
      jobDescription: "",
      useYn: true,
    };
    showEditUserDialog(
      dialogCtx!,
      newUser,
      (user) => {
        //UserApis.addUser(user);
        showMessageOkCancelDialog(
          dialogCtx!,
          "신규직원정보추가",
          `알림) ${user.name} 정보를 추가합니다.\n배치도,조직도를 업데이트해야 수정된 정보가 반영됩니다. `,
          async () => {
            blockUICtx?.setBlock(true);
            const { result, error } = await UserApis.addUser(user);
            blockUICtx?.setBlock(false);
            if (!error) {
              setUsers([...users, result]);
              toast(`추가완료`);
            } else {
              toast(`오류발생: ${error}`);
            }
          }
        );
      },
      canChangeDept
    );
  };

  const handleDeleteUser = () => {
    const selectedUser = filterdMembers[selectedRowIndex];
    if (selectedUser.createType !== "SGS") {
      toast("인사디비 사용자는 삭제할 수 없습니다.");
    } else {
      showMessageOkCancelDialog(
        dialogCtx!,
        "사용자 삭제",
        `${selectedUser.name} / ${selectedUser.deptName} 사용자 삭제?`,
        async () => {
          // toast("사용자 삭제 선택!");
          blockUICtx?.setBlock(true);
          const { result, error } = await UserApis.deleteUser(selectedUser);
          blockUICtx?.setBlock(false);
          if (!error) {
            const idx = users.findIndex((u) => u.sid === selectedUser.sid);
            users.splice(idx, 1);
            setUsers([...users]);
            toast(`삭제완료`);
          } else {
            toast(`오류발생: ${error}`);
          }
        }
      );
    }
  };

  const handleUpdateFromInsaDB = () => {
    const deptName = authCtx?.user?.deptName;
    const deptCode = authCtx?.user?.deptCode;

    if (
      authCtx?.user?.role !== "Admin" &&
      authCtx?.user?.role !== "SystemAdmin"
    ) {
      if (!deptCode) {
        toast("현재 사용자의 관련부서가 설정되어 있지 않습니다.");
        return;
      }

      showMessageOkCancelDialog(
        dialogCtx!,
        "인사디비 동기화",
        `${deptName} / [${deptCode}] 부서 동기화 진행합니다.\n알림) 업데이트 완료 후 조직도/배치도를 업데이트 하세요.`,
        async () => {
          blockUICtx?.setBlock(true);
          const { result, error } = await ManageApi.migrateDeptUsersFromInsa(
            deptCode
          );
          blockUICtx?.setBlock(false);
          if (!error) {
            toast(`업데이트완료 \n조직도 / 배치도 업데이트가 필요합니다.`);
          } else {
            toast(`오류발생: ${error}`);
          }
        }
      );
    } else {
      // Admin or SystemAdmin
      showSelectDepartmentPopup(dialogCtx!, (department) => {
        showMessageOkCancelDialog(
          dialogCtx!,
          "인사디비 동기화",
          `${department.name} / [${department.deptCode}] 부서 동기화 진행합니다.\n알림) 업데이트 완료 후 조직도/배치도를 업데이트 하세요.`,
          async () => {
            blockUICtx?.setBlock(true);

            const { result, error } = await ManageApi.migrateDeptUsersFromInsa(
              department.deptCode
            );
            blockUICtx?.setBlock(false);

            if (!error) {
              toast(`업데이트완료 \n조직도 / 배치도 업데이트가 필요합니다.`);
            } else {
              toast(`오류발생: ${error}`);
            }
          }
        );
      });
    }
  };

  // const filterdMembers = searchText
  //   ? users.filter(
  //       (m) => m.name.includes(searchText) || m.deptName.includes(searchText)
  //     )
  //   : users;

  const filterdMembers =
    searchText || selectedWorkTypeIndex !== 0
      ? users.filter((m) => {
          if (selectedWorkTypeIndex !== 0) {
            if (selectedWorkTypeIndex === 1 && m.workerType !== "1") {
              // 정규
              return false;
            } else if (selectedWorkTypeIndex === 2 && m.workerType !== "0") {
              //비정규
              return false;
            }
          }

          if (searchText === "") {
            return true;
          }

          if (m.name.includes(searchText)) {
            return true;
          } else if (m.deptName.includes(searchText)) {
            return true;
          } else {
            return false;
          }
        })
      : users;

  return (
    <div
      className="h-full w-full relative pt-topMenuBarHeight
     text-white bg-[#231f20] overflow-auto"
    >
      {/* <span className="absolute top-5 left-5 text-2xl font-bold ">
        직원 관리
      </span> */}

      {/* <div className="h-32 bg-[#464344] flex flex-row items-end gap-2 pb-0 pl-8 pr-16 flex-shrink-0">
        <div className="flex flex-row mb-3 pl-4">
          <SearchInput2
            placeholder="이름,부서명으로 검색"
            inputText={searchText}
            onChange={(text) => {
              setSearchText(text);
            }}
          />
        </div>
        <div className="flex-1"></div>
        <ColorButton
          className="ml-auto mb-3"
          colorStyle="open"
          title="상태 변경"
          onClick={handleChangeStatusUser}
        />
        <NormalColorButton
          className="ml-auto mb-3"
          colorStyle="Blue"
          title="수정"
          disable={!filterdMembers[selectedRowIndex]}
          onClick={handleEditUser}
        />
        <NormalColorButton
          className="ml-auto mb-3"
          colorStyle="Orange"
          title="추가"
          onClick={handleAddUser}
        />
        {canDeleteMember && (
          <NormalColorButton
            className="ml-auto mb-3"
            colorStyle="Red"
            title="삭제"
            disable={!filterdMembers[selectedRowIndex]}
            onClick={handleDeleteUser}
          />
        )}
        <NormalColorButton
          className="ml-auto mb-3"
          colorStyle="Green"
          title="인사디비 동기화"
          onClick={handleUpdateFromInsaDB}
        />
      </div> */}

      <TopTitlePanel
        title="직원 관리"
        className="absolute left-0 top-0 w-full h-topMenuBarHeight"
        searchText={searchText}
        placeholder="이름,부서명으로 검색"
        onChangedSearchText={(st) => setSearchText(st)}
      >
        <div className="flex items-center absolute left-[350px] bottom-0 space-x-[12px] py-[12px]">
          <span>근무형태 : </span>

          <SimpleComboBox
            className="ml-2 col-span-4 w-[120px]"
            items={["모두", "정규직", "비정규직"]}
            selectedIdx={selectedWorkTypeIndex}
            onSelectedItem={(it, index) => {
              SetselectedWorkTypeIndex(index);
            }}
          />
        </div>
        <div className="flex absolute right-[32px] bottom-0 divide-x space-x-[12px] py-[12px]">
          <ImageMenuButton
            title={"수정"}
            imageSrc={수정아이콘}
            disabled={!filterdMembers[selectedRowIndex]}
            onClick={handleEditUser}
          />
          <ImageMenuButton
            title={"상태변경"}
            imageSrc={수정아이콘}
            disabled={!filterdMembers[selectedRowIndex]}
            onClick={handleChangeStatusUser}
          />
          <ImageMenuButton
            title={"삭제"}
            imageSrc={삭제아이콘}
            disabled={!filterdMembers[selectedRowIndex]}
            onClick={handleDeleteUser}
          />
          <ImageMenuButton
            title={"추가"}
            imageSrc={직원추가아이콘}
            colorType="yellow"
            onClick={handleAddUser}
          />
          <ImageMenuButton
            title={"인사디 동기화"}
            imageSrc={인사디비동기화아이콘}
            onClick={handleUpdateFromInsaDB}
          />
        </div>
      </TopTitlePanel>

      <TableList
        selectedRowIndex={selectedRowIndex}
        onSelectRow={(idx) => {
          setSelectedRowIndex(idx);
        }}
        className="w-full h-full px-[33px] overflow-auto  "
        columnNames={columnNames}
        columnTitles={columnTitles}
        rowItems={filterdMembers}
        onDoubleClickRow={(index) => handleEditUser()}
        renderForColumn={(colData, colIndex) => {
          if (colIndex === 6) {
            return descTime24(colData);
          } else if (colIndex === 4) {
            return getWorkTypeDesc(colData);
          } else {
            return colData;
          }
        }}
      />
      {/* <DataTable
        className="w-full px-[33px]"
        columns={columns}
        data={filterdMembers}
      /> */}
    </div>
  );
}

function getWorkTypeDesc(workerType?: string) {
  if (workerType) {
    return workerType === "1" ? "정규직" : "비정규직";
  } else {
    return "-";
  }
}
