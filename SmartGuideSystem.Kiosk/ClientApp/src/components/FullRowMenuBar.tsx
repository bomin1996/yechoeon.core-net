import React, { ReactNode } from "react";
import useTimeAndDate from "src/hooks/useTimeAndDate";

// import searchIcon from "src/assets/icon/mainmenu/검색아이콘@2x.png";
// import newsIcon from "src/assets/icon/mainmenu/새소식@2x.png";
// import orgChartIcon from "src/assets/icon/mainmenu/조직도@2x.png";
// import firstIcon from "src/assets/icon/mainmenu/처음@2x.png";
// import floorGuideIcon from "src/assets/icon/mainmenu/청사안내도@2x.png";
// import seatingChartIcon from "src/assets/icon/mainmenu/배치도@2x.png";

import searchIcon from "src/assets/fullrowmenu/search.svg";
import firstIcon from "src/assets/fullrowmenu/home.svg";
import orgChartIcon from "src/assets/fullrowmenu/organization.svg";
import floorGuideIcon from "src/assets/fullrowmenu/buliding.svg";
import newsIcon from "src/assets/fullrowmenu/list.svg";
import seatingChartIcon from "src/assets/fullrowmenu/layout.svg";

import DateAndTimeDayperiodLabel from "./DateAndTimeDayperiodLabel";
import WeatherLabel from "./WeatherMenuLabel";
import WeatherMenuLabel from "./WeatherMenuLabel";
import AirMenuLabel from "./AirMenuLabel";
import WeatherAirBar from "./WeatherAirBar";
import { MENU_LOGO_IMAGE } from "src/const";
interface Props {
  className?: string;
  selectedIndex: number;
  onDidSelect: (index: number, title: string) => void;
  visibleSeatChart?: boolean;
  visibleOrgChart?: boolean;
  visibleNotice?: boolean;
  visibleSearch?: boolean;
  visibleFloorMap?: boolean;
  visibleHome?: boolean;
}
export default function FullRowMenuBar({
  className,
  onDidSelect,
  selectedIndex,
  visibleSeatChart = true,
  visibleOrgChart = true,
  visibleNotice = true,
  visibleSearch = true,
  visibleFloorMap = true,
  visibleHome = true,
}: Props) {
  return (
    <div
      className={`${className} h-[120px] px-[22px] flex flex-row items-center w-full `}>
      <img className=" h-[74px]" src={MENU_LOGO_IMAGE} />
      <DateAndTimeDayperiodLabel className="mr-[0px] flex-shrink-0" />

      {visibleSearch && (
        <MenuItem
          isSelected={selectedIndex === 0}
          title="검색"
          icon={searchIcon}
          onClick={() => onDidSelect(0, "검색")}
        />
      )}

      {visibleHome && (
        <MenuItem
          isSelected={selectedIndex === 1}
          title="처음으로"
          icon={firstIcon}
          onClick={() => onDidSelect(1, "처음으로")}
        />
      )}
      {visibleSeatChart && (
        <MenuItem
          isSelected={selectedIndex === 2}
          title="배치도"
          icon={seatingChartIcon}
          onClick={() => onDidSelect(2, "배치도")}
        />
      )}
      {visibleOrgChart && (
        <MenuItem
          isSelected={selectedIndex === 3}
          title="조직도"
          icon={orgChartIcon}
          onClick={() => onDidSelect(3, "조직도")}
        />
      )}
      {visibleFloorMap && (
        <MenuItem
          isSelected={selectedIndex === 4}
          title="청사안내도"
          icon={floorGuideIcon}
          onClick={() => onDidSelect(4, "청사안내도")}
        />
      )}
      {visibleNotice && (
        <MenuItem
          isSelected={selectedIndex === 5}
          title="새소식"
          icon={newsIcon}
          onClick={() => onDidSelect(5, "새소식")}
        />
      )}
      <div className="flex-1"></div>
      <WeatherAirBar className="" />
    </div>
  );
}

interface MenuItemProps {
  className?: string;
  title: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}
function MenuItem({
  className,
  title,
  icon,
  onClick,
  isSelected = false,
}: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className={`${className} mx-1 flex flex-row justify-center items-center hover:opacity-80 active:opacity-90 active:scale-95  px-4 text-[25px] space-x-[12px] `}>
      <img src={icon} className="w-[38px] h-[38px]" width={38} height={38} />
      <span
        className={` ${
          isSelected
            ? "border-b-[1px] py-[2px] border-white font-bold"
            : "font-medium"
        } leading-none`}>
        {title}
      </span>
    </div>
  );
}

// function TimeDateLabel({ className }: { className?: string }) {
//   const { timeInfo, dateInfo } = useTimeAndDate();
//   return (
//     <p className={`flex items-baseline ${className}`}>
//       <span className="font-normal text-[21px]">{dateInfo}</span>
//       <span className="font-normal text-[42px]">{timeInfo}</span>
//     </p>
//   );
// }
