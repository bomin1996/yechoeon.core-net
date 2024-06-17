import { ReactNode, useState } from "react";
import {
  UsersIcon,
  Bars3Icon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import { ISGDepartment, ISGUser } from "@shares/*";
import MemberListPanel from "./MemberListPanel";
import NodeListPanel from "./NodeListPanel";
import SeatPosChartInfo from "./SeatPosChartInfo";
import ScreenListPanel from "./ScreenListPanel";

interface Props {
  className?: string;
  viewModel: SeatingChartViewModel;
  depart: ISGDepartment;
  teamUsers?: Map<string, Array<ISGUser>>;
}

export default function LeftToolBar({
  className,
  viewModel,
  depart,
  teamUsers,
}: Props) {
  const [menuIndex, setMenuIndex] = useState(0);

  // const selectedMenuComponent = getMenuComponent(menuIndex, viewModel);

  return (
    <div className={`${className} flex p-0 `}>
      <div className="flex-shrink-0 flex flex-col space-y-2 p-2 border-r border-white/5 ">
        <MenuItem
          icon={<UsersIcon className="h-6 w-6" />}
          title="팀유저"
          isSelected={menuIndex === 0}
          onSelect={() => setMenuIndex(0)}
        />
        <MenuItem
          icon={<Bars3Icon className="h-6 w-6" />}
          title="리스트"
          isSelected={menuIndex === 1}
          onSelect={() => setMenuIndex(1)}
        />

        <MenuItem
          icon={<AdjustmentsHorizontalIcon className="h-6 w-6" />}
          title="정보"
          isSelected={menuIndex === 2}
          onSelect={() => setMenuIndex(2)}
        />
        {/* <MenuItem
          icon={<ComputerDesktopIcon className="h-6 w-6" />}
          title="화면"
          isSelected={menuIndex === 3}
          onSelect={() => setMenuIndex(3)}
        /> */}
      </div>

      <div className="flex-1 h-full  p-2 overflow-auto">
        {renderPanel(menuIndex, viewModel, depart, teamUsers)}
      </div>
    </div>
  );
}

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
      className={`${className} flex flex-col justify-center items-center w-12 h-12 rounded-sm select-none cursor-pointer hover:text-white hover:stroke-white text-[10px] ${
        isSelected
          ? "text-white stroke-white bg-white/5"
          : "text-white/70 stroke-white/70"
      }`}
    >
      {icon}
      <p className="text-[8px]">{title}</p>
    </div>
  );
}

function renderPanel(
  menuIndex: number,
  viewModel: SeatingChartViewModel,
  depart: ISGDepartment,
  teamUsers?: Map<string, Array<ISGUser>>
) {
  switch (menuIndex) {
    case 0:
      return (
        <MemberListPanel
          viewModel={viewModel}
          depart={depart}
          className=""
          teamUsers={teamUsers}
        />
      );
    case 1:
      return <NodeListPanel viewModel={viewModel} className="h-full w-full" />;
    case 2:
      return <SeatPosChartInfo viewModel={viewModel} className="m-2" />;
    case 3:
      return <ScreenListPanel viewModel={viewModel} className="" />;
  }
}
