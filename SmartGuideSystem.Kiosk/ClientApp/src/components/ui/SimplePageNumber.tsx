import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Props {
  className?: string;
  totalCountClassName?: string;
  pageNum: number;
  pageTotalCount: number;
  showButtons?: boolean;
  onClickNext?: () => void;
  onClickPrev?: () => void;
}

export default function SimplePageNumber({
  className,
  pageNum,
  pageTotalCount,
  totalCountClassName,
  showButtons = false,
  onClickNext,
  onClickPrev,
}: Props) {
  const canPrev = pageNum > 1 && pageTotalCount > 1;
  const canNext = pageTotalCount > 1 && pageNum < pageTotalCount;
  return (
    <div
      className={`flex flex-row items-center ${className}  text-white text-[24px] `}>
      {showButtons && (
        <ChevronLeftIcon
          className={`stroke-button-default h-16 w-16 p-2 mr-10  rounded-full ${
            canPrev
              ? "stroke-button-default active:scale-90 active:bg-black/10"
              : "stroke-button-default/50"
          }`}
          onClick={() => {
            if (canPrev && onClickPrev) {
              onClickPrev();
            }
          }}
        />
      )}
      <span className="">{pageNum}</span>
      <span className="mx-4"> / </span>
      <span className={`${totalCountClassName}`}>{pageTotalCount}</span>
      {showButtons && (
        <ChevronRightIcon
          className={`stroke-button-default h-16 w-16 p-2 ml-10  rounded-full ${
            canNext
              ? "stroke-button-default active:scale-90 active:bg-black/10"
              : "stroke-button-default/50"
          }`}
          onClick={() => {
            if (canNext && onClickNext) {
              onClickNext();
            }
          }}
        />
      )}
    </div>
  );
}
