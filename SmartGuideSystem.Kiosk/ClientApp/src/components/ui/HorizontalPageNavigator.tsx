import React, { MouseEventHandler, FC, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PageIndicatorProps {
  pageCount: number;
  selectedIndex: number;
  className?: string;
  indicatorClassName?: string;
}

const PageIndicator: FC<PageIndicatorProps> = ({
  pageCount,
  selectedIndex,
  className,
  indicatorClassName,
}) => {
  const indicators = [];

  const selIndex = Math.min(pageCount - 1, selectedIndex);

  for (let i = 0; i < pageCount; i++) {
    if (i !== selIndex) {
      indicators.push(
        <div
          key={i}
          className={`w-[16px] h-[16px] rounded-full transition bg-[#cacaca] ${indicatorClassName}`}
        ></div>
      );
    } else {
      indicators.push(
        <div
          key={i}
          className={`w-[16px] h-[16px] rounded-full transition scale-150 bg-[#131834] ${indicatorClassName}`}
        ></div>
      );
    }
  }

  return (
    <div
      className={`flex flex-row space-x-[20px] transition-transform  ${className}`}
    >
      {indicators}
    </div>
  );
};

interface Props {
  pageCount: number;
  activeIndex: number;
  className?: string;
  isVisibleIndicator?: boolean;
  visibleButtonText?: boolean;
  visibleButton?: boolean;
  onClickPrev: (index: number) => void;
  onClickNext: (index: number) => void;
}

const HorizontalPageNavigator: React.FC<Props> = ({
  pageCount,
  activeIndex,
  isVisibleIndicator,
  className = "w-full",
  onClickNext,
  onClickPrev,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(activeIndex);
  const canPrev = selectedIndex > 0 && pageCount > 1;
  const canNext = selectedIndex + 1 < pageCount && pageCount > 1;

  const handleClickPrev = () => {
    const index = selectedIndex - 1;
    setSelectedIndex(index);
    onClickPrev(index);
  };
  const handleClickNext = () => {
    const index = selectedIndex + 1;
    setSelectedIndex(index);
    onClickNext(index);
  };

  return (
    <div className={`${className} h-24 flex justify-between items-center`}>
      <button
        onClick={handleClickPrev}
        disabled={!canPrev}
        className="flex items-center font-bold text-lg p-4 rounded-full text-white stroke-white disabled:text-gray-500 disabled:stroke-gray-500"
      >
        <ChevronLeftIcon className="w-16 h-16" />
        <span>이전 페이지</span>
      </button>

      {/* <h1 className="text-white">Page Index = {selectedIndex}</h1> */}

      {isVisibleIndicator && (
        <PageIndicator pageCount={pageCount} selectedIndex={selectedIndex} />
      )}

      <button
        onClick={handleClickNext}
        disabled={!canNext}
        className="flex items-center font-bold text-[18px] p-4 rounded-full text-white stroke-white disabled:text-gray-500 disabled:stroke-gray-500"
      >
        <span>다음 페이지</span>
        <ChevronRightIcon className="w-16 h-16" />
      </button>
    </div>
  );
};

export default HorizontalPageNavigator;

// 상태를 가지면 안된다.

const HorizontalPageControl: React.FC<Props> = ({
  pageCount,
  activeIndex,
  isVisibleIndicator,
  visibleButtonText = true,
  visibleButton = true,
  className = "w-full h-24",
  onClickNext,
  onClickPrev,
}) => {
  const canPrev = activeIndex > 0 && pageCount > 1;
  const canNext = activeIndex + 1 < pageCount && pageCount > 1;

  const handleClickPrev = () => {
    const index = activeIndex - 1;
    onClickPrev(index);
  };
  const handleClickNext = () => {
    const index = activeIndex + 1;
    onClickNext(index);
  };

  return (
    <div
      className={`text-[30px] flex justify-center items-center ${className} `}
    >
      <button
        onClick={handleClickPrev}
        disabled={!canPrev}
        className="flex items-center  font-bold active:outline-none active:scale-95 focus:outline-none  p-4 rounded-full text-white  disabled:text-white/50 "
      >
        {visibleButton && (
          <ChevronLeftIcon className="w-16 h-16 stroke-[#131834] disabled:stroke-white/50" />
        )}
        {visibleButtonText && <span>이전 페이지</span>}
      </button>

      {/* <h1 className="text-white">Page Index = {selectedIndex}</h1> */}

      {isVisibleIndicator && (
        <PageIndicator
          indicatorClassName="w-[10px] h-[10px]"
          pageCount={pageCount}
          selectedIndex={activeIndex}
        />
      )}

      <button
        onClick={handleClickNext}
        disabled={!canNext}
        className="flex items-center stroke-[#131834] font-bold p-4 active:outline-none active:scale-95 focus:outline-none rounded-full text-white disabled:text-white/50 disabled:stroke-white/50"
      >
        {visibleButtonText && <span>다음 페이지</span>}

        {visibleButton && (
          <ChevronRightIcon className="w-16 h-16 stroke-[#131834] disabled:stroke-white/50" />
        )}
      </button>
    </div>
  );
};

export { HorizontalPageControl };
