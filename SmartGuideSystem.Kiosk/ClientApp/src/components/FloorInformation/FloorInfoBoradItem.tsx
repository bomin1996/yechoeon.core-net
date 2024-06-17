import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  childclassName?: string;
  floorTitle: string;
  as?: "table" | "div";
  onClick?: () => void;
}

export default function FloorInfoBoradItem({
  floorTitle,
  className,
  childclassName,
  children,
  onClick,
  as = "table",
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`${className} flex items-stretch text-black border-b-[2px] border-[#d2d2d2] active:bg-[#607FBD]/10`}
    >
      <div className="flex w-[43px] bg-[#f2f2f2]  flex-shrink-0 flex-grow-0">
        <span className="m-auto text-[16px] font-[900]">{floorTitle}</span>
      </div>
      <div className="px-[6px] py-[8px] w-full text-[14px] leading-[22px]">
        {as === "table" ? (
          <table className={`${childclassName}  w-full `}>{children}</table>
        ) : (
          <div className={`${childclassName}   w-full `}>{children}</div>
        )}
      </div>
    </div>
  );
}
