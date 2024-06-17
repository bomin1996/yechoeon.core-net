import React from "react";

import iconAdministration from "src/assets/icon/floor-info/행정동.svg";
import iconAssembly from "src/assets/icon/floor-info/의회동아이콘.svg";
import iconNews from "src/assets/icon/floor-info/진주소식아이콘.svg";
import iconConf from "src/assets/icon/floor-info/회의아이콘.svg";
import iconWatcher from "src/assets/icon/icon-watcher.svg";
import iconSchedule from "src/assets/icon/icon-schedule.svg";

interface Props {
  className?: string;
  title: string;
  icon: "행정동" | "의회동" | "진주소식" | "회의일정" | "당직" | "일정";
}

export default function IconHeaderTitleLabel({
  title,
  icon,
  className,
}: Props) {
  let src = iconAdministration;
  let colorClass = "";
  switch (icon) {
    case "행정동":
      src = iconAdministration;
      colorClass = "bg-[#2BC7A8]";
      break;
    case "의회동":
      src = iconAssembly;
      colorClass = "bg-[#FCB004;]";
      break;
    case "진주소식":
      src = iconNews;
      colorClass = "bg-[#FF3F5E]";
      break;
    case "회의일정":
      src = iconConf;
      colorClass = "bg-[#00589B]";
      break;
    case "당직":
      src = iconSchedule;
      colorClass = "bg-[#FF3F5E]";
      break;
    case "일정":
      src = iconWatcher;
      colorClass = "bg-[#00589B]";
      break;
  }

  return (
    <div className={`flex items-center text-[32px] font-[500] ${className}`}>
      <div className={`w-[12px] h-[27px] mr-[12px] ${colorClass}`}></div>
      <img
        width={40}
        height={40}
        className="w-[40px] h-[40px] mr-[15px]"
        src={src}
      />
      <span>{title}</span>
    </div>
  );
}
