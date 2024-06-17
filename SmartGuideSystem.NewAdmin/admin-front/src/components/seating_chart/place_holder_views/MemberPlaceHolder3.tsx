import { observer } from "mobx-react";
import React from "react";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";
import { DepartLeaderCardLayout } from "./ProfileCardLayout";
import ChartNode from "./ChartNode";
import placeHolder from "@/assets/user-photo-placeholder.svg";
import ProfileImage from "@/components/ui/ProfileImage";
import { ServerConsts } from "@/helpers/serverConsts";
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

  const name = item.member.name;
  const profileGrade = selectString(
    item.member.profileGrade,
    item.member.positionName,
    "주무관"
  );

  const profileJobdescription = selectString(
    item.member.profileJobDescription,
    item.member.jobDescription
  );

  let cn = "";
  if (item.updateStatus === "Updated") {
    cn = "text-red-500";
  } else if (item.updateStatus === "Deleted") {
    cn = "line-through text-red-500";
  }

  return (
    <ChartNode
      x={item.posX}
      y={item.posY}
      width={item.width}
      height={item.height}
      isSelected={item.isSelected}
    >
      <DepartLeaderCardLayout
        colorStyle={item.color}
        sizeStyle={item.size}
        style={{ width: `${item.width}px`, height: `${item.height}px` }}
        onMouseDown={(ev) => onSelectItem(ev, item)}
        className={`${className} relative flex flex-col border-black hover:bg-sky-500/30 select-none hover:border-dashed hover:border-2 ${
          item.isSelected ? "text-purple-600 border-2" : " "
        }`}
      >
        {/* <div className="border-1 border-black/80 absolute left-[14px] top-[141px] flex items-baseline space-x-1">
          <span className="font-[500] text-[27px]">{name}</span>
          <span className="font-[500] text-[12px]">
            {grade}
          </span>
          <div className="flex-1 mt-1 ml-[2px] font-light text-[11px] leading-[15px]  whitespace-pre-line">
            {jobs}
          </div>
        </div> */}

        <div
          className={`${cn} absolute left-[13px] top-[144px] flex flex-col font-medium  justify-bottom items-start`}
        >
          <p className="leading-none">
            <span className="text-[27px] ">{name}</span>
            <span className="text-[12px] ml-[2px] ">{profileGrade}</span>
          </p>
          <div className="flex-1 mt-1 ml-[2px] font-light text-[11px] leading-[15px]  whitespace-pre-line">
            {profileJobdescription}
          </div>
        </div>

        <ProfileImage
          className="absolute left-[10px] top-[14px] h-[121px] rounded-[20px] bg-[#dcdcdc] "
          src={photoPath}
          placeholder={placeHolder}
        />

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
      </DepartLeaderCardLayout>
    </ChartNode>
  );
});

// export default observer(function MemberPlaceHolder1({
//   item,
//   className,
//   onSelectItem,
// }: Props) {
//   return (
//     <ChartNode
//       x={item.posX}
//       y={item.posY}
//       width={item.width}
//       height={item.height}
//     >
//       <DepartLeaderCardLayout
//         colorStyle={item.color}
//         sizeStyle={item.size}
//         style={{ width: `${item.width}px`, height: `${item.height}px` }}
//         onMouseDown={(ev) => onSelectItem(ev, item)}
//         className={`${className} relative flex flex-col border-black hover:bg-sky-500/30 select-none hover:border-dashed hover:border-2 ${
//           item.isSelected ? "bg-sky-500 border-2" : " "
//         }`}
//       >
//         <div className="absolute w-full px-[13px] top-[141px] flex flex-col">
//           <div className="leading-none">
//             <span className="font-[500] text-[27px]">{item.title}</span>
//             <span className="ml-1 font-[500] text-[12px]">
//               {item.grade ?? "주무관"}
//             </span>
//           </div>
//           <p className="font-[300] mt-1 text-[11px] overflow-hidden  whitespace-pre-line">
//             {item.jobDescription}
//           </p>
//         </div>

//         {item.isSelected && (
//           <div className="h-full w-full absolute ">
//             <span
//               className={`absolute  right-0 bottom-0 px-2 py-1 font-light text-[7px] bg-green-800/70 m-[2px]`}
//             >
//               {item.width}x{item.height}
//             </span>
//             <span className="absolute left-0 bottom-0 px-2 py-1 font-light text-[7px] border border-black text-black bg-yellow-400 m-[2px]">
//               {item.posX}x{item.posY}
//             </span>
//           </div>
//         )}
//       </DepartLeaderCardLayout>
//     </ChartNode>
//   );
// });
