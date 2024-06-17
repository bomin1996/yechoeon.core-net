import React from "react";
import placeHolder from "src/assets/user-photo-placeholder.svg";
import { ISGUser, MemberCardColor, MemberCardSize } from "@shares/*";
import { PropsWithChildren } from "react";
import { ServerConsts } from "src/server/serverConsts";
import { selectString } from "src/helpers/stringUtils";
import ProfileImage from "src/components/OrganizationChart/Profile/ProfileImage";

interface Props {
  className?: string;
  member: ISGUser;
  onSelect: (member: ISGUser) => void;
  teamIndex?: number;
  colorStyle?: MemberCardColor;
  sizeStyle?: MemberCardSize;
  templateName?: string;
}

function renderContent(
  member: ISGUser,
  sizeStyle: MemberCardSize,
  photoPath?: string
) {
  let cn = "";

  const profileGrade = selectString(
    member.profileGrade,
    member.positionName,
    "주무관"
  );

  const profileJobdescription = selectString(
    member.profileJobDescription,
    member.jobDescription
  );

  console.log(`sizeStyle ${sizeStyle}`);
  if (sizeStyle === "Large") {
    return (
      <>
        <ProfileImage
          className="absolute left-[50%] top-[5px] translate-x-[-50%] h-[156px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          width={0}
          height={0}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute  left-[50%] translate-x-[-50%] bottom-[10px] w-full   `}>
          <div className="">
            <p className="font-[500] text-[24px] leading-[24px]  text-center">
              {member.name}
            </p>
            {/* <p className="font-[500] text-[18px] leading-[18px]  text-center">
              {profileGrade}
            </p> */}
          </div>
        </div>

        {member.status && (
          <p className=" absolute left-[50%] translate-x-[-50%] top-[133px] w-[133px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[16px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {member.status}
          </p>
        )}
      </>
    );
  } else if (sizeStyle === "Small") {
    return (
      <>
        <ProfileImage
          className="absolute left-[50%] top-[5px] translate-x-[-50%] h-[96px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          // width={0}
          // height={0}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute  left-[50%] translate-x-[-50%] bottom-[8px] w-full   `}>
          <div className="">
            <p className="font-[500] text-[20px] leading-[24px]  text-center">
              {member.name}
            </p>
            {/* <p className="font-[500] text-[18px] leading-[18px]  text-center">
              {profileGrade}
            </p> */}
          </div>
        </div>

        {member.status && (
          <p className=" absolute left-[50%] translate-x-[-50%] top-[78px] w-[90px] h-[24px] rounded-[6px] bg-[#FF3F5E] text-[14px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {member.status}
          </p>
        )}
      </>
    );
  } else {
    return (
      <>
        <ProfileImage
          className="absolute left-[50%] top-[5px] translate-x-[-50%] h-[122px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          // width={0}
          // height={0}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute  left-[50%] translate-x-[-50%] bottom-[10px] w-full   `}>
          <div className="">
            <p className="font-[500] text-[22px] leading-[24px]  text-center">
              {member.name}
            </p>
            {/* <p className="font-[500] text-[18px] leading-[18px]  text-center">
              {profileGrade}
            </p> */}
          </div>
        </div>

        {member.status && (
          <p className=" absolute left-[50%] translate-x-[-50%] top-[103px] w-[120px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[14px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {member.status}
          </p>
        )}
      </>
    );
  }
}

function renderContent_leader1(
  member: ISGUser,
  sizeStyle: MemberCardSize,
  photoPath?: string
) {
  let cn = "";

  const profileGrade = selectString(
    // member.profileGrade,
    member.positionName
    // ""
  );

  const profileJobdescription = selectString(
    // member.profileJobDescription,
    member.teamName
  );

  if (sizeStyle === "Large") {
    return (
      <>
        <ProfileImage
          className="absolute left-[5%] top-[50%] translate-y-[-50%] h-[155px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          // width={0}
          // height={0}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute left-[180px] top-[50%] translate-y-[-50%]`}>
          <div className="flex items-baseline space-x-1">
            <p className="font-[500] text-[27px]">{member.name}</p>
            <p className="font-[500] text-[12px]">{profileGrade}</p>
          </div>
          <div className="font-[200] text-[20px]  truncate h-[60px] w-[130px]  whitespace-pre-wrap">
            {profileJobdescription}
          </div>
        </div>

        {member.status && (
          <p className=" absolute left-[14px] top-[143px] w-[128px] h-[28px] rounded-[10px] bg-[#FF3F5E] text-[16px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {member.status}
          </p>
        )}
      </>
    );
  } else if (sizeStyle === "Small") {
    return (
      <>
        <ProfileImage
          className="absolute left-[5%] top-[50%] translate-y-[-50%] h-[110px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          // width={0}
          // height={0}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute left-[110px] top-[50%] translate-y-[-50%]`}>
          <div className="flex items-baseline space-x-1">
            <p className="font-[500] text-[27px]">{member.name}</p>
            <p className="font-[500] text-[12px]">{profileGrade}</p>
          </div>
          <div className="font-[200] text-[20px]  truncate h-[60px] w-[100px]  whitespace-pre-wrap ">
            {profileJobdescription}
          </div>
        </div>

        {member.status && (
          <p className=" absolute left-[6px] top-[90px] w-[100px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[14px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {member.status}
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
          width={0}
          height={0}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute left-[131px] top-[50%] translate-y-[-50%]`}>
          <div className="flex items-baseline space-x-1">
            <p className="font-[500] text-[27px]">{member.name}</p>
            <p className="font-[500] text-[12px]">{profileGrade}</p>
          </div>
          <div className="font-[200] text-[20px]  truncate h-[60px] w-[130px]  whitespace-pre-wrap">
            {profileJobdescription}
          </div>
        </div>

        {member.status && (
          <p className=" absolute left-[8px] top-[106px] w-[110px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[14px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {member.status}
          </p>
        )}
      </>
    );
  }
}

function renderContent_leader2(
  member: ISGUser,
  sizeStyle: MemberCardSize,
  photoPath?: string
) {
  let cn = "";

  const profileGrade = selectString(
    // member.profileGrade,
    member.positionName
    // ""
  );

  const profileJobdescription = selectString(
    // member.profileJobDescription,
    member.teamPosition
  );

  if (sizeStyle === "Large") {
    return (
      <>
        <ProfileImage
          className="absolute left-[14px] top-[50%] translate-y-[-50%] h-[196px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          width={0}
          height={0}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute left-[194px] top-[50%] translate-y-[-50%]`}>
          <div className="flex items-baseline space-x-1">
            <p className="font-[500] text-[36px]">{member.name}</p>
            <p className="font-[500] text-[20px]">{profileGrade}</p>
          </div>
          <div className="font-[200] text-[20px] mt-0 truncate h-[78px] w-[240px]  whitespace-pre-wrap">
            {profileJobdescription}
          </div>
        </div>

        {member.status && (
          <p className=" absolute left-[22px] bottom-[5%] w-[130px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[18px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {member.status}
          </p>
        )}
      </>
    );
  } else if (sizeStyle === "Small") {
    return (
      <>
        <ProfileImage
          className="absolute left-[14px] top-[50%] translate-y-[-50%] h-[144px]  rounded-[20px] flex-shrink-0"
          src={photoPath}
          width={0}
          height={0}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute left-[140px] top-[50%] translate-y-[-50%]`}>
          <div className="flex items-baseline space-x-1">
            <p className="font-[500] text-[30px]">{member.name}</p>
            <p className="font-[500] text-[16px]">{profileGrade}</p>
          </div>
          <div className="font-[200] text-[18px] mt-0 truncate h-[53px] w-[180px]  whitespace-pre-wrap">
            {profileJobdescription}
          </div>
        </div>

        {member.status && (
          <p className=" absolute left-[18px] bottom-[5%] w-[98px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[14px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {member.status}
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
          width={0}
          height={0}
          placeholder={placeHolder}
        />

        <div
          className={`${cn} absolute left-[180px] top-[50%] translate-y-[-50%]`}>
          <div className="flex items-baseline space-x-1">
            <p className="font-[500] text-[32px]">{member.name}</p>
            <p className="font-[500] text-[18px]">{profileGrade}</p>
          </div>
          <div className="font-[200] text-[20px] mt-0 truncate h-[62px] w-[180px]  whitespace-pre-wrap">
            {profileJobdescription}
          </div>
        </div>

        {member.status && (
          <p className=" absolute left-[20px] bottom-[5%] w-[110px] h-[26px] rounded-[10px] bg-[#FF3F5E] text-[14px] text-white font-[600] text-center leading-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {member.status}
          </p>
        )}
      </>
    );
  }
}

export default function MemberStyle2PlaceHolder({
  member,
  className,
  colorStyle,
  sizeStyle,
  onSelect,
  templateName,
}: Props) {
  const photoPath = ServerConsts.photoServerUrl(member.photo, placeHolder);

  console.log("MemberStyle2PlaceHolder sizeStyle", sizeStyle);

  if (templateName === "member_style2_member") {
    return (
      <CardMemberLayoutForMember
        colorStyle={colorStyle}
        sizeStyle={sizeStyle}
        templateStyle="Member"
        onClick={() => onSelect(member)}
        className={`${className} relative flex flex-col w-full h-full active:scale-90  select-none `}>
        {renderContent(member, sizeStyle ?? "Medium", photoPath)}
      </CardMemberLayoutForMember>
    );
  } else if (templateName === "member_style2_leader1") {
    return (
      <CardMemberLayoutForLeader1
        colorStyle={colorStyle}
        sizeStyle={sizeStyle}
        templateStyle="Leader1"
        onClick={() => onSelect(member)}
        className={`${className} relative flex flex-col w-full h-full 
            select-none active:scale-90 `}>
        {renderContent_leader1(member, sizeStyle ?? "Medium", photoPath)}
      </CardMemberLayoutForLeader1>
    );
  } else if (templateName === "member_style2_leader2") {
    return (
      <CardMemberLayoutForLeader2
        colorStyle={colorStyle}
        sizeStyle={sizeStyle}
        templateStyle="Leader2"
        onClick={() => onSelect(member)}
        className={`${className}  relative flex flex-col w-full h-full
            select-none active:scale-90 `}>
        {renderContent_leader2(member, sizeStyle ?? "Medium", photoPath)}
      </CardMemberLayoutForLeader2>
    );
  } else {
    return null;
  }
}

interface CardProps extends PropsWithChildren {
  className?: string;
  colorStyle?: MemberCardColor;
  sizeStyle?: MemberCardSize;
  style?: object;
  templateStyle: "Member" | "Leader1" | "Leader2";
  onClick?: () => void;
}

function CardMemberLayoutForMember({
  className,
  children,
  colorStyle,
  sizeStyle,
  templateStyle,
  style,
  onClick,
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
        onClick={onClick}
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
        onClick={onClick}
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
        onClick={onClick}
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
  sizeStyle,
  templateStyle,
  style,
  onClick,
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

  let roundedCn = "rounded-[10px]";
  switch (templateStyle) {
    case "Member":
      roundedCn = "rounded-2xl";
      break;
    case "Leader1":
      roundedCn = "rounded-tr-3xl rounded-b-3xl px-[6px]";
      break;
    case "Leader2":
      roundedCn = "rounded-br-3xl rounded-t-3xl py-[6px]";
      break;
  }

  if (sizeStyle === "Large") {
    return (
      <div
        style={style}
        onClick={onClick}
        className={`overflow-hidden  relative rounded-tr-3xl rounded-b-3xl shadow-[2px_4px_4px_4px_rgba(0,0,0,0.25)] bg-white   ${className}`}>
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
        onClick={onClick}
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
        onClick={onClick}
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
  sizeStyle,
  templateStyle,
  style,
  onClick,
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
        onClick={onClick}
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
        onClick={onClick}
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
        onClick={onClick}
        className={`overflow-hidden  relative rounded-tr-[30px] rounded-b-[30px] shadow-[2px_4px_4px_4px_rgba(0,0,0,0.25)]  bg-white ${className}`}>
        <div
          className={`${circleCenter} absolute left-[12px] top-[50%] translate-y-[-50%] w-[148px] h-[148px] rounded-full`}></div>
        <div
          className={`${circleLeft} absolute left-[-15%] top-[10px] w-[132px] h-[132px] rounded-full`}></div>
        {children}
      </div>
    );
  }
}
