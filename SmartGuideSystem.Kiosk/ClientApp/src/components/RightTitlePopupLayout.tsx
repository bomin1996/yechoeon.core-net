import React, { PropsWithChildren } from "react";
// import logImg from "src/assets/jin_logo.svg";
import { DIALOG_LOGO_IMAGE } from "src/const";
interface Props extends PropsWithChildren {
  className?: string;
  title: string;
  modalStyle?: "Member" | "Leader" | "Team" | "MeetingInfo";
  visibleLogo?: boolean;
}
export default function RightTitlePopupLayout({
  children,
  title,
  className,
  modalStyle = "Member",
  visibleLogo = true,
}: Props) {
  let cn1 = "rounded-[50px]";
  let cn2 =
    "h-[90px] rounded-tr-[50px] rounded-bl-[80px] text-[40px] font-[500] w-[395px] ";
  switch (modalStyle) {
    case "Member":
      cn2 =
        "h-[70px] rounded-tr-[50px] rounded-bl-[50px] text-[23px] font-[500] w-[276px] ";
      break;
    case "Leader":
      cn2 =
        "h-[70px] rounded-tr-[50px] rounded-bl-[50px] text-[28px] font-[500] w-[395px] ";
      break;
    case "Team":
      cn2 =
        "h-[70px] rounded-tr-[50px] rounded-bl-[50px] text-[28px] font-[500] w-[320px] ";
      break;
    case "MeetingInfo":
      cn2 =
        "h-[90px] rounded-tr-[50px] rounded-bl-[50px] text-[40px] font-[500] w-[395px] ";
      break;
  }

  return (
    <div className={` relative bg-white ${className} ${cn1}`}>
      <div
        className={`absolute right-[-1px] top-[-1px] top-text-center flex bg-accent-popupTitle text-white  ${cn2}`}
      >
        <span className="m-auto">{title}</span>
      </div>
      {children}
      {visibleLogo && (
        <img
          className="absolute right-[5%] bottom-[8%] h-[103px] opacity-50 "
          height={103}
          src={DIALOG_LOGO_IMAGE}
          alt=""
        />
      )}
    </div>
  );
}
