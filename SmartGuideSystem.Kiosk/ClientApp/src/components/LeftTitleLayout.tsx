import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  layoutStyle?: "Horizontal" | "Vertical";
  className?: string;
}

export default function LeftTitleLayout({
  children,
  title,
  className,
  layoutStyle = "Horizontal",
}: Props) {
  if (layoutStyle === "Horizontal") {
    return (
      <div
        className={`${className} bg-right bg-no-repeat bg-contain bg-[url('assets/frame/conference-main/meeting_schedule_back.png')]`}>
        {children}
        <p className="absolute w-[527px]  top-[40px] left-[70px] font-[600] text-[40px] text-white text-center">
          {title}
        </p>
      </div>
    );
  } else if (layoutStyle === "Vertical") {
    return (
      <div
        className={`${className} bg-right bg-no-repeat bg-contain bg-[url('assets/background/gosi_w_back-1.png')]`}>
        {children}
        <p className="absolute w-[357px]  top-[190px] right-[0px] font-[600] text-[40px] text-white text-center ">
          {title}
        </p>
      </div>
    );
  } else {
    return null;
  }
}
