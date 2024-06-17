import React from "react";
import IconTitleInfoButton from "../ui/buttons/IconTitleInfoButton";
import { ISGSeatPosChart } from "../../../../../shares/ISGSeatPosChart";
// import { DEPART_SEARCH_ITEM_BACKIMAGE_CLASSNAME } from "src/const";
interface Props {
  chart: ISGSeatPosChart;
  onClick: (chart: ISGSeatPosChart) => void;
  className?: string;
  onClickLocationMap: (chart: ISGSeatPosChart) => void;
  onClickChart: (chart: ISGSeatPosChart) => void;
  onClickGetDirections: (chart: ISGSeatPosChart) => void;
}

const SeatPosChartSearchResultItem: React.FC<Props> = ({
  chart,
  onClick,
  onClickLocationMap,
  onClickChart,
  onClickGetDirections,
  className,
}) => {
  const depart = chart.department;
  const location = `${depart?.deptFullName}`;

  return (
    <div
      className={`${className} relative flex flex-row items-center  bg-left bg-no-repeat text-black  bg-dept-search-reaultitem`}
    >
      <div className="absolute left-[121px] h-full flex flex-col justify-center items-start ">
        <p className="text-[19px] font-[600] ">{chart.name}</p>
        <p className="text-[16px] font-[400] w-[200px] ">{location}</p>
      </div>

      <div className="absolute top-[50%] translate-y-[-50%] right-[21px] grid grid-cols-2 gap-[4px] mt-[-4px]">
        <IconTitleInfoButton
          title="상세정보"
          titleClassName="underline"
          icon="information"
          onClick={() => onClick(chart)}
        />
        <IconTitleInfoButton
          onClick={() => onClickLocationMap(chart)}
          title="위치안내"
          icon="location_map"
        />
        <IconTitleInfoButton
          onClick={() => onClickChart(chart)}
          title="조직도"
          icon="organization_chart"
        />
        <IconTitleInfoButton
          onClick={() => onClickGetDirections(chart)}
          title="길찾기"
          icon="GetDirections"
        />
      </div>
    </div>
  );
};

export default SeatPosChartSearchResultItem;
