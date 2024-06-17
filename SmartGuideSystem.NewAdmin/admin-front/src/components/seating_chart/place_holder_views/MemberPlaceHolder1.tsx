import { observer } from "mobx-react";
import React from "react";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";
import ProfileCardLayout from "./ProfileCardLayout";
import ChartNode from "./ChartNode";
import ProfileImage from "@/components/ui/ProfileImage";
import { ServerConsts } from "@/helpers/serverConsts";
import placeHolder from "@/assets/user-photo-placeholder.svg";
import { selectString } from "@/helpers/desc-helpers";

interface Props {
  item: MemberSeatingPlaceViewModel;
  className?: string;
  onSelectItem: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: BaseSeatingPlaceViewModel
  ) => void;
}

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
      width={item.width}
      height={item.height}
      isSelected={item.isSelected}
    >
      <ProfileCardLayout
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
          </div>
        )} */}

        {/* {item.isSelected && (
          <CheckCircleIcon className="w-5 h-5 absolute top-1 right-1" />
        )} */}
      </ProfileCardLayout>
    </ChartNode>
  );
});

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

  // const profileJobdescription = selectString(
  //   item.member.profileJobDescription,
  //   item.member.jobDescription
  // );

  switch (item.size) {
    case "Large":
      return (
        <>
          <div
            className={`${cn}  absolute left-[76px] top-[50%] translate-y-[-50%]`}
          >
            <p className="font-[500]  text-[22px]">{item.member.name}</p>
            <p className="font-[500] text-[11px]">{profileGrade}</p>
          </div>

          <ProfileImage
            width={56}
            height={65}
            className="absolute left-[5%] top-[50%] translate-y-[-50%]  h-[65px]  rounded-[10px] bg-[#8a8a8a]  select-none "
            src={photoPath}
            placeholder={placeHolder}
          />
        </>
      );
    case "Medium":
      return (
        <>
          <div
            className={`${cn} absolute left-[69px]  top-[50%] translate-y-[-50%] `}
          >
            <p className="font-[500]  text-[22px]">{item.member.name}</p>
            <p className="font-[500] text-[11px]">{profileGrade}</p>
          </div>
          <ProfileImage
            width={50}
            height={58}
            className="absolute left-[8px] top-[6px]  h-[58px]  rounded-[10px] bg-[#d9d9d9]  select-none "
            src={photoPath}
            placeholder={placeHolder}
          />
        </>
      );
    case "Small":
      return (
        <>
          <div
            className={`${cn} absolute left-[48px] top-[50%] translate-y-[-50%] leading-none`}
          >
            <p className="font-[500] text-[15px] leading-[18px]">
              {item.member.name}
            </p>
            <p className="font-[500] text-[8px]">{profileGrade}</p>
          </div>
          <ProfileImage
            width={35}
            height={40}
            className="absolute left-[6px] top-[5px]  h-[40px]  rounded-[10px] bg-[#d9d9d9]  select-none "
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
//         <div className="absolute left-[76px] top-[50%] translate-y-[-50%]">
//           <p className="font-[500] text-[22px]">{item.title}</p>
//           <p className="font-[500] text-[11px]">{item.grade ?? "주무관"}</p>
//         </div>
//       );
//     case "Medium":
//       return (
//         <div className="absolute left-[69px] top-[50%] translate-y-[-50%]">
//           <p className="font-[500] text-[22px]">{item.title}</p>
//           <p className="font-[500] text-[11px]">{item.grade ?? "주무관"}</p>
//         </div>
//       );
//     case "Small":
//       return (
//         <div className="absolute left-[48px] top-[50%] translate-y-[-50%] leading-none">
//           <p className="font-[500] text-[15px] leading-[18px]">{item.title}</p>
//           <p className="font-[500] text-[8px]">{item.grade ?? "주무관"}</p>
//         </div>
//       );
//   }
// }
