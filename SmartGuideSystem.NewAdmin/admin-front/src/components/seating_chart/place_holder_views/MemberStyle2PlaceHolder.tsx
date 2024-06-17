import { observer } from "mobx-react";
import React from "react";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";
import ChartNode from "./ChartNode";
import ProfileImage from "@/components/ui/ProfileImage";
import placeHolder from "@/assets/user-photo-placeholder.svg";
import { ServerConsts } from "@/helpers/serverConsts";
import { selectString } from "@/helpers/desc-helpers";
import { MemberCardColor, MemberCardSize } from "@shares/*";
import { PropsWithChildren } from "react";
import { TemplateNames } from "@/viewmodels/seating_chart/TempateNames";

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

  if (item.size === "Large") {
    return (
      <>
        <ProfileImage
          className="absolute left-[50%] top-[5px] translate-x-[-50%] h-[156px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute  left-[50%] translate-x-[-50%] bottom-[10px] w-full   `}>
          <div className="">
            <p className="font-[500] text-[24px] leading-[24px]  text-center">
              {item.member.name}
            </p>
          </div>
        </div>

        {item.member.status && (
          <p className=" absolute left-[50%] translate-x-[-50%] top-[133px] w-[133px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[16px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {item.member.status}
          </p>
        )}
      </>
    );
  } else if (item.size == "Small") {
    return (
      <>
        <ProfileImage
          className="absolute left-[50%] top-[5px] translate-x-[-50%] h-[96px]  rounded-[10px] flex-shrink-0"
          src={photoPath}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute  left-[50%] translate-x-[-50%] bottom-[8px] w-full   `}>
          <div className="">
            <p className="font-[500] text-[20px] leading-[24px]  text-center">
              {item.member.name}
            </p>
          </div>
        </div>

        {item.member.status && (
          <p className=" absolute left-[50%] translate-x-[-50%] top-[78px] w-[90px] h-[24px] rounded-[6px] bg-[#FF3F5E] text-[14px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {item.member.status}
          </p>
        )}
      </>
    );
  }
  // Medium
  else
    return (
      <>
        <ProfileImage
          className="absolute left-[50%] top-[5px] translate-x-[-50%] h-[122px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute  left-[50%] translate-x-[-50%] bottom-[10px] w-full   `}>
          <div className="">
            <p className="font-[500] text-[22px] leading-[24px]  text-center">
              {item.member.name}
            </p>
          </div>
        </div>

        {item.member.status && (
          <p className=" absolute left-[50%] translate-x-[-50%] top-[103px] w-[120px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[14px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {item.member.status}
          </p>
        )}
      </>
    );
}

function renderContent_leader1(
  item: MemberSeatingPlaceViewModel,
  photoPath?: string
) {
  let cn = "";
  if (item.updateStatus === "Updated") {
    cn = "text-red-500";
  } else if (item.updateStatus === "Deleted") {
    cn = "line-through text-red-500";
  }

  const profileGrade = selectString(
    // item.member.profileGrade,
    item.member.positionName,
    ""
  );

  // const profileJobdescription = selectString(
  //   item.member.profileJobDescription,
  //   item.member.jobDescription
  // );
  const profileJobdescription = selectString(
    // member.profileJobDescription,
    item.member.teamName
  );

  if (item.size === "Large") {
    return (
      <>
        <ProfileImage
          className="absolute left-[5%]  top-[50%] translate-y-[-50%] h-[155px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute left-[180px] top-[50%] translate-y-[-50%]`}>
          <div className="flex items-baseline space-x-1">
            <p className="font-[500] text-[27px]">{item.member.name}</p>
            <p className="font-[500] text-[12px]">{profileGrade}</p>
          </div>
          <div className="font-[200] text-[20px]  truncate h-[60px] w-[130px]  whitespace-pre-wrap">
            {profileJobdescription}
          </div>
        </div>

        {item.member.status && (
          <p className=" absolute left-[14px] top-[143px] w-[128px] h-[28px] rounded-[10px] bg-[#FF3F5E] text-[16px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {item.member.status}
          </p>
        )}
      </>
    );
  } else if (item.size == "Small") {
    //Todo
    return (
      <>
        <ProfileImage
          className="absolute left-[5%] top-[50%] translate-y-[-50%] h-[110px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute left-[110px] top-[50%] translate-y-[-50%]`}>
          <div className="flex items-baseline space-x-1">
            <p className="font-[500] text-[27px]">{item.member.name}</p>
            <p className="font-[500] text-[12px]">{profileGrade}</p>
          </div>
          <div className="font-[200] text-[20px]  truncate h-[60px] w-[100px]  whitespace-pre-wrap ">
            {profileJobdescription}
          </div>
        </div>

        {item.member.status && (
          <p className=" absolute left-[6px] top-[90px] w-[100px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[14px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {item.member.status}
          </p>
        )}
      </>
    );
  } else {
    return (
      <>
        <ProfileImage
          className="absolute left-[5%] top-[50%] translate-y-[-50%] h-[127px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute left-[131px] top-[50%] translate-y-[-50%]`}>
          <div className="flex items-baseline space-x-1">
            <p className="font-[500] text-[27px]">{item.member.name}</p>
            <p className="font-[500] text-[12px]">{profileGrade}</p>
          </div>
          <div className="font-[200] text-[20px]  truncate h-[60px] w-[130px]  whitespace-pre-wrap">
            {profileJobdescription}
          </div>
        </div>

        {item.member.status && (
          <p className=" absolute left-[8px] top-[106px] w-[110px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[14px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {item.member.status}
          </p>
        )}
      </>
    );
  }
}

function renderContent_leader2(
  item: MemberSeatingPlaceViewModel,
  photoPath?: string
) {
  let cn = "";
  if (item.updateStatus === "Updated") {
    cn = "text-red-500";
  } else if (item.updateStatus === "Deleted") {
    cn = "line-through text-red-500";
  }

  // const profileGrade = selectString(
  //   item.member.profileGrade,
  //   item.member.positionName,
  //   "주무관"
  // );
  const profileGrade = selectString(
    // member.profileGrade,
    item.member.positionName
    // ""
  );

  // const profileJobdescription = selectString(
  //   item.member.profileJobDescription,
  //   item.member.jobDescription
  // );
  const profileJobdescription = selectString(
    // member.profileJobDescription,
    item.member.teamPosition
  );

  if (item.size === "Large") {
    return (
      <>
        <ProfileImage
          className="absolute left-[14px] top-[50%] translate-y-[-50%] h-[185px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute left-[194px] top-[50%] translate-y-[-50%]`}>
          <div className="flex items-baseline space-x-1">
            <p className="font-[500] text-[36px]">{item.member.name}</p>
            <p className="font-[500] text-[20px]">{profileGrade}</p>
          </div>
          <div className="font-[200] text-[24px] mt-0 truncate h-[78px] w-[240px]  whitespace-pre-wrap ">
            {profileJobdescription}
          </div>
        </div>

        {item.member.status && (
          <p className=" absolute left-[22px] bottom-[5%] w-[130px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[18px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {item.member.status}
          </p>
        )}
      </>
    );
  } else if (item.size === "Small") {
    return (
      <>
        <ProfileImage
          className="absolute left-[14px] top-[50%] translate-y-[-50%] h-[142px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute left-[140px] top-[50%] translate-y-[-50%]`}>
          <div className="flex items-baseline space-x-1">
            <p className="font-[500] text-[30px]">{item.member.name}</p>
            <p className="font-[500] text-[16px]">{profileGrade}</p>
          </div>
          <div className="font-[200] text-[18px] mt-0 truncate h-[53px] w-[180px]  whitespace-pre-wrap ">
            {profileJobdescription}
          </div>
        </div>

        {item.member.status && (
          <p className=" absolute left-[18px] bottom-[5%] w-[98px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[14px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {item.member.status}
          </p>
        )}
      </>
    );
  } else {
    return (
      <>
        <ProfileImage
          className="absolute left-[14px] top-[50%] translate-y-[-50%] h-[165px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute left-[180px] top-[50%] translate-y-[-50%]`}>
          <div className="flex items-baseline space-x-1">
            <p className="font-[500] text-[32px]">{item.member.name}</p>
            <p className="font-[500] text-[18px]">{profileGrade}</p>
          </div>
          <div className="font-[200] text-[20px] mt-0 truncate h-[62px] w-[180px]  whitespace-pre-wrap">
            {profileJobdescription}
          </div>
        </div>

        {item.member.status && (
          <p className=" absolute left-[20px] bottom-[5%] w-[110px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[14px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {item.member.status}
          </p>
        )}
      </>
    );
  }
}
export default observer(function MemberStyle2PlaceHolder({
  item,
  className,
  onSelectItem,
}: Props) {
  const photoPath = ServerConsts.photoServerUrl(item.member.photo, placeHolder);

  if (item.templateName === TemplateNames.template_member_style2_member) {
    return (
      <ChartNode
        x={item.posX}
        y={item.posY}
        width={item.width}
        height={item.height}
        isSelected={item.isSelected}
        className="">
        <CardMemberLayoutForMember
          colorStyle={item.color}
          sizeStyle={item.size}
          templateStyle="Member"
          style={{
            width: `${item.width - 2}px`,
            height: `${item.height - 2}px`,
          }}
          onMouseDown={(ev) => onSelectItem(ev, item)}
          className={`${className} relative flex flex-col w-full h-full border-black hover:bg-sky-500/30 select-none hover:border-dashed hover:border-2 ${
            item.isSelected ? "text-purple-600 border-2" : " "
          }`}>
          {renderContent(item, photoPath)}
        </CardMemberLayoutForMember>
      </ChartNode>
    );
  } else if (
    item.templateName === TemplateNames.template_member_style2_leader1
  ) {
    return (
      <ChartNode
        x={item.posX}
        y={item.posY}
        width={item.width}
        height={item.height}
        isSelected={item.isSelected}
        className="">
        <CardMemberLayoutForLeader1
          colorStyle={item.color}
          sizeStyle={item.size}
          templateStyle="Leader1"
          style={{
            width: `${item.width - 0}px`,
            height: `${item.height - 0}px`,
          }}
          onMouseDown={(ev) => onSelectItem(ev, item)}
          className={`${className} relative flex flex-col w-full h-full border-black hover:bg-sky-500/30 select-none hover:border-dashed hover:border-2 ${
            item.isSelected ? "text-purple-600 border-2" : " "
          }`}>
          {renderContent_leader1(item, photoPath)}
        </CardMemberLayoutForLeader1>
      </ChartNode>
    );
  } else if (
    item.templateName === TemplateNames.template_member_style2_leader2
  ) {
    return (
      <ChartNode
        x={item.posX}
        y={item.posY}
        width={item.width}
        height={item.height}
        isSelected={item.isSelected}
        className=" box-content">
        <CardMemberLayoutForLeader2
          colorStyle={item.color}
          sizeStyle={item.size}
          templateStyle="Leader2"
          style={{
            width: `${item.width - 0}px`,
            height: `${item.height - 0}px`,
          }}
          onMouseDown={(ev) => onSelectItem(ev, item)}
          className={`${className}  relative flex flex-col w-full h-full border-black hover:bg-sky-500/30 select-none hover:border-dashed hover:border-2 ${
            item.isSelected ? "text-purple-600 border-2" : " "
          }`}>
          {renderContent_leader2(item, photoPath)}
        </CardMemberLayoutForLeader2>
      </ChartNode>
    );
  } else {
    return null;
  }
});

interface CardProps extends PropsWithChildren {
  className?: string;
  colorStyle?: MemberCardColor;
  sizeStyle?: MemberCardSize;
  style?: object;
  templateStyle: "Member" | "Leader1" | "Leader2";
  onMouseDown?: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function CardMemberLayoutForMember({
  className,
  children,
  colorStyle,
  sizeStyle,
  templateStyle,
  style,
  onMouseDown,
}: CardProps) {
  let circleLeft = "bg-red-600";
  let circleCenter = "bg-red-400";

  switch (colorStyle) {
    case "Blue":
      circleLeft = "bg-[#607FBD]";
      circleCenter = "bg-[#C4D5F8]";
      break;
    case "Yellow":
      circleLeft = "bg-[#FCB004]";
      circleCenter = "bg-[#FFEBC2]";
      break;
    case "Mint":
      circleLeft = "bg-[#7FBFC7]";
      circleCenter = "bg-[#C3EFF4]";
      break;
    case "Red":
      circleLeft = "bg-[#FF3F5E]";
      circleCenter = "bg-[#FFDEE4]";
      break;
    case "Orange":
      circleLeft = "bg-[#FD865B]";
      circleCenter = "bg-[#FFE8DF]";
      break;
    case "Green":
      circleLeft = "bg-[#60BD9B]";
      circleCenter = "bg-[#C2EFDF]";
      break;
  }

  if (sizeStyle === "Large") {
    return (
      <div
        style={style}
        onMouseDown={onMouseDown}
        className={`${className} overflow-hidden relative rounded-tr-[20px] rounded-b-[20px] shadow-[2px_4px_4px_4px_rgba(0,0,0,0.25)] bg-white  `}>
        <div
          className={`absolute rounded-full aspect-square h-[136px] w-[136px] left-[50%] top-[5px] translate-x-[-50%]  ${circleCenter}`}
        />

        <div
          className={`absolute rounded-full  h-[136px] w-[136px] top-[12px] left-[-40%] ${circleLeft} `}
        />

        {children}
      </div>
    );
  } else if (sizeStyle === "Small") {
    return (
      <div
        style={style}
        onMouseDown={onMouseDown}
        className={`${className} overflow-hidden relative rounded-tr-[20px] rounded-b-[20px] shadow-[2px_4px_4px_4px_rgba(0,0,0,0.25)] bg-white  `}>
        <div
          className={`absolute rounded-full aspect-square h-[82px] w-[82px] left-[50%] top-[5px] translate-x-[-50%]  ${circleCenter}`}
        />

        <div
          className={`absolute rounded-full  h-[84px] w-[84px] top-[8px] left-[-38%] ${circleLeft} `}
        />

        {children}
      </div>
    );
  } else {
    return (
      <div
        style={style}
        onMouseDown={onMouseDown}
        className={`${className} overflow-hidden relative rounded-tr-[20px] rounded-b-[20px] shadow-[2px_4px_4px_4px_rgba(0,0,0,0.25)] bg-white  `}>
        <div
          className={`absolute rounded-full aspect-square h-[116px] w-[116px] left-[50%] top-[5px] translate-x-[-50%]  ${circleCenter}`}
        />

        <div
          className={`absolute rounded-full  h-[106px] w-[106px] top-[12px] left-[-30%] ${circleLeft} `}
        />

        {children}
      </div>
    );
  }
}

function CardMemberLayoutForLeader1({
  className,
  children,
  colorStyle,
  templateStyle,
  sizeStyle,
  style,
  onMouseDown,
}: CardProps) {
  let circleLeft = "bg-red-600";
  let circleCenter = "bg-red-400";

  switch (colorStyle) {
    case "Blue":
      circleLeft = "bg-[#607FBD]";
      circleCenter = "bg-[#C4D5F8]";
      break;
    case "Yellow":
      circleLeft = "bg-[#FCB004]";
      circleCenter = "bg-[#FFEBC2]";
      break;
    case "Mint":
      circleLeft = "bg-[#7FBFC7]";
      circleCenter = "bg-[#C3EFF4]";
      break;
    case "Red":
      circleLeft = "bg-[#FF3F5E]";
      circleCenter = "bg-[#FFDEE4]";
      break;
    case "Orange":
      circleLeft = "bg-[#FD865B]";
      circleCenter = "bg-[#FFE8DF]";
      break;
    case "Green":
      circleLeft = "bg-[#60BD9B]";
      circleCenter = "bg-[#C2EFDF]";
      break;
  }

  if (sizeStyle === "Large") {
    return (
      <div
        style={style}
        onMouseDown={onMouseDown}
        className={`overflow-hidden  relative rounded-tr-[30px] rounded-b-[30px] shadow-[2px_4px_4px_4px_rgba(0,0,0,0.25)]  bg-white ${className}`}>
        <div
          className={`${circleCenter} absolute left-[12px] top-[50%] translate-y-[-50%] w-[148px] h-[148px] rounded-full`}></div>

        <div
          className={`${circleLeft} absolute left-[-15%] top-[10px] w-[132px] h-[132px] rounded-full`}></div>

        {children}
      </div>
    );
  } else if (sizeStyle === "Small") {
    return (
      <div
        style={style}
        onMouseDown={onMouseDown}
        className={`overflow-hidden  relative rounded-tr-3xl rounded-b-3xl shadow-[2px_4px_4px_4px_rgba(0,0,0,0.25)] bg-white   ${className}`}>
        <div
          className={`${circleCenter} absolute left-[12px] top-[50%] translate-y-[-50%] w-[96px] h-[96px] rounded-full`}></div>

        <div
          className={`${circleLeft} absolute left-[-20%] top-[10px] w-[96px] h-[96px] rounded-full`}></div>

        {children}
      </div>
    );
  } else {
    return (
      <div
        style={style}
        onMouseDown={onMouseDown}
        className={`overflow-hidden  relative rounded-tr-3xl rounded-b-3xl shadow-[2px_4px_4px_4px_rgba(0,0,0,0.25)] bg-white   ${className}`}>
        <div
          className={`${circleCenter} absolute left-[12px] top-[50%] translate-y-[-50%] w-[116px] h-[116px] rounded-full`}></div>

        <div
          className={`${circleLeft} absolute left-[-15%] top-[10px] w-[100px] h-[100px] rounded-full`}></div>

        {children}
      </div>
    );
  }
}

function CardMemberLayoutForLeader2({
  className,
  children,
  colorStyle,
  templateStyle,
  sizeStyle,
  style,
  onMouseDown,
}: CardProps) {
  let circleLeft = "bg-red-600";
  let circleCenter = "bg-red-400";

  switch (colorStyle) {
    case "Blue":
      circleLeft = "bg-[#607FBD]";
      circleCenter = "bg-[#C4D5F8]";
      break;
    case "Yellow":
      circleLeft = "bg-[#FCB004]";
      circleCenter = "bg-[#FFEBC2]";
      break;
    case "Mint":
      circleLeft = "bg-[#7FBFC7]";
      circleCenter = "bg-[#C3EFF4]";
      break;
    case "Red":
      circleLeft = "bg-[#FF3F5E]";
      circleCenter = "bg-[#FFDEE4]";
      break;
    case "Orange":
      circleLeft = "bg-[#FD865B]";
      circleCenter = "bg-[#FFE8DF]";
      break;
    case "Green":
      circleLeft = "bg-[#60BD9B]";
      circleCenter = "bg-[#C2EFDF]";
      break;
  }

  if (sizeStyle === "Large") {
    return (
      <div
        style={style}
        onMouseDown={onMouseDown}
        className={`overflow-hidden  relative rounded-tr-[30px] rounded-b-[30px] shadow-[2px_4px_4px_4px_rgba(0,0,0,0.25)]  bg-white ${className}`}>
        <div
          className={`${circleCenter} absolute left-[12px] top-[50%] translate-y-[-50%] w-[168px] h-[168px] rounded-full`}></div>

        <div
          className={`${circleLeft} absolute left-[-12%] top-[22px] w-[152px] h-[152px] rounded-full`}></div>

        {children}
      </div>
    );
  } else if (sizeStyle === "Small") {
    return (
      <div
        style={style}
        onMouseDown={onMouseDown}
        className={`overflow-hidden  relative rounded-tr-[30px] rounded-b-[30px] shadow-[2px_4px_4px_4px_rgba(0,0,0,0.25)]  bg-white ${className}`}>
        <div
          className={`${circleCenter} absolute left-[12px] top-[50%] translate-y-[-50%] w-[128px] h-[128px] rounded-full`}></div>

        <div
          className={`${circleLeft} absolute left-[-13%] top-[18px] w-[118px] h-[118px] rounded-full`}></div>

        {children}
      </div>
    );
  } else {
    return (
      <div
        style={style}
        onMouseDown={onMouseDown}
        className={`overflow-hidden  relative rounded-tr-[30px] rounded-b-[30px] shadow-[2px_4px_4px_4px_rgba(0,0,0,0.25)]  bg-white ${className}`}>
        <div
          className={`${circleCenter} absolute left-[12px] top-[50%] translate-y-[-50%] w-[148px] h-[148px] rounded-full`}></div>

        <div
          className={`${circleLeft} absolute left-[-15%] top-[16px] w-[132px] h-[132px] rounded-full`}></div>

        {children}
      </div>
    );
  }
}
