import { useContext, useEffect, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import NoramlListBox from "../ui/listbox/NoramlListBox";
import { ISGDepartment } from "@shares/";
import { IDialogContextData } from "@/contexts/DialogContext";
import { DeptApis } from "@/server/deptApis";
import BlockUIContext from "@/contexts/BlockUIContext";

interface Props {
  isOpen: boolean;
  name?: string;
  description?: string;
  onCancel: () => void;
  onOk: (
    departmentCode: string,
    departmentName: string,
    depart: ISGDepartment
  ) => void;
}

export default function SelectFindDepartmentModal({
  isOpen,
  name,
  description,
  onOk,
  onCancel,
}: Props) {
  const [departments, setDepartments] = useState<ISGDepartment[]>([]);
  const [deprtSelectedIndex, setDeprtSelectedIndex] = useState(-1);
  const [inputFilter, setInputFilter] = useState("");
  const blockUICtx = useContext(BlockUIContext);

  const queryDepartmentInfos = async () => {
    blockUICtx?.setBlock(true);
    const { result, error } = await DeptApis.deptList(2, "from");
    blockUICtx?.setBlock(false);
    if (!error) {
      setDepartments(result);
    }
  };

  useEffect(() => {
    queryDepartmentInfos();
  }, []);

  const hendleDeprtSelect = (title: string, index: number) => {
    setDeprtSelectedIndex(index);
    // setInputFilter(title);
  };

  const filtedDeptList =
    inputFilter.length > 0
      ? departments.filter((d) => d.name.includes(inputFilter))
      : departments;

  const titles = filtedDeptList.map((d) => d.name);

  return (
    <DialogModal
      isOpen={isOpen}
      title="조직도 부서 검색"
      onOk={() => {
        const dept = filtedDeptList[deprtSelectedIndex];
        onOk(dept.deptCode, dept.name, dept);
      }}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
      canOk={deprtSelectedIndex !== -1}>
      <div className="w-full h-full flex flex-col text-[#221e1f] items-center ">
        {/* 1열 */}
        <p className="text-lg mb-2">부서를 선택해주세요.</p>
        {/* 2열 */}
        <div className="flex flex-col h-[430px] w-[300px] ">
          <input
            autoFocus
            type="text"
            value={inputFilter}
            onChange={(ev) => {
              setInputFilter(ev.target.value);
            }}
            className="px-3 py-1 mb-4 rounded-md text-lg focus:shadow outline-green-500/50 focus:outline"
          />
          <NoramlListBox
            titles={titles}
            selectedIndex={deprtSelectedIndex}
            onSelect={hendleDeprtSelect}
            className="h-[370px]"
          />
        </div>
      </div>
    </DialogModal>
  );
}

export function showSelectDepartmentPopup(
  ctx: IDialogContextData,
  onOk: (department: ISGDepartment) => void,
  onCancel?: () => void
): void {
  ctx?.pushDialog(
    <SelectFindDepartmentModal
      key={"showSelectDepartmentPopup"}
      isOpen={true}
      onCancel={() => {
        ctx?.popDialog();
        onCancel?.();
      }}
      onOk={(dpetCode, deptName, department) => {
        ctx?.popDialog();
        onOk(department);
      }}
    />
  );
}
