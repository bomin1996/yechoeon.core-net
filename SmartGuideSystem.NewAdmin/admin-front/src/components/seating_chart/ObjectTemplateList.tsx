import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import { TemplateNames } from "@/viewmodels/seating_chart/TempateNames";
import { useState } from "react";
import { ITemplateItem } from "./ITemplateItem";
import UnderLineTitleTabSegmented from "../ui/UnderLineTitleTabSegmented";

// export interface ITemplateItem {
//   templateName: string;
//   iconSrc: string;
//   title?: string;
//   groupName: string;
// }

interface Props {
  className?: string;
  viewModel: SeatingChartViewModel;
  templateList: Array<ITemplateItem>;
}

// const temps = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20,
// ];

export default observer(function ObjectTemplateList({
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
      <div className={`${className} p-4 overflow-auto grid grid-cols-1 gap-3`}>
        {filteredList.map((it, index) => (
          <ObjectTemplate
            key={it.templateName}
            tempName={it.templateName}
            iconSrc={it.iconSrc}
            title={it.title}
            isSelected={false}
            onClick={(tempName) => {
              if (tempName === "teamButton1") {
                viewModel.addTeamBannerItem();
              } else if (tempName === "teamButton2") {
                viewModel.addTeamBannerItem(TemplateNames.template_banner2);
              } else if (tempName === "title") {
                viewModel.addTitleBannerItem();
              } else if (tempName === "entrance1") {
                viewModel.addEntranceItem(tempName);
              } else if (tempName === "entrance2") {
                viewModel.addEntranceItem(tempName);
              } else if (tempName === "entrance3") {
                viewModel.addEntranceItem(tempName);
              } else if (tempName === "link1") {
                viewModel.addLinkItem(tempName);
              }
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
function ObjectTemplate({
  iconSrc,
  tempName,
  title,
  isSelected,
  onClick,
}: Props2) {
  return (
    <div className="w-full h-[200px] bg-slate-300 hover:bg-slate-400 shadow rounded-md relative">
      <img
        src={iconSrc}
        alt=""
        height={50}
        className="absolute object-contain px-[20px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-[50px]"
      />
      <CheckCircleIcon className="w-5 h-5 absolute top-1 right-1" />
      <div className="flex h-full w-full ">
        <button
          onClick={() => onClick(tempName)}
          className="ml-auto mt-auto mr-2 mb-2 text-purple-600 z-30 active:text-purple-600/80 text-xs p-1 rounded-full hover:bg-black/20 ">
          추가
        </button>
      </div>

      <span className="absolute left-[50%] translate-x-[-50%] top-[8px] text-xs font-bold">
        {title}
      </span>
    </div>
  );
}
