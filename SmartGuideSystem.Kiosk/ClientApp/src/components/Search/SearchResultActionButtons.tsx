import React from "react";
import PrimaryIconTitleButton from "../ui/buttons/PrimaryIconTitleButton";
import infoIcon from "src/assets/icon/icon-info-00.svg";
import orgIcon from "src/assets/icon/icon-chart-00.svg";
import floorMapIcon from "src/assets/icon/icon-rocation-00.svg";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface Props {
  className?: string;
  onClickInfo: () => void;
  onClickOrgChart: () => void;
  onClickGuideMap: () => void;
}
export default function SearchResultActionButtons({
  onClickInfo,
  onClickOrgChart,
  onClickGuideMap,
  className,
}: Props) {
  return (
    <div className={`${className} flex items-center space-x-[10px]`}>
      <PrimaryIconTitleButton
        icon={infoIcon}
        title="상세정보"
        
        onClick={onClickInfo}
      />
      <PrimaryIconTitleButton
        icon={orgIcon}
        title="조직도"
        onClick={onClickOrgChart}
      />
      <PrimaryIconTitleButton
        icon={floorMapIcon}
        title="위치안내"
        onClick={onClickGuideMap}
      />
      <ChevronRightIcon className="px-[10px] w-[68px] h-[48px] fill-white" />
    </div>
  );
}
