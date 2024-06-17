import React from "react";

// import backRedImg from "src/assets/button/color-info/red@2x.png";
// import backYellowImg from "src/assets/button/color-info/yellow@2x.png";
// import backBlueImg from "src/assets/button/color-info/blue@2x.png";
// import backGreenImg from "src/assets/button/color-info/green@2x.png";
// import backMintImg from "src/assets/button/color-info/mint@2x.png";
// import backOrangeImg from "src/assets/button/color-info/orange@2x.png";

import backRedImg from "src/assets/button/color-info/red-button-frame.svg";
import backYellowImg from "src/assets/button/color-info/yellow-button-frame.svg";
import backBlueImg from "src/assets/button/color-info/blue-button-frame.svg";
import backGreenImg from "src/assets/button/color-info/green-button-frame.svg";
import backMintImg from "src/assets/button/color-info/mint-button-frame.svg";
import backOrangeImg from "src/assets/button/color-info/orange-button-frame.svg";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { MemberCardColor } from "@shares/*";
import TeamBannerFrame from "../TeamBannerFrame";

// export type ColorInfoStyle = "yellow" | "blue" | "green" | "mint" | "orange" | "red";
interface Props {
  className?: string;
  title: string;
  colorStyle: MemberCardColor;
  onClick: () => void;
}

// export default function ColorInfoButton({
//   className,
//   title,
//   colorStyle,
//   onClick,
// }: Props) {
//   return (
//     <div
//       onClick={onClick}
//       className={`${className} w-[157px] h-[42px] relative active:scale-95`}
//     >
//       <img className="absolute left-0 top-0" src={getBackImage(colorStyle)} />
//       <div className="w-[149px] h-[34px]  absolute flex items-center">
//         <span
//           className={`font-medium ml-6 z-10 text-white/90 ${
//             title.length < 6 ? "text-[18px]" : "text-[13px]"
//           }`}
//         >
//           {title}
//         </span>
//         <ChevronRightIcon className="ml-auto stroke-white h-5 w-5 mr-1" />
//       </div>
//     </div>
//   );
// }
//w-[157px] h-[42px]
export default function ColorInfoButton({
  className,
  title,
  colorStyle,
  onClick,
}: Props) {
  return (
    <TeamBannerFrame
      onClick={onClick}
      colorStyle={colorStyle}
      className={`${className}  relative active:scale-95`}
    >
      <div className="flex h-full w-full items-center">
        <span
          className={`font-medium ml-6 z-10 text-white ${
            title.length < 10 ? "text-[24px]" : "text-[20px]"
          }`}
        >
          {title}
        </span>
        <ChevronRightIcon className="ml-auto stroke-white h-5 w-5 mr-1" />
      </div>
    </TeamBannerFrame>
  );
}

function getBackImage(colorStyle: MemberCardColor) {
  switch (colorStyle) {
    case "Blue":
      return backBlueImg;
    case "Red":
      return backRedImg;
    case "Green":
      return backGreenImg;
    case "Orange":
      return backOrangeImg;
    case "Mint":
      return backMintImg;
    case "Yellow":
      return backYellowImg;
  }
}
