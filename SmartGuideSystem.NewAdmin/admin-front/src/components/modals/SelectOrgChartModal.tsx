import  { useEffect, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import NoramlListBox from "../ui/listbox/NoramlListBox";
import { ISGOrganizationChart } from "@shares/";
import { IDialogContextData } from "@/contexts/DialogContext";
import { OrganizationApis } from "@/server/organizationApis";

interface Props {
  isOpen: boolean;
  name?: string;
  description?: string;
  onCancel?: () => void;
  onOk: (orgChart: ISGOrganizationChart) => void;
}

export default function SelectOrgChartModal({
  isOpen,
  name,
  description,
  onCancel,
  onOk,
}: Props) {
  //   const [departments, setDepartments] = useState<ISGDepartment[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [inputFilter, setInputFilter] = useState("");

  const hendleSelect = (title: string, index: number) => {
    setSelectedIndex(index);
  };

  //   const filtedDeptList =
  //     inputFilter.length > 0
  //       ? departments.filter((d) => d.name.includes(inputFilter))
  //       : departments;

  //   const titles = filtedDeptList.map((d) => d.name);

  const [orgCharts, setOrgCharts] = useState<ISGOrganizationChart[]>([]);

  useEffect(() => {
    OrganizationApis.orgChartList()
      .then((charts) => setOrgCharts(charts))
      .catch((exc) => {});
  }, []);

  const filteredList = orgCharts.filter((o) => o.name.includes(inputFilter));
  const titles = filteredList.map((o) => o.name);

  return (
    <DialogModal
      isOpen={isOpen}
      title="조직도 검색"
      onOk={() => {
        const chart = filteredList[selectedIndex];
        onOk(chart);
      }}
      onCancel={() => onCancel?.()}
      onClose={() => onCancel?.()}
      canOk={selectedIndex !== -1}
    >
      <div className="w-full h-full flex flex-col text-[#221e1f] items-center ">
        {/* 1열 */}
        <p className="text-lg mb-2">조직도를 선택해주세요.</p>
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
            selectedIndex={selectedIndex}
            onSelect={hendleSelect}
            className="h-[370px]"
          />
        </div>
      </div>
    </DialogModal>
  );
}

export function showSelectOrgChartPopup(
  ctx: IDialogContextData,
  onOk: (orgChart: ISGOrganizationChart) => void,
  onCancel?: () => void
): void {
  ctx?.pushDialog(
    <SelectOrgChartModal
      isOpen={true}
      onCancel={() => {
        ctx?.popDialog();
        onCancel?.();
      }}
      onOk={(orgChart) => {
        ctx?.popDialog();
        onOk(orgChart);
      }}
    />
  );
}
