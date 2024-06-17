// import { MemberCardColor } from "@shares/*";
import { observer } from "mobx-react";
import React from "react";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";
import { LeaderCardLayout } from "./ProfileCardLayout";
import ChartNode from "./ChartNode";
import ProfileImage from "@/components/ui/ProfileImage";
import placeHolder from "@/assets/user-photo-placeholder.svg";
import { ServerConsts } from "@/helpers/serverConsts";
// import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { selectString } from "@/helpers/desc-helpers";

interface Props {
  item: MemberSeatingPlaceViewModel;
  className?: string;
  onSelectItem: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: BaseSeatingPlaceViewModel
  ) => void;
}

function renderContent(item: MemberSeatingPlaceViewModel, photoPath?: string) {
  let cn = "";
  if (item.updateStatus === "Updated") {
    cn = "text-red-500";
  } else if (item.updateStatus === "Deleted") {
    cn = "line-through text-red-500";
  }

  const profileGrade = selectString(
    item.member.profileGrade,
    item.member.positionName,
    "주무관"
  );

  const profileJobdescription = selectString(
    item.member.profileJobDescription,
    item.member.jobDescription
  );

  switch (item.size) {
    case "Large":
      return (
        <>
          <div
            className={`${cn} absolute left-[115px] top-[50%] translate-y-[-50%]`}
          >
            <div className="font-[500] text-[22px]">
              <span className="font-[500] text-[27px]">{item.member.name}</span>
              <span className="font-[500] text-[12px]">{profileGrade}</span>
            </div>
            <div className="font-[300] text-[11px] truncate h-[30px] w-[110px] whitespace-pre-wrap">
              {profileJobdescription}
            </div>
          </div>
          <ProfileImage
            className="absolute left-[10px] top-[11px] h-[92px] rounded-[20px] flex-shrink-0"
            src={photoPath}
            placeholder={placeHolder}
          />
        </>
      );
    case "Medium":
      return (
        <>
          <div
            className={`${cn} absolute left-[99px] top-[50%] translate-y-[-50%]`}
          >
            <div className="font-[500] text-[22px]">
              <span className="font-[500] text-[27px]">{item.member.name}</span>
              <span className="font-[500] text-[12px]">{profileGrade}</span>
            </div>
            <div className="font-[300] text-[11px] truncate h-[30px] w-[110px] whitespace-pre-wrap">
              {profileJobdescription}
            </div>
          </div>
          <ProfileImage
            className="absolute left-[9px] top-[10px] h-[82px] rounded-[20px] flex-shrink-0"
            src={photoPath}
            placeholder={placeHolder}
          />
        </>
      );
    case "Small":
      return (
        <>
          <div
            className={`${cn} absolute left-[85px] top-[50%] translate-y-[-50%]`}
          >
            <div className="font-[500] text-[22px]">
              <span className="font-[500] text-[23px]">{item.member.name}</span>
              <span className="font-[500] text-[12px]">{profileGrade}</span>
            </div>
            <div className="font-[300] text-[11px] truncate h-[30px] w-[110px] whitespace-pre-wrap">
              {profileJobdescription}
            </div>
          </div>
          <ProfileImage
            className="absolute left-[5%] top-[7%] h-[75%] rounded-[20px] flex-shrink-0"
            src={photoPath}
            placeholder={placeHolder}
          />
        </>
      );
  }
}

// function renderContent(item: MemberSeatingPlaceViewModel) {
//   switch (item.size) {
//     case "Large":
//       return (
//         <div className="absolute left-[115px] top-[50%] translate-y-[-50%]">
//           <div className="font-[500] text-[22px]">
//             <span className="font-[500] text-[27px]">{item.title}</span>
//             <span className="font-[500] text-[12px]">
//               {item.grade ?? "주무관"}
//             </span>
//           </div>
//           <div className="font-[300] text-[11px] truncate h-[30px] w-[110px] whitespace-pre-wrap">
//             {item.jobDescription}
//           </div>
//         </div>
//       );
//     case "Medium":
//       return (
//         <div className="absolute left-[99px] top-[50%] translate-y-[-50%]">
//           <div className="font-[500] text-[22px]">
//             <span className="font-[500] text-[27px]">{item.title}</span>
//             <span className="font-[500] text-[12px]">
//               {item.grade ?? "주무관"}
//             </span>
//           </div>
//           <div className="font-[300] text-[11px] truncate h-[30px] w-[110px] whitespace-pre-wrap">
//             {item.jobDescription}
//           </div>
//         </div>
//       );
//     case "Small":
//       return (
//         <div className="absolute left-[85px] top-[50%] translate-y-[-50%]">
//           <div className="font-[500] text-[22px]">
//             <span className="font-[500] text-[23px]">{item.title}</span>
//             <span className="font-[500] text-[12px]">
//               {item.grade ?? "주무관"}
//             </span>
//           </div>
//           <div className="font-[300] text-[11px] truncate h-[30px] w-[110px] whitespace-pre-wrap">
//             {item.jobDescription}
//           </div>
//         </div>
//       );
//   }
// }

export default observer(function MemberPlaceHolder1({
  item,
  className,
  onSelectItem,
}: Props) {
  const photoPath = ServerConsts.photoServerUrl(item.member.photo, placeHolder);

  return (
    <ChartNode
      x={item.posX}
      y={item.posY}
      //transform={`translate(${item.posX}, ${item.posY})`}
      width={item.width}
      height={item.height}
      isSelected={item.isSelected}
    >
      <LeaderCardLayout
        colorStyle={item.color}
        sizeStyle={item.size}
        style={{ width: `${item.width}px`, height: `${item.height}px` }}
        onMouseDown={(ev) => onSelectItem(ev, item)}
        className={`${className} relative flex flex-col border-black hover:bg-sky-500/30 select-none hover:border-dashed hover:border-2 ${
          item.isSelected ? "text-purple-600 border-2" : " "
        }`}
      >
        {renderContent(item, photoPath)}

        {/* {item.isSelected && (
          <div className="h-full w-full absolute ">
            <span
              className={`absolute  right-0 bottom-0 px-2 py-1 font-light text-[7px] bg-green-800/70 m-[2px]`}
            >
              {item.width}x{item.height}
            </span>
            <span className="absolute left-0 bottom-0 px-2 py-1 font-light text-[7px] border border-black text-black bg-yellow-400 m-[2px]">
              {item.posX}x{item.posY}
            </span>
          </div>
        )} */}
        {/* {item.isSelected && (
          <CheckCircleIcon className="w-5 h-5 absolute top-2 right-2" />
        )} */}
      </LeaderCardLayout>
    </ChartNode>
  );
});
