import { useState } from "react";
import NoramlListBox from "@/components/ui/listbox/NoramlListBox";
import { IAddNewOrgChartProps } from "@/types/dummy/dummy";

interface Props {
  addNewOrgChartProps?: IAddNewOrgChartProps;
}

interface QueryProps {
  topDeprtList: string[];
  subDeprtList: string[];
}

function AddNewOrgChart({ addNewOrgChartProps }: Props) {
  const [topDeprtSelectedIndex, setTopDeprtSelectedIndex] = useState(0);
  const [subDeprtSelectedIndex, setSubDeprtSelectedIndex] = useState(0);

  const result = queryListItems();

  const topDeprtList = result.topDeprtList;
  const subDeprtList = result.subDeprtList;

  function queryListItems(): QueryProps {
    const bl: string[] = [];
    const dl: string[] = [];

    addNewOrgChartProps?.topDeprts.forEach((f) => {
      bl.push(f.name);
    });

    addNewOrgChartProps?.topDeprts[topDeprtSelectedIndex].departs.forEach(
      (t) => {
        dl.push(t);
      }
    );

    return { topDeprtList: bl, subDeprtList: dl };
  }

  const hendleTopDeprtSelect = (title: string, index: number) => {
    setTopDeprtSelectedIndex(index);
    setSubDeprtSelectedIndex(0);
  };

  const hendleSubDeprtSelect = (title: string, index: number) => {
    setSubDeprtSelectedIndex(index);
  };

  return (
    <div className="w-full h-full flex flex-col text-[#221e1f] p-8 gap-4 ">
      {/* 1열 */}
      <p className="text-lg ">배치도를 작성하고자 하는 부서를 선택해주세요.</p>
      {/* 2열 */}
      <div className="flex flex-row gap-2 h-[300px] w-[600px] ml-10 mr-10">
        <div className="basis-1/2">
          <p className="text-sm  ">1차 부서 선택</p>
          <NoramlListBox
            titles={topDeprtList}
            selectedIndex={topDeprtSelectedIndex}
            onSelect={hendleTopDeprtSelect}
            className=""
          />
        </div>
        <div className="basis-1/2">
          <p className="text-sm whitespace-nowrap">2차 부서 선택</p>
          <NoramlListBox
            titles={subDeprtList}
            selectedIndex={subDeprtSelectedIndex}
            className=""
            onSelect={hendleSubDeprtSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default AddNewOrgChart;
