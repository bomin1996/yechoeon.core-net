import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shad-components/ui/tooltip";
import { BaseContentViewModel } from "@/viewmodels/cms/BaseContentViewModel";
import { SceneSegmentViewModel } from "@/viewmodels/cms/SceneSegmentViewModel";
import { FilmIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react";

interface Props {
  className?: string;
  segment?: SceneSegmentViewModel;
  itemStyle: "List" | "Box";
}

export default observer(function SegmentContentList({
  className,
  segment,
  itemStyle,
}: Props) {
  const count2 = segment?.contents.length; // do not delete this!!
  console.log("count", count2);
  return (
    <div className={`${className} p-2 rounded-lg bg-white`}>
      <div
        className={`grid gap-y-2 ${
          itemStyle === "List" ? "grid-cols-1" : "grid-cols-2 gap-x-2"
        }`}
      >
        {segment?.contents.map((cvm, idx) => (
          <SegmentContentItemObv
            key={idx}
            contentVM={cvm}
            itemStyle={itemStyle}
          />
        ))}
      </div>
    </div>
  );
});

interface ItemProps {
  contentVM: BaseContentViewModel;
  itemStyle: "List" | "Box";
}

const SegmentContentItemObv = observer(function SegmentContentItem({
  contentVM,
  itemStyle,
}: ItemProps) {
  return (
    <div
      draggable={true}
      onDragOver={(ev) => {
        if (
          ev.dataTransfer.types &&
          ev.dataTransfer.types.includes("contentVM")
        ) {
          ev.preventDefault();
        }
      }}
      onDragStart={(ev) => {
        ev.dataTransfer.setData("contentVM", JSON.stringify(contentVM));
      }}
      className="relative w-full bg-slate-100 text-left text-sm truncate hover:outline hover:outline-black"
    >
      {itemStyle === "List" ? (
        <SegmentContentListItemObv contentVM={contentVM} />
      ) : (
        <SegmentContentBoxItemObv contentVM={contentVM} />
      )}
    </div>
  );
});

interface ItemProps2 {
  contentVM: BaseContentViewModel;
}

const SegmentContentListItemObv = observer(function SegmentContentListItem({
  contentVM,
}: ItemProps2) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full pl-6 pr-6 py-2 ">
          <div className="w-full text-left text-sm truncate">
            {contentVM.name}
            {contentVM.contentType === "video" ? (
              <FilmIcon className="h-5 w-5 absolute left-1 top-[50%] translate-y-[-50%] bg-slate-50" />
            ) : (
              <PhotoIcon className="h-5 w-5  absolute left-1 top-[50%] translate-y-[-50%] bg-slate-50" />
            )}

            <XMarkIcon className="h-5 w-5  absolute right-1 top-[50%] translate-y-[-50%] bg-slate-50" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{contentVM.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

const SegmentContentBoxItemObv = observer(function SegmentContentBoxItem({
  contentVM,
}: ItemProps2) {
  return (
    <div
      draggable={false}
      className="relative text-xs font-normal w-full h-[128px] pt-[78px] flex-shrink-0 flex-grow-0 rounded-sm"
    >
      <img
        draggable={false}
        className="w-full h-[72px] object-cover absolute left-0 top-0"
        src={contentVM.thumbnail}
        alt=""
      />

      {contentVM.contentType === "video" ? (
        <FilmIcon className="h-5 w-5 absolute right-0 top-[52px] " />
      ) : (
        <PhotoIcon className="h-5 w-5  absolute right-0 top-[52px] " />
      )}

      <div className="w-full h-full text-xs font-medium line-clamp-3 truncate">
        {contentVM.fileName}
      </div>
    </div>
  );
});
