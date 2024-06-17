import { useContext, useEffect, useState } from "react";
import DialogContext from "@/contexts/DialogContext";
import { ISGDepartment } from "@shares/ISGLoginUser";
import TableList from "@/components/TableList";

import BlockUIContext from "@/contexts/BlockUIContext";
import { DeptApis } from "@/server/deptApis";
import { showEditDepartmentDialog } from "@/components/modals/EditDepartmentModal";
import toast from "react-hot-toast";
import { showMessageOkCancelDialog } from "@/components/modals";
import 새로만들기아이콘 from "@/assets/buttons/menus/새로만들기.svg";
import 삭제아이콘 from "@/assets/buttons/menus/삭제.svg";
import 수정아이콘 from "@/assets/buttons/menus/수정.svg";
import TopTitlePanel from "../TopTitlePanel";
import { ImageMenuButton } from "../ui/button";

const columnNames = [
  "deptCode",
  "name",
  "deptFullName",
  "depth",
  "parentDeptCode",
  "officeTel",
  "officeFax",
  "jobDescription",
];

const columnTitles = [
  "부서코드",
  "이름",
  "전체이름",
  "레벨",
  "상위부서코드",
  "전화",
  "팩스",
  "업무",
];

export default function DeptList() {
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [depts, setDepts] = useState<ISGDepartment[]>([]);
  const dialogCtx = useContext(DialogContext);
  const [searchText, setSearchText] = useState("");
  const blockUICtx = useContext(BlockUIContext);

  const queryDeptList = async () => {
    blockUICtx?.setBlock(true);
    const { result, error } = await DeptApis.deptList();
    blockUICtx?.setBlock(false);
    if (!error) {
      setDepts(result);
    }
  };

  useEffect(() => {
    queryDeptList();
  }, []);

  const handleEditUser = () => {
    showEditDepartmentDialog(
      dialogCtx!,
      filterdDepts[selectedRowIndex],
      async (depart) => {
        showMessageOkCancelDialog(
          dialogCtx!,
          "부서정보수정",
          `알림) ${depart.name} 정보를 수정합니다.`,
          async () => {
            blockUICtx?.setBlock(true);
            const { result, error } = await DeptApis.updateDepartment(depart);
            blockUICtx?.setBlock(false);
            if (!error) {
              toast(`수정완료`);
              queryDeptList();
            } else {
              toast(`오류발생: ${error}`);
            }
          }
        );
      }
    );
  };

  const handleAddUser = () => {
    const dept: ISGDepartment = {
      deptCode: "",
      name: "",
      deptFullName: "",
      jobDescription: "",
      depth: 4,
      useYn: true,
    };

    showEditDepartmentDialog(dialogCtx!, dept, (depart) => {
      showMessageOkCancelDialog(
        dialogCtx!,
        "신규부서추가",
        `알림) ${depart.name} [${depart.deptCode}] 부서 정보를 추가합니다. `,
        async () => {
          blockUICtx?.setBlock(true);
          const {  error } = await DeptApis.addDepartment(depart);
          blockUICtx?.setBlock(false);
          if (!error) {
            toast(`추가완료`);
            queryDeptList();
          } else {
            toast(`오류발생: ${error}`);
          }
        }
      );
    });
  };

  const handleDeleteDept = () => {
    const selectedDept = filterdDepts[selectedRowIndex];
    showMessageOkCancelDialog(
      dialogCtx!,
      "부서 삭제",
      `${selectedDept.name} / [${selectedDept.deptCode}] 부서 삭제?`,
      async () => {
        blockUICtx?.setBlock(true);
        const {  error } = await DeptApis.removeDepartment(selectedDept);
        blockUICtx?.setBlock(false);
        if (!error) {
          toast(`삭제완료`);
          queryDeptList();
        } else {
          toast(`오류발생: ${error}`);
        }
      }
    );
  };

  const filterdDepts = searchText
    ? depts.filter(
        (m) => m.name.includes(searchText) || m.deptCode.includes(searchText)
      )
    : depts;

  return (
    <div
      className="h-full w-full relative pt-topMenuBarHeight
     text-white bg-[#231f20] "
    >
      {/* <span className="absolute top-5 left-5 text-2xl font-bold ">
        부서 관리
      </span> */}
      {/* <div className="h-32 bg-[#464344] flex flex-row items-end gap-2 pb-0 pl-8 pr-16 flex-shrink-0">
        <div className="flex flex-row mb-3 pl-4">
          <SearchInput2
            placeholder="부서코드, 부서명으로 검색"
            inputText={searchText}
            onChange={(text) => {
              setSearchText(text);
            }}
          />
        </div>
        <div className="flex-1"></div>

        <ColorButton
          className="ml-auto mb-3"
          colorStyle="modify"
          title="수정"
          onClick={handleEditUser}
        />
        <ColorButton
          className="ml-auto mb-3"
          colorStyle="save"
          title="추가"
          onClick={handleAddUser}
        />
        <ColorButton
          className="ml-auto mb-3"
          colorStyle="delete"
          title="삭제"
          onClick={handleDeleteDept}
        />
      </div> */}

      <TopTitlePanel
        title="부서 관리"
        className="absolute left-0 top-0 w-full h-topMenuBarHeight"
        searchText={searchText}
        placeholder="부서코드, 부서명으로 검색"
        onChangedSearchText={(st) => setSearchText(st)}
      >
        <div className="flex absolute right-[32px] bottom-0 divide-x space-x-[12px] py-[12px]">
          <ImageMenuButton
            title={"수정"}
            imageSrc={수정아이콘}
            disabled={!filterdDepts[selectedRowIndex]}
            onClick={handleEditUser}
          />
          <ImageMenuButton
            title={"삭제"}
            imageSrc={삭제아이콘}
            disabled={!filterdDepts[selectedRowIndex]}
            onClick={handleDeleteDept}
          />
          <ImageMenuButton
            title={"새로만들기"}
            colorType="yellow"
            onClick={handleAddUser}
            imageSrc={새로만들기아이콘}
          />
        </div>
      </TopTitlePanel>

      <TableList
        selectedRowIndex={selectedRowIndex}
        onSelectRow={(idx) => {
          setSelectedRowIndex(idx);
        }}
        className="w-full h-full px-[33px] overflow-auto "
        columnNames={columnNames}
        columnTitles={columnTitles}
        rowItems={filterdDepts}
        onDoubleClickRow={(index) => handleEditUser()}
      />
    </div>
  );
}
