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
  const profileGrade = selectString(
    member.profileGrade,
    member.positionName,
    "주무관"
  );

  const profileJobdescription = selectString(
    member.profileJobDescription,
    member.jobDescription
  );

  switch (sizeStyle) {
    case "Large":
      return (
        <>
          <div className={`absolute left-[53%] top-[50%] translate-y-[-50%]`}>
            <div className="font-[500] text-[22px]">
              <p className="font-[500] text-[27px]">{member.name}</p>
              <p className="font-[500] text-[12px]">{profileGrade}</p>
            </div>
          </div>
          <ProfileImage
            className="absolute left-[20px] top-[50%] translate-y-[-50%] h-[92%]  rounded-[20px] flex-shrink-0"
            src={photoPath}
            width={0}
            height={0}
            placeholder={placeHolder}
          />
        </>
      );
    case "Medium":
      return (
        <>
          <div className={` absolute left-[53%] top-[50%] translate-y-[-50%]`}>
            <div className="font-[500] text-[22px]">
              <p className="font-[500] text-[27px]">{member.name}</p>
              <p className="font-[500] text-[12px]">{profileGrade}</p>
            </div>
          </div>
          <ProfileImage
            width={0}
            height={0}
            className="absolute left-[20px] top-[50%] translate-y-[-50%] h-[92%]  rounded-[20px] flex-shrink-0"
            src={photoPath}
            placeholder={placeHolder}
          />
        </>
      );
    case "Small":
      return (
        <>
          <div className={` absolute left-[55%] top-[50%] translate-y-[-50%]`}>
            <div className="font-[500] text-[22px]">
              <p className="font-[500] text-[20px]">{member.name}</p>
              <p className="font-[500] text-[12px]">{profileGrade}</p>
            </div>
          </div>
          <ProfileImage
            width={0}
            height={0}
            className="absolute left-[15px] top-[50%] translate-y-[-50%] h-[92%]  rounded-[20px] flex-shrink-0"
            src={photoPath}
            placeholder={placeHolder}
          />
        </>
      );
  }
}

function renderContent_leader1(
  member: ISGUser,
  sizeStyle: MemberCardSize,
  photoPath?: string
) {
  const profileGrade = selectString(
    member.profileGrade,
    member.positionName,
    "주무관"
  );

  const profileJobdescription = selectString(
    member.profileJobDescription,
    member.jobDescription
  );

  switch (sizeStyle) {
    case "Large":
      return (
        <>
          <div className={` absolute left-[53%] top-[50%] translate-y-[-50%]`}>
            <div className="font-[500] text-[22px]">
              <p className="font-[500] text-[27px]">{member.name}</p>
              <p className="font-[500] text-[12px]">{profileGrade}</p>
            </div>
            <div className="font-[300] text-[11px] truncate h-[30px] w-[110px] whitespace-pre-wrap">
              {profileJobdescription}
            </div>
          </div>
          <ProfileImage
            width={0}
            height={0}
            className="absolute left-[25%] translate-x-[-50%] top-[50%] translate-y-[-50%] h-[92%]  rounded-[20px] flex-shrink-0"
            src={photoPath}
            placeholder={placeHolder}
          />
        </>
      );
    case "Medium":
      return (
        <>
          <div className={` absolute left-[53%] top-[50%] translate-y-[-50%]`}>
            <div className="font-[500] text-[22px]">
              <p className="font-[500] text-[27px]">{member.name}</p>
              <p className="font-[500] text-[12px]">{profileGrade}</p>
            </div>
            <div className="font-[300] text-[11px] truncate h-[30px] w-[110px] whitespace-pre-wrap">
              {profileJobdescription}
            </div>
          </div>
          <ProfileImage
            width={0}
            height={0}
            className="absolute left-[20px] top-[50%] translate-y-[-50%] h-[92%]  rounded-[20px] flex-shrink-0"
            src={photoPath}
            placeholder={placeHolder}
          />
        </>
      );
    case "Small":
      return (
        <>
          <div className={` absolute left-[55%] top-[50%] translate-y-[-50%]`}>
            <div className="font-[500] text-[22px]">
              <p className="font-[500] text-[20px]">{member.name}</p>
              <p className="font-[500] text-[12px]">{profileGrade}</p>
            </div>
            <div className="font-[300] text-[11px] truncate h-[30px] w-[110px] whitespace-pre-wrap">
              {profileJobdescription}
            </div>
          </div>
          <ProfileImage
            width={0}
            height={0}
            className="absolute left-[15px] top-[50%] translate-y-[-50%] h-[92%]  rounded-[20px] flex-shrink-0"
            src={photoPath}
            placeholder={placeHolder}
          />
        </>
      );
  }
}

export default function MemberStyle1PlaceHolder({
  member,
  className,
  colorStyle,
  sizeStyle,
  onSelect,
  templateName,
}: Props) {
  const photoPath = ServerConsts.photoServerUrl(member.photo, placeHolder);

  if (templateName === "member_style1_member") {
    return (
      <CardMemberLayout
        colorStyle={colorStyle}
        sizeStyle={sizeStyle}
        templateStyle="Member"
        onClick={() => onSelect(member)}
        className={`${className} relative flex flex-col w-full h-full border-black hover:bg-sky-500/30 select-none hover:border-dashed hover:border-2 `}
      >
        {renderContent(member, sizeStyle ?? "Small", photoPath)}
      </CardMemberLayout>
    );
  } else if (templateName === "member_style1_leader1") {
    return (
      <CardMemberLayout
        colorStyle={colorStyle}
        sizeStyle={sizeStyle}
        templateStyle="Leader1"
        onClick={() => onSelect(member)}
        className={`${className} relative flex flex-col w-full h-full border-black hover:bg-sky-500/30 select-none hover:border-dashed hover:border-2 `}
      >
        {renderContent_leader1(member, sizeStyle ?? "Small", photoPath)}
      </CardMemberLayout>
    );
  } else if (templateName === "member_style1_leader2") {
    return (
      <CardMemberLayout
        colorStyle={colorStyle}
        sizeStyle={sizeStyle}
        templateStyle="Leader2"
        onClick={() => onSelect(member)}
        className={`${className}  relative flex flex-col w-full h-full border-black hover:bg-sky-500/30 select-none hover:border-dashed hover:border-2 `}
      >
        {renderContent_leader1(member, sizeStyle ?? "Small", photoPath)}
      </CardMemberLayout>
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

function CardMemberLayout({
  className,
  children,
  colorStyle,
  templateStyle,
  style,
  onClick,
}: CardProps) {
  let cn1 = "bg-red-600";
  let cn2 = "bg-red-400";

  switch (colorStyle) {
    case "Blue":
      cn1 = "fill-[#607FBD]";
      cn2 = "bg-[#607FBD]";
      break;
    case "Yellow":
      cn1 = "fill-[#FCB004]";
      cn2 = "bg-[#FCB004]";
      break;
    case "Mint":
      cn1 = "fill-[#7FBFC7]";
      cn2 = "bg-[#7FBFC7]";
      break;
    case "Red":
      cn1 = "fill-[#FF3F5E]";
      cn2 = "bg-[#FF3F5E]";
      break;
    case "Orange":
      cn1 = "fill-[#FD865B]";
      cn2 = "bg-[#FD865B]";
      break;
    case "Green":
      cn1 = "fill-[#60BD9B]";
      cn2 = "bg-[#60BD9B]";
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

  return (
    <div
      style={style}
      onClick={onClick}
      className={`overflow-hidden  relative ${roundedCn} shadow-[2px_4px_4px_4px_rgba(0,0,0,0.25)]    ${cn2}  ${className}`}
    >
      <svg
        // width="70"
        // height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className={`absolute ${cn1}  h-[90%] top-[50%] translate-y-[-50%] left-[3%] mr-auto my-auto`}
      >
        <g clipPath="url(#clip0_519_224)">
          <path
            d="M48.526 6.00489e-05C60.4318 9.39331 65.7148 23.8095 61.7336 38.8879C58.7975 50.0122 51.253 57.5231 43.4425 61.7231C34.5868 66.4906 25.8736 67.3136 17.8161 65.4501C13.8538 64.5325 12.9417 64.0217 10.6992 63.1231C14.4334 65.5541 18.3957 67.6541 23.7737 68.9312C34.0452 71.3623 44.7633 69.565 53.3054 64.0595C60.9924 59.1123 67.3966 50.4379 69.259 41.196C72.5656 24.7839 64.6411 6.7825 48.526 -0.00939941V6.00489e-05Z"
            // fill="#1A7CC8"
          />
          <path
            d="M58.9876 31.6702C58.9876 31.6702 50.3219 29.2297 40.9056 35.6054C40.9056 35.6054 37.8935 37.2986 31.4893 44.9892C31.4893 44.9892 24.2204 55.5175 12.8277 50.4567C12.8277 50.4567 6.18593 47.9878 2.67975 40.6567C0.437322 35.9932 -1.53906 28.9838 1.72007 20.1297C1.72007 20.1297 3.73446 13.9621 9.57808 9.25132C14.1295 5.59051 21.902 2.00538 31.3943 4.0297C31.3943 4.0297 41.6088 5.7797 47.4809 14.7851C47.4809 14.7851 36.1357 4.90943 21.1133 10.6608C21.1133 10.6608 3.69645 16.5256 5.21674 37.327C5.21674 37.327 5.80586 49.4824 15.2222 48.9054C15.2222 48.9054 19.7641 49.3216 24.9806 41.7162C24.9806 41.7162 29.5889 35.0378 38.0646 32.0392C38.0646 32.0392 43.5281 30.5351 45.0389 30.5351C45.0389 30.5351 38.5397 30.0432 31.6698 33.7229C31.6698 33.7229 26.5389 35.8513 21.8069 42.4824C21.8069 42.4824 17.8732 48.6027 12.6852 46.8811C12.6852 46.8811 15.3457 35.8608 26.2063 30.5351C26.2063 30.5351 41.2952 22.2581 58.9781 31.6608L58.9876 31.6702Z"
            // fill="#1A7CC8"
          />
        </g>
        <defs>
          <clipPath id="clip0_519_224">
            <rect width="70" height="70" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <div className={`w-full h-full bg-white flex ${roundedCn}`}>
        {children}
      </div>
    </div>
  );
}
