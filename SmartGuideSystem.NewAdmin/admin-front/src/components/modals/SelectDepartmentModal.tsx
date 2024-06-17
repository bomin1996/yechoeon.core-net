import React, { useEffect, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import NoramlListBox from "../ui/listbox/NoramlListBox";
import { ISGDepartment } from "@shares/";
import { IDialogContextData } from "@/contexts/DialogContext";
import { DeptApis } from "@/server/deptApis";

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

export default function SelectDepartmentModal({
  isOpen,
  name,
  description,
  onOk,
  onCancel,
}: Props) {
  const [departments, setDepartments] = useState<ISGDepartment[]>([]);
  const [topDeprtSelectedIndex, setTopDeprtSelectedIndex] = useState(-1);
  const [subDeprtSelectedIndex, setSubDeprtSelectedIndex] = useState(-1);

  const queryDepartmentInfos = async () => {
    try {
      // const res = await fetch("/api/TbdApi/Departments?depth=3");
      // const json = await res.json();

      const {result, error} = await DeptApis.deptList(3, "from");
      if (!error) {
        setDepartments(result);
      }
      
    } catch (exception) {
      console.log(exception);
    }
  };

  useEffect(() => {
    queryDepartmentInfos();
  }, []);

  const topDeprtNameList = departments?.map((dep) => dep.name);
  const topItem =
    departments.length > 0 && topDeprtSelectedIndex >= 0
      ? departments[topDeprtSelectedIndex]
      : undefined;
  const subDeprtNameList = topItem
    ? topItem.childDepartments?.map((d) => d.name)
    : [];
  // const subItem =
  //   ((subDeprtNameList?.length ?? 0 > 0) && topItem && subDeprtSelectedIndex >= 0 ))
  //     ? topItem?.childDepartments?[subDeprtSelectedIndex]
  //     : undefined;

  let subItem: ISGDepartment | null = null;

  if (
    topItem &&
    topItem.childDepartments &&
    topItem.childDepartments.length > 0
  ) {
    subItem = topItem.childDepartments[subDeprtSelectedIndex];
  }

  const hendleTopDeprtSelect = (title: string, index: number) => {
    setTopDeprtSelectedIndex(index);
    setSubDeprtSelectedIndex(0);
  };

  const hendleSubDeprtSelect = (title: string, index: number) => {
    setSubDeprtSelectedIndex(index);
  };

  return (
    <DialogModal
      isOpen={isOpen}
      title="층 추가"
      onOk={() => onOk(`${subItem?.deptCode}`, subItem?.name ?? "", subItem!)}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
    >
      <div className="w-full h-full flex flex-col text-[#221e1f] p-8 gap-4 ">
        {/* 1열 */}
        <p className="text-lg ">
          배치도를 작성하고자 하는 부서를 선택해주세요.
        </p>
        {/* 2열 */}
        <div className="flex flex-row gap-2 h-[300px] w-[600px] ml-10 mr-10">
          <div className="basis-1/2">
            <p className="text-sm  ">1차 부서 선택</p>
            <NoramlListBox
              titles={topDeprtNameList}
              selectedIndex={topDeprtSelectedIndex}
              onSelect={hendleTopDeprtSelect}
              className=""
            />
          </div>
          <div className="basis-1/2">
            <p className="text-sm whitespace-nowrap">2차 부서 선택</p>
            <NoramlListBox
              titles={subDeprtNameList ?? []}
              selectedIndex={subDeprtSelectedIndex}
              className=""
              onSelect={hendleSubDeprtSelect}
            />
          </div>
        </div>
      </div>
    </DialogModal>
  );
}

export function showSelectDepartmentDialog(
  ctx: IDialogContextData,
  onOk: (
    departmentCode: string,
    departmentName: string,
    depart: ISGDepartment
  ) => void,
  name?: string,
  description?: string,
  onCancel?: () => void
) {
  ctx?.pushDialog(
    <SelectDepartmentModal
      key="showSelectDepartmentDialog"
      name={name}
      description={description}
      onOk={(deptCode, deptName, department) => {
        ctx!.popDialog();
        onOk(deptCode, deptName, department);
      }}
      onCancel={() => {
        ctx!.popDialog();
        onCancel?.();
      }}
      isOpen={true}
    />
  );
}
