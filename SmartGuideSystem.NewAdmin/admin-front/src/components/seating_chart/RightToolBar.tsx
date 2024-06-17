import { ReactNode, useState } from "react";
import {
  IdentificationIcon,
  AdjustmentsHorizontalIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import SeatTemplateList from "./SeatTemplateList";
import SeatProptyBar from "./SeatPropertyBar";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";

import teamLeaderIcon from "@/assets/seat_chart/templates/leader2.png";
import leaderIcon from "@/assets/seat_chart/templates/leader1.png";
import userIcon from "@/assets/seat_chart/templates/member.png";

import member_style1_member_icon from "@/assets/seat_chart/templates/member_style1_member.png";
import member_style1_leader1_icon from "@/assets/seat_chart/templates/member_style1_leader1.png";
import member_style1_leader2_icon from "@/assets/seat_chart/templates/member_style1_leader2.png";

import member_style2_member_icon from "@/assets/seat_chart/templates/member_style2_member.png";
import member_style2_leader1_icon from "@/assets/seat_chart/templates/member_style2_leader1.png";
import member_style2_leader2_icon from "@/assets/seat_chart/templates/member_style2_leader2.png";

import teamButtonIcon from "@/assets/seat_chart/templates/팀박스-노랑.png";
import teambannerIcon from "@/assets/seat_chart/templates/teambanner2.svg";

import titleIcon from "@/assets/seat_chart/templates/기업통상과.svg";
import entranceIcon1 from "@/assets/seat_chart/templates/출입문_left.svg";
import entranceIcon2 from "@/assets/seat_chart/templates/출입문_bottom.svg";
import entranceIcon3 from "@/assets/seat_chart/templates/출입문_right.svg";

import linkIcon1 from "@/assets/seat_chart/templates/Link1Temp.png";

import ObjectTemplateList from "./ObjectTemplateList";
import { TemplateNames } from "@/viewmodels/seating_chart/TempateNames";
import ExchangeNodePosition from "./ExchangeNodePosition";
import { observer } from "mobx-react";
import { ITemplateItem } from "./ITemplateItem";

// export interface ITemplateItem {
//   templateName: string;
//   iconSrc: string;
//   title?: string;
//   groupName: string;
// }

interface Props {
  viewModel: SeatingChartViewModel;
  className?: string;
}

export default observer(function RightToolBar({ className, viewModel }: Props) {
  const [menuIndex, setMenuIndex] = useState(0);

  return (
    <div className={`${className} flex p-0 `}>
      <div className="flex-shrink-0 flex flex-col space-y-2 p-2 border-r border-white/5 ">
        <MenuItem
          icon={<IdentificationIcon className="h-6 w-6" />}
          title="템플릿"
          isSelected={menuIndex === 0}
          onSelect={() => setMenuIndex(0)}
        />
        <MenuItem
          icon={<PuzzlePieceIcon className="h-6 w-6" />}
          title="개체"
          isSelected={menuIndex === 1}
          onSelect={() => setMenuIndex(1)}
        />
        <MenuItem
          icon={<AdjustmentsHorizontalIcon className="h-6 w-6" />}
          title="속성"
          isSelected={menuIndex === 2}
          onSelect={() => setMenuIndex(2)}
        />
        {/* <MenuItem
          icon={<ArrowsUpDownIcon className="h-6 w-6" />}
          title="위치교환"
          isSelected={menuIndex === 3}
          onSelect={() => setMenuIndex(3)}
        /> */}
      </div>

      <div className="flex-1 h-full  p-2 overflow-auto">
        {/* {selectedMenuComponent} */}
        <RenderPanel menuIndex={menuIndex} viewModel={viewModel} />
      </div>
    </div>
  );
});

interface MenuItemProps {
  className?: string;
  title: string;
  icon: ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}
function MenuItem({
  className,
  title,
  icon,
  isSelected,
  onSelect,
}: MenuItemProps) {
  return (
    <div
      onClick={onSelect}
      className={`${className} flex flex-col justify-center items-center w-12 h-12 rounded-sm select-none cursor-pointer hover:text-black hover:stroke-black/50 text-[10px] ${
        isSelected
          ? "text-balck stroke-balck bg-black/5"
          : "text-balck/70 stroke-balck/70"
      }`}>
      {icon}
      <p className="text-[8px]">{title}</p>
    </div>
  );
}

const seatTempList: Array<ITemplateItem> = [
  {
    iconSrc: userIcon,
    templateName: TemplateNames.template_member1,
    title: "직원",
    groupName: "주무관",
  },
  {
    iconSrc: leaderIcon,
    templateName: TemplateNames.template_leader_horizontal,
    title: "팀장(계장)",
    groupName: "팀장",
  },
  {
    iconSrc: teamLeaderIcon,
    templateName: TemplateNames.template_leader_vertical,
    title: "과장",
    groupName: "부서장",
  },
  {
    iconSrc: member_style1_member_icon,
    templateName: TemplateNames.template_member_style1_member,
    title: "직원",
    groupName: "주무관",
  },
  {
    iconSrc: member_style1_leader1_icon,
    templateName: TemplateNames.template_member_style1_leader1,
    title: "팀장(계장)",
    groupName: "팀장",
  },
  {
    iconSrc: member_style1_leader2_icon,
    templateName: TemplateNames.template_member_style1_leader2,
    title: "과장",
    groupName: "부서장",
  },
  {
    iconSrc: member_style2_member_icon,
    templateName: TemplateNames.template_member_style2_member,
    title: "직원",
    groupName: "주무관",
  },
  {
    iconSrc: member_style2_leader1_icon,
    templateName: TemplateNames.template_member_style2_leader1,
    title: "팀장(계장)",
    groupName: "팀장",
  },
  {
    iconSrc: member_style2_leader2_icon,
    templateName: TemplateNames.template_member_style2_leader2,
    title: "과장",
    groupName: "부서장",
  },
];

const objectTempList: Array<ITemplateItem> = [
  {
    iconSrc: teamButtonIcon,
    templateName: "teamButton1",
    title: "팀버튼",
    groupName: "버튼류",
  },
  {
    iconSrc: teambannerIcon,
    templateName: "teamButton2",
    title: "팀배너",
    groupName: "버튼류",
  },
  {
    iconSrc: titleIcon,
    templateName: "title",
    title: "부서타이틀",
    groupName: "부서명",
  },
  {
    iconSrc: entranceIcon1,
    templateName: "entrance1",
    title: "출입문1",
    groupName: "출입문",
  },
  {
    iconSrc: entranceIcon2,
    templateName: "entrance2",
    title: "출입문2",
    groupName: "출입문",
  },
  {
    iconSrc: entranceIcon3,
    templateName: "entrance3",
    title: "출입문3",
    groupName: "출입문",
  },
  {
    iconSrc: linkIcon1,
    templateName: "link1",
    title: "부서링크",
    groupName: "버튼류",
  },
];

const RenderPanel = observer(
  ({
    menuIndex,
    viewModel,
  }: {
    menuIndex: number;
    viewModel: SeatingChartViewModel;
  }) => {
    switch (menuIndex) {
      case 0:
        return (
          <SeatTemplateList viewModel={viewModel} templateList={seatTempList} />
        );
      case 1:
        return (
          <ObjectTemplateList
            viewModel={viewModel}
            templateList={objectTempList}
          />
        );
      case 2:
        return <SeatProptyBar viewModel={viewModel} />;
      case 3:
        return (
          <ExchangeNodePosition
            className="w-[240px]"
            // srcItems={viewModel.placeItems
            //   .filter((m) => m.isSelected)
            //   .sort((a, b) => a.posY - b.posY)}
            viewModel={viewModel}
          />
        );
    }

    return null;
  }
);
