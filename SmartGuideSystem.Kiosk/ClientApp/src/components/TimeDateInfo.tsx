import React from "react";
import useTimeAndDate from "src/hooks/useTimeAndDate";
interface Props {
  className?: string;
}
export default function TimeDateInfo({ className }: Props) {
  const { timeInfo, dateInfo } = useTimeAndDate();

  return (
    <div className={`flex flex-col ${className}`}>
      <p className="font-bold text-[24px]">{dateInfo}</p>
      <p className="font-extrabold text-[36px]">{timeInfo}</p>
    </div>
  );
}
