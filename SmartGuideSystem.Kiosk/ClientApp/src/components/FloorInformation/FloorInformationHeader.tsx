import React, { PropsWithChildren } from "react";

interface Props {
  className?: string;
  title1?: string;
  title2?: string;
}

export default function FloorInformationHeader({
  className,
  title1,
  title2,
}: Props) {
  return (
    <div
      className={`${className} text-black text-[15px] font-[500] bg-[#def1ff] h-[33px] flex justify-around border-[#d2d2d2] border-t-[2px] border-b-[2px]`}
    >
      {title1 && <FloorInformationHeaderItem title={title1} />}
      {title2 && <FloorInformationHeaderItem title={title2} />}
    </div>
  );
}

interface Props2 {
  className?: string;
  title: string;
}

export function FloorInformationHeaderItem({ title, className }: Props2) {
  return <span className={`${className} m-auto`}>{title}</span>;
}
