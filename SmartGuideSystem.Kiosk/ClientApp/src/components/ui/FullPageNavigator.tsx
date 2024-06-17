import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
interface Props {
  navigatorType: "Dark" | "Light";
  className?: string;
  classNameLeftButton?: string;
  classNameRightButton?: string;
  pageNum: number;
  pageTotalCount: number;
  onClickNext?: () => void;
  onClickPrev?: () => void;
}
export default function FullPageNavigator({
  navigatorType,
  className,
  classNameLeftButton,
  classNameRightButton,
  pageNum,
  pageTotalCount,
  onClickNext,
  onClickPrev,
}: Props) {
  const styleClassName =
    navigatorType === "Dark"
      ? "stroke-accent-title h-20 w-20 p-2  rounded-full "
      : "stroke-white h-20 w-20 p-2  rounded-full ";

  const canPrev = pageNum > 1 && pageTotalCount > 1;
  const canNext = pageTotalCount > 1 && pageNum < pageTotalCount;

  return (
    <>
      <ChevronLeftIcon
        className={`${styleClassName}   absolute left-0  top-[50%] translate-y-[-50%] ${className}  ${classNameLeftButton} ${
          canPrev ? "active:scale-90 active:bg-black/10" : " opacity-30"
        } `}
        onClick={() => {
          if (canPrev) {
            onClickPrev?.();
          }
        }}
      />
      <ChevronRightIcon
        className={`${styleClassName}    absolute right-0  top-[50%] translate-y-[-50%] ${className} ${classNameRightButton} ${
          canNext ? "active:scale-90 active:bg-black/10" : " opacity-30"
        }`}
        onClick={() => {
          if (canNext) {
            onClickNext?.();
          }
        }}
      />
    </>
  );
}
