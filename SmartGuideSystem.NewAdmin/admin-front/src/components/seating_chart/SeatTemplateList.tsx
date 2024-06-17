import { observer } from "mobx-react";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";
import { useState } from "react";
import RoundedTabSegmented from "../ui/RoundedTabSegmented";
import UnderLineTitleTabSegmented from "../ui/UnderLineTitleTabSegmented";
import { ITemplateItem } from "./ITemplateItem";

interface Props {
  className?: string;
  viewModel: SeatingChartViewModel;
  templateList: Array<ITemplateItem>;
}

// const temps = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20,
// ];

export default observer(function SeatTemplateList({
  className,
  viewModel,
  templateList,
}: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const groupNames = Array.from(
    new Set(templateList.map((it) => it.groupName))
  );
  const filteredList = templateList.filter(
    (it) => it.groupName === groupNames[tabIndex]
  );

  return (
    <div className="relative w-full h-full pt-[60px]">
      <UnderLineTitleTabSegmented
        className="absolute left-0 top-0 h-[60px] w-full border-b border-black/30"
        titles={groupNames}
        selectedIndex={tabIndex}
        onSelected={(idex) => setTabIndex(idex)}
      />
      <div className={`${className} p-4 overflow-auto grid grid-cols-1 gap-3 `}>
        {filteredList.map((it, index) => (
          <SeatTemplate
            key={it.templateName}
            tempName={it.templateName}
            title={it.title}
            iconSrc={it.iconSrc}
            isSelected={false}
            onClick={() => {
              const selection = viewModel.selection();
              selection.forEach((item) => {
                const mv = item as MemberSeatingPlaceViewModel;
                mv.setTemplateName(it.templateName);
                console.log("change template memeber:", it.templateName);
              });
            }}
          />
        ))}
      </div>
    </div>
  );
});

interface Props2 {
  iconSrc: string;
  tempName: string;
  title?: string;
  isSelected: boolean;
  onClick: (tempName: string) => void;
}
function SeatTemplate({
  iconSrc,
  tempName,
  title,
  isSelected,
  onClick,
}: Props2) {
  return (
    <div className="w-full h-[280px]  bg-slate-50 hover:bg-slate-400 shadow rounded-md relative">
      <img
        src={iconSrc}
        height={50}
        className="absolute px-[12px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      />
      <button
        onClick={() => onClick(tempName)}
        className="absolute bottom-1 right-2 hover:text-purple-600 z-30 active:text-purple-600/80 text-[14px]">
        적용
      </button>

      <span className="absolute left-[50%] translate-x-[-50%] top-[8px] text-xs font-bold">
        {title}
      </span>
    </div>
  );
}
