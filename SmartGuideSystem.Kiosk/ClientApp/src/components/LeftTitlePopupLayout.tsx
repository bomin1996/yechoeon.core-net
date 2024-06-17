import React, { PropsWithChildren } from "react";
interface Props extends PropsWithChildren {
  className?: string;
  title: string;
  rightTitleStyle?: "ProfileSmall" | "ProfileLarge" | "MeetingInfo";
}
export default function LeftTitlePopupLayout({
  children,
  title,
  className,
  rightTitleStyle = "ProfileSmall",
}: Props) {
  let classRightTitle = " h-[70px] w-[395px] text-[40px] font-[500]";
  switch (rightTitleStyle) {
    case "ProfileSmall":
      classRightTitle = " h-[70px] w-[276px] text-[23px] font-[500]";
      break;
    case "ProfileLarge":
      classRightTitle = " h-[70px] w-[395px] text-[28px] font-[500]";
      break;
    case "MeetingInfo":
      classRightTitle = " h-[90px] w-[395px] text-[40px] font-[500]";
      break;
  }
  return (
    <div className={`rounded-[50px] relative bg-white ${className}`}>
      <div
        className={`${classRightTitle} absolute right-0 top-0 text-center flex bg-[#131834] text-white  rounded-tr-[50px] rounded-bl-[80px]`}
      >
        <span className="m-auto">{title}</span>
      </div>
      {children}
    </div>
  );
}
