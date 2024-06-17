import { observer } from "mobx-react";
import React from "react";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { SeatChartLinkPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/SeatChartLinkPlaceViewModel";
import ChartNode from "./ChartNode";

interface Props {
  item: SeatChartLinkPlaceViewModel;
  className?: string;
  onSelectItem: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: BaseSeatingPlaceViewModel
  ) => void;
}

export default observer(function SeatChartLinkPlaceHolder({
  item,
  className,
  onSelectItem,
}: Props) {
  let cn1 = "bg-[#EAEAEA]";

  switch (item.color) {
    case "Blue":
      cn1 = "bg-[#607FBD]";
      break;
    case "Yellow":
      cn1 = "bg-[#FCB004]";
      break;
    case "Mint":
      cn1 = "bg-[#7FBFC7]";
      break;
    case "Red":
      cn1 = "bg-[#FF3F5E]";
      break;
    case "Orange":
      cn1 = "bg-[#FD865B]";
      break;
    case "Green":
      cn1 = "bg-[#60BD9B]";
      break;
  }

  return (
    <ChartNode
      x={item.posX}
      y={item.posY}
      width={item.width}
      height={item.height}
      isSelected={item.isSelected}
    >
      <div
        className={`w-full h-full flex items-center text-[36px] text-white font-bold px-6 space-x-4 rounded-full shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] ${cn1}`}
        onMouseDown={(ev) => onSelectItem(ev, item)}
      >
        <svg
          width="49"
          height="49"
          viewBox="0 0 49 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.4826 48.2934C25.5965 48.2934 26.5378 47.3364 26.5378 46.2382C26.5378 45.14 25.5808 44.183 24.4826 44.183C13.5635 44.183 4.68393 35.3191 4.68393 24.3843C4.68393 13.4496 13.5635 4.58564 24.4826 4.58564C35.4017 4.58564 44.2813 13.4496 44.2813 24.3843C44.2813 29.4517 42.383 34.3621 38.9002 38.0018C38.1158 38.7862 38.1158 40.057 38.9002 40.8571C39.6846 41.6415 40.9554 41.6415 41.7555 40.8571C45.8658 36.4173 48.2505 30.7224 48.2505 24.5412C48.2348 11.3944 37.6295 0.789062 24.4826 0.789062C11.3358 0.789062 0.730469 11.3944 0.730469 24.5412C0.730469 37.6881 11.4927 48.2934 24.4826 48.2934Z"
            fill="white"
          />
          <path
            d="M24.4839 8.71143C23.37 8.71143 22.4287 9.66841 22.4287 10.7666V28.667C22.4287 29.7809 23.3857 30.7222 24.4839 30.7222C25.5821 30.7222 26.5391 29.7652 26.5391 28.667V10.7666C26.5391 9.65273 25.5821 8.71143 24.4839 8.71143Z"
            fill="white"
          />
        </svg>
        <span>{item.title}</span>
      </div>
    </ChartNode>
  );
});
