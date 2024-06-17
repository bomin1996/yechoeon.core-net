import React from "react";
import { ISGOrganizationChart } from "@shares/ISGDepartment";
import IconTitleInfoButton from "../ui/buttons/IconTitleInfoButton";
interface Props {
  orgChart: ISGOrganizationChart;
  onClick: (orgChart: ISGOrganizationChart) => void;
  className?: string;
  onClickLocationMap: (orgChart: ISGOrganizationChart) => void;
  onClickOrgChart: (orgChart: ISGOrganizationChart) => void;
  onClickGetDirections: (orgChart: ISGOrganizationChart) => void;
}

const TeamSearchResultItem: React.FC<Props> = ({
  orgChart,
  onClick,
  onClickLocationMap,
  onClickOrgChart,
  onClickGetDirections,
  className,
}) => {
  const depart = orgChart.department;
  const location = `${depart?.deptFullName}`;

  return (
    <div
      className={`${className} relative flex flex-row items-center  bg-left bg-no-repeat text-black  bg-[url('assets/frame/search/SearchDeptCard2.svg')]`}
    >
      <div className="absolute left-[121px] h-full flex flex-col justify-center items-start ">
        <p className="text-[19px] font-[600] ">{orgChart.name}</p>
        <p className="text-[16px] font-[400] w-[200px] ">{location}</p>
      </div>

      <div className="absolute top-[50%] translate-y-[-50%] right-[21px] grid grid-cols-2 gap-[4px] mt-[-4px]">
        <IconTitleInfoButton
          title="상세정보"
          titleClassName="underline"
          icon="information"
          onClick={() => onClick(orgChart)}
        />
        <IconTitleInfoButton
          onClick={() => onClickLocationMap(orgChart)}
          title="위치안내"
          icon="location_map"
        />
        <IconTitleInfoButton
          onClick={() => onClickOrgChart(orgChart)}
          title="조직도"
          icon="organization_chart"
        />
        {/* <IconTitleInfoButton
          onClick={() => onClickGetDirections(orgChart)}
          title="길찾기"
          icon="GetDirections"
        /> */}
      </div>
    </div>
  );
};

export default TeamSearchResultItem;
