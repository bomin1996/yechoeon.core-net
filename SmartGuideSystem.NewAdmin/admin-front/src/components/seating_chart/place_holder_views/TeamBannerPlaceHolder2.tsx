import { observer } from "mobx-react";
import React from "react";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { TeamBannerPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/TeamBannerPlaceViewModel";
import ChartNode from "./ChartNode";

interface Props {
  item: TeamBannerPlaceViewModel;
  className?: string;
  onSelectItem: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: BaseSeatingPlaceViewModel
  ) => void;
}
export default observer(function TeamBannerPlaceHolder2({
  item,
  className,
  onSelectItem,
}: Props) {
  let cn1 = "bg-red-600";
  let cn2 = "bg-red-400";

  switch (item.color) {
    case "Blue":
      cn1 = "fill-[#607FBD]";
      cn2 = "text-[#607FBD]";
      break;
    case "Yellow":
      cn1 = "fill-[#FCB004]";
      cn2 = "text-[#FCB004]";
      break;
    case "Mint":
      cn1 = "fill-[#7FBFC7]";
      cn2 = "text-[#7FBFC7]";
      break;
    case "Red":
      cn1 = "fill-[#FF3F5E]";
      cn2 = "text-[#FF3F5E]";
      break;
    case "Orange":
      cn1 = "fill-[#FD865B]";
      cn2 = "text-[#FD865B]";
      break;
    case "Green":
      cn1 = "fill-[#60BD9B]";
      cn2 = "text-[#60BD9B]";
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
        className={`h-full flex flex-row items-center justify-start space-x-2 text-[18px] font-[700] ${cn2}`}
        onMouseDown={(ev) => onSelectItem(ev, item)}
      >
        <svg
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${cn1}`}
        >
          <path d="M14.321 0.248776C17.8354 3.0339 19.3948 7.30834 18.2196 11.7791C17.3529 15.0775 15.126 17.3045 12.8205 18.5498C10.2064 19.9634 7.63447 20.2074 5.25603 19.6549C4.08645 19.3828 3.8172 19.2314 3.15527 18.9649C4.25754 19.6857 5.42712 20.3084 7.01462 20.687C10.0466 21.4078 13.2103 20.8749 15.7318 19.2426C18.0008 17.7757 19.8912 15.2037 20.441 12.4635C21.417 7.59723 19.0779 2.25979 14.321 0.245972V0.248776Z" />
          <path d="M17.4093 9.63906C17.4093 9.63906 14.8514 8.91544 12.0719 10.8058C12.0719 10.8058 11.1828 11.3079 9.29238 13.5882C9.29238 13.5882 7.14674 16.7098 3.78384 15.2093C3.78384 15.2093 1.82331 14.4773 0.78836 12.3036C0.129242 10.9208 -0.454147 8.84532 0.507884 6.22007C0.507884 6.22007 1.10249 4.39137 2.82742 2.9946C4.17089 1.90916 6.46518 0.846158 9.26713 1.44638C9.26713 1.44638 12.2822 1.96526 14.0156 4.63538C14.0156 4.63538 10.6667 1.70722 6.23239 3.41251C6.23239 3.41251 1.09127 5.15146 1.54003 11.3191C1.54003 11.3191 1.71393 14.9232 4.49344 14.7521C4.49344 14.7521 5.83411 14.8755 7.37392 12.6205C7.37392 12.6205 8.73423 10.6404 11.2361 9.75125C11.2361 9.75125 12.8488 9.3053 13.2948 9.3053C13.2948 9.3053 11.3763 9.15945 9.34847 10.2505C9.34847 10.2505 7.8339 10.8816 6.43713 12.8477C6.43713 12.8477 5.27597 14.6624 3.74457 14.1519C3.74457 14.1519 4.5299 10.8844 7.73574 9.3053C7.73574 9.3053 12.1897 6.85114 17.4093 9.63906Z" />
        </svg>
        <span className="text-[20px] underline underline-offset-3">
          {item.title}
        </span>
      </div>
      {/* <TeamBannerFrame
        style={{ width: `${item.width}px`, height: `${item.height}px` }}
        colorStyle={item.color}
        onMouseDown={(ev) => onSelectItem(ev, item)}
        className={`${className} relative flex flex-col border-black hover:bg-purple-600/30 select-none hover:border-dashed hover:border-2 ${
          item.isSelected ? "bg-opacity-50 border-[2px]" : " "
        }`}
      >
        <div
          className={`w-full h-full flex font-[500] text-white ${
            item.title.length < 6 ? "text-[18px]" : "text-[13px]"
          }`}
        >
          <span className="m-auto">{item.title}</span>
        </div>
       
      </TeamBannerFrame> */}
    </ChartNode>
  );
});
