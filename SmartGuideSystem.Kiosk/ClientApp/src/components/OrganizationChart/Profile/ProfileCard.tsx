import { memo } from "react";
import placeHolder from "src/assets/user-photo-placeholder.svg";
import { ISGUser, MemberCardColor, MemberCardSize } from "@shares/*";
import { ServerConsts } from "src/server/serverConsts";
import ProfileImage from "./ProfileImage";
import { getNormalGradeDesc } from "./util";

import ProfileCardLayout from "./ProfileCardLayout";

const Colors: MemberCardColor[] = [
  "Blue",
  "Green",
  "Mint",
  "Orange",
  "Red",
  "Yellow",
];

interface Props {
  className?: string;
  member: ISGUser;
  onSelect: (member: ISGUser) => void;
  teamIndex?: number;
  colorStyle?: MemberCardColor;
  sizeStyle?: MemberCardSize;
}
export default function ProfileCard({
  member,
  className = "",
  onSelect,
  teamIndex = 3,
  colorStyle,
  sizeStyle = "Medium",
}: Props) {
  const photoPath = ServerConsts.photoServerUrl(member.photo, placeHolder);
  const gradeDesc = getNormalGradeDesc(member);

  if (!colorStyle) {
    colorStyle = Colors[teamIndex % Colors.length];
  }

  if (sizeStyle === "Large") {
    return (
      <BigCard
        member={member}
        className={className}
        onSelect={onSelect}
        photoPath={photoPath}
        gradeDesc={gradeDesc}
        colorStyle={colorStyle}
        sizeStyle={sizeStyle}
      />
    );
  } else if (sizeStyle === "Medium") {
    return (
      <MediumCard
        member={member}
        className={className}
        onSelect={onSelect}
        photoPath={photoPath}
        gradeDesc={gradeDesc}
        sizeStyle={sizeStyle}
        colorStyle={colorStyle}
      />
    );
  } else {
    return (
      <SmallCard
        member={member}
        className={className}
        onSelect={onSelect}
        photoPath={photoPath}
        gradeDesc={gradeDesc}
        sizeStyle={sizeStyle}
        colorStyle={colorStyle}
      />
    );
  }
}

interface CardProps {
  className?: string;
  member: ISGUser;
  photoPath?: string;
  gradeDesc: string;
  colorStyle?: MemberCardColor;
  sizeStyle?: MemberCardSize;
  onSelect: (member: ISGUser) => void;
}

function BigCard({
  className,
  member,
  gradeDesc,
  photoPath,
  onSelect,
  colorStyle,
  sizeStyle,
}: CardProps) {
  return (
    <ProfileCardLayout
      onClick={() => onSelect(member)}
      colorStyle={colorStyle}
      sizeStyle={sizeStyle}
      className={`relative  px-[0px] w-[169px]  h-[86px]  active:scale-95 cursor-pointer  flex justify-start items-center   ${className}`}
    >
      <ProfileImage
        width={56}
        height={65}
        className="absolute left-[5%] top-[50%] translate-y-[-50%]  h-[65px]  rounded-[10px] bg-[#8a8a8a]  select-none "
        src={photoPath}
        placeholder={placeHolder}
      />

      <div className="absolute bottom-[50%] translate-y-[50%] left-[81px] flex flex-col  justify-center text-black">
        <p
          className={`font-medium  leading-none ${
            member.name.length <= 3 ? "text-[22px]" : "text-[16px]"
          }`}
        >
          {member.name}
        </p>
        <p className="text-[12px] leading-none font-bold  mt-1">{gradeDesc}</p>
      </div>
    </ProfileCardLayout>
  );
}

function MediumCard({
  className,
  member,
  gradeDesc,
  photoPath,
  onSelect,
  colorStyle,
  sizeStyle,
}: CardProps) {
  return (
    <ProfileCardLayout
      onClick={() => onSelect(member)}
      colorStyle={colorStyle}
      sizeStyle={sizeStyle}
      className={`relative  w-[148px]  h-[74px] font-medium  active:scale-95  cursor-pointer  flex justify-start items-center  ${className}`}
    >
      <ProfileImage
        width={50}
        height={58}
        className="absolute left-[8px] top-[6px]  h-[58px]  rounded-[10px] bg-[#d9d9d9]  select-none "
        src={photoPath}
        placeholder={placeHolder}
      />

      <div className="absolute bottom-[50%] translate-y-[50%] left-[70px] flex flex-col  justify-center ">
        <p
          className={`  leading-none ${
            member.name.length <= 3 ? "text-[22px]" : "text-[16px]"
          }`}
        >
          {member.name}
        </p>
        <p className="text-[11px] leading-none   mt-1">{gradeDesc}</p>
      </div>
    </ProfileCardLayout>
  );
}

function SmallCard({
  className,
  member,
  gradeDesc,
  photoPath,
  onSelect,
  colorStyle,
  sizeStyle,
}: CardProps) {
  return (
    <ProfileCardLayout
      onClick={() => onSelect(member)}
      colorStyle={colorStyle}
      sizeStyle={sizeStyle}
      className={`relative   px-[0px] w-[105px]  h-[53px] font-medium  active:scale-95   cursor-pointer  flex justify-start items-center   ${className}`}
    >
      <ProfileImage
        width={35}
        height={40}
        className="absolute left-[6px] top-[5px]  h-[40px]  rounded-[10px] bg-[#d9d9d9]  select-none "
        src={photoPath}
        placeholder={placeHolder}
      />

      <div className="absolute bottom-[50%] translate-y-[50%] left-[47px] flex flex-col  justify-center text-black">
        <p
          className={` leading-none ${
            member.name.length <= 3 ? "text-[15px]" : "text-[12px]"
          }`}
        >
          {member.name}
        </p>
        <p className="text-[8px] leading-none  mt-1">{gradeDesc}</p>
      </div>
    </ProfileCardLayout>
  );
}
