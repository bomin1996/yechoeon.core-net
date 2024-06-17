import {
  FilmIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { ISGContent } from "@shares/ISGContent";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shad-components/ui/tooltip";

interface Props {
  contentItem: ISGContent;
  isSelected: boolean;
  boxStyle: "List" | "Box";
  onClick?: () => void;
}
export default function ContentListItem({
  contentItem,
  isSelected,
  onClick,
  boxStyle,
}: Props) {
  return (
    <div
      draggable={true}
      onClick={onClick}
      onContextMenu={onClick}
      onDragStartCapture={(ev) => {
        ev.dataTransfer.setData("content", JSON.stringify(contentItem));
      }}
      className={`relative flex w-full flex-row items-center my-1 py-2 px-2 hover:font-bold bg-white hover:bg-black/10 border-2 rounded-md cursor-pointer ${
        isSelected ? " border-black/80 font-bold " : "border-gray-100"
      }`}
    >
     

      {boxStyle === "Box" ? (
        <BoxItem contentItem={contentItem} />
      ) : (
        <ListItem contentItem={contentItem} />
      )}
    </div>
  );
}

interface ItemProps {
  contentItem: ISGContent;
}

function ListItem({ contentItem }: ItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full pl-5">
          <div className="w-full text-left text-sm truncate">
            {contentItem.uploadFileName}
            {contentItem.contentType === "video" ? (
              <FilmIcon className="h-5 w-5 absolute left-1 top-[50%] translate-y-[-50%] bg-slate-50" />
            ) : (
              <PhotoIcon className="h-5 w-5  absolute left-1 top-[50%] translate-y-[-50%] bg-slate-50" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{contentItem.uploadFileName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function BoxItem({ contentItem }: ItemProps) {
  return (
    <div
      draggable={false}
      className="relative text-xs font-normal w-[128px] h-[128px] pt-[78px] flex-shrink-0 flex-grow-0 rounded-sm"
    >
      <img
        draggable={false}
        className="w-full h-[72px] object-cover absolute left-0 top-0"
        src={contentItem.thumbnail}
        alt=""
      />



      {contentItem.contentType === "video" ? (
        <FilmIcon className="h-5 w-5 absolute right-0 top-[52px] " />
      ) : (
        <PhotoIcon className="h-5 w-5  absolute right-0 top-[52px] " />
      )}

      <div className="w-full h-full text-xs font-medium line-clamp-3">
        {contentItem.uploadFileName}
      </div>
    </div>
  );
}
