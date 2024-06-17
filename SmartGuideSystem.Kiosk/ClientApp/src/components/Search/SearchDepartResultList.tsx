import React, { FC, useState } from "react";
import { ISGDepartment, ISGOrganizationChart } from "@shares/ISGDepartment";
import MemberSearchResultItem from "./MemberSearchResultItem";
import SearchResultActionButtons from "./SearchResultActionButtons";
import TeamSearchResultItem from "./TeamSearchResultItem";

interface Props {
  // departs: Array<ISGDepartment>;
  orgCharts: Array<ISGOrganizationChart>;

  className?: string;
  onClickInfo: (orgChart: ISGOrganizationChart) => void;
  onClickOrgChart: (orgChart: ISGOrganizationChart) => void;
  onClickFloorMap: (orgChart: ISGOrganizationChart) => void;
}

const SearchDepartResultList: React.FC<Props> = ({
  // departs,
  orgCharts,
  onClickInfo,
  onClickOrgChart,
  onClickFloorMap,
  className,
}) => {
  const [selectedDepart, setSelectedDepart] = useState<ISGDepartment>();

  const handleClickDepart = (depart: ISGDepartment) => {
    setSelectedDepart(depart);
  };

  return (
    <div className={`${className} overflow-auto  scrollbar`}>
      {orgCharts && orgCharts.length > 0 && (
        <div className="grid grid-cols-2 gap-x-[17px] gap-y-[17px]">
          {orgCharts.map((orgChart) => (
            <TeamSearchResultItem
              orgChart={orgChart}
              key={orgChart.name}
              className="w-[512px] h-[148px]"
              onClick={() => onClickInfo(orgChart)}
              onClickLocationMap={onClickFloorMap}
              onClickOrgChart={onClickOrgChart}
              onClickGetDirections={onClickFloorMap}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDepartResultList;
