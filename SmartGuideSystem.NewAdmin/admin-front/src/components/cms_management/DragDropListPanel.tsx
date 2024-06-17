import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FilmIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { PropsWithChildren } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
  OnDragStartResponder,
} from "react-beautiful-dnd";
import { BaseContentViewModel } from "@/viewmodels/cms/BaseContentViewModel";
import { SceneSegmentViewModel } from "@/viewmodels/cms/SceneSegmentViewModel";

// import {
//   ContextMenu,
//   ContextMenuContent,
//   ContextMenuItem,
//   ContextMenuTrigger,
// } from "@/shad-components/ui/context-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shad-components/ui/tooltip";

interface Props {
  className?: string;
  segment?: SceneSegmentViewModel;
  itemStyle: "List" | "Box";
}

export default observer(function DragDropListPanel({
  segment,
  className,
  itemStyle,
}: Props) {
  const handleDrop: OnDragEndResponder = (droppedItem) => {
    runInAction(() => {
      if (!droppedItem.destination) return;

      if (segment) {
        const srcIndex = droppedItem.source.index;
        const dstIndex = droppedItem.destination.index;
        const targetContentVM = segment.contents[srcIndex];
        segment.contents.splice(srcIndex, 1);
        segment.contents.splice(dstIndex, 0, targetContentVM);
        segment.updateThumbnail();
      }
    });
  };

  const handleDragStart: OnDragStartResponder = (droppedItem) => {
    if (!droppedItem.source) return;
    if (segment) {
      const srcIndex = droppedItem.source.index;
      const targetContentVM = segment.contents[srcIndex];
      segment.selected = targetContentVM;
    }
  };

  const itemList = segment?.contents;
  const count2 = segment?.contents.length; //WTF!! Do not delete this!!
  console.log('count is ', count2)
  return (
    <div className={`${className} overflow-y-auto`}>
      <TooltipProvider>
        <div className="rounded-xl h-full bg-white p-2 ">
          <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDrop}>
            <Droppable droppableId="list-container">
              {(provided) => (
                <div
                  className={` ${
                    itemStyle === "List"
                      ? "flex flex-col space-y-2 "
                      : "flex flex-col space-y-2 "
                  }`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {itemList?.map((item, index) => (
                    <MyTooltip contentVM={item}>
                      <Draggable
                        key={index}
                        draggableId={`${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className={`${snapshot.isDragging ? "" : ""} `}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            {/* <ItemContextMenu>
                              <DragListItemObvs
                                className=""
                                onClick={() => {
                                  if (segment) {
                                    segment.selected = item;
                                  }
                                }}
                                itemStyle={itemStyle}
                                contentVM={item}
                                isSelcect={false}
                                isDragging={snapshot.isDragging}
                                onDeleteItemClick={() => {
                                  segment?.removeContent(item);
                                }}
                              />
                            </ItemContextMenu> */}
                            <DragListItemObvs
                              className=""
                              onClick={() => {
                                if (segment) {
                                  segment.selected = item;
                                }
                              }}
                              itemStyle={itemStyle}
                              contentVM={item}
                              isSelcect={false}
                              isDragging={snapshot.isDragging}
                              onDeleteItemClick={() => {
                                segment?.removeContent(item);
                              }}
                            />
                          </div>
                        )}
                      </Draggable>
                    </MyTooltip>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </TooltipProvider>
    </div>
  );
});

interface DragListItemProps {
  className?: string;
  // name: string;
  contentVM: BaseContentViewModel;
  isSelcect: boolean;
  isDragging: boolean;
  itemStyle: "List" | "Box";
  onDeleteItemClick: () => void;
  onClick: () => void;
}

// function DragListItem({
//   className,
//   // name,
//   contentVM,
//   isSelcect,
//   itemStyle,
//   isDragging,
//   onDeleteItemClick,
//   onClick,
// }: DragListItemProps) {
//   return (
//     <div
//       onClick={onClick}
//       className={`${className} flex flex-col space-x-1 justify-start  items-center
//        hover:border-blue-400 hover:bg-blue-200 hover:border-2 hover:rounded-sm px-2
//        ${
//          isDragging
//            ? "bg-slate-50/50 border border-gray-400 px-3 py-3 rounded-lg "
//            : ""
//        }
//        ${contentVM.isSelected ? "font-bold" : "font-normal"}
//        `}
//     >
//       {itemStyle === "Box" && (
//         <img
//           className="w-full min-h-[64px] object-contain h-[128px] bg-black"
//           src={contentVM.thumbnail}
//           alt=""
//         />
//       )}

//       {/* <PhotoIcon className="w-5 h-5" />
//       <FilmIcon className="h-5 w-5" />
//       <span className="flex-1 text-left truncate">{contentVM.name}</span>
//       <TrashIcon
//         className="ml-auto mr-2 hover:text-blue-900 cursor-pointer"
//         width={20}
//         onClick={onDeleteItemClick}
//       /> */}

//       <div className="flex w-full justify-start items-center">
//         {contentVM.isSelected && <CheckCircleIcon className="h-6 w-6" />}
//         {contentVM.contentType === "video" ? (
//           <FilmIcon className="h-8 w-8 mr-2 float-left flex-shrink-0" />
//         ) : (
//           <PhotoIcon className="h-8 w-8 mr-2 float-left flex-shrink-0" />
//         )}

//         <p className="w-full flex-1 text-sm line-clamp-2 hover:line-clamp-none ">
//           {contentVM.name}
//         </p>

//         <TrashIcon
//           className="h-6 w-6 stroke-black/50 hover:stroke-red-500 cursor-pointer"
//           onClick={onDeleteItemClick}
//         />
//       </div>
//     </div>
//   );
// }

function DragListItem2({
  className,
  // name,
  contentVM,
  isSelcect,
  itemStyle,
  isDragging,
  onDeleteItemClick,
  onClick,
}: DragListItemProps) {
  return (
    <div
      onClick={onClick}
      className={`${className} relative py-2 px-2
        border border-black/10
       hover:outline hover:outline-black/30 hover:bg-black/5 
       ${isDragging ? "rounded-lg " : ""}
       ${
         contentVM.isSelected
           ? "font-bold outline outline-black bg-black/30"
           : "font-normal"
       }
       `}
    >
      {/* {itemStyle === "Box" && (
        <div className="relative bg-slate-400 w-[72px] h-[72px]  flex-shrink-0 rounded-lg overflow-hidden">
          <img
            className="object-cover h-full w-full"
            src={contentVM.thumbnail}
            alt=""
          />

          <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b via-white/5  from-transparent to-white/50"></div>

          {contentVM.isSelected && (
            <CheckCircleIcon className="absolute left-0 top-0 h-5 w-5 fill-green-500" />
          )}

          {contentVM.contentType === "video" ? (
            <FilmIcon className="h-5 w-5 absolute right-0 bottom-0 " />
          ) : (
            <PhotoIcon className="h-5 w-5 absolute right-0 bottom-0 " />
          )}
        </div>
      )}

      <div className="flex-1 h-full flex justify-start items-center">
        <p className="w-full flex-1 text-[12px] line-clamp-3 hover:line-clamp-none ">
          {contentVM.name}
        </p>

        <TrashIcon
          className="h-6 w-6 stroke-black/50 hover:stroke-red-500 cursor-pointer"
          onClick={onDeleteItemClick}
        />
      </div> */}

      {itemStyle === "List" ? (
        <SegmentContentListItemObv
          contentVM={contentVM}
          isDragging={isDragging}
        />
      ) : (
        <SegmentContentBoxItemObv
          contentVM={contentVM}
          isDragging={isDragging}
        />
      )}

      <XMarkIcon
        onClick={onDeleteItemClick}
        className="h-5 w-5  absolute right-1 bottom-2 hover:bg-black/10 hover:stroke-red-500 cursor-pointer rounded-full"
      />
    </div>
  );
}

const DragListItemObvs = observer(DragListItem2);

interface ItemProps2 {
  contentVM: BaseContentViewModel;
  isDragging: boolean;
}

const SegmentContentListItemObv = observer(function SegmentContentListItem({
  contentVM,
  isDragging,
}: ItemProps2) {
  return (
    <div className="w-full text-left text-sm truncate pl-6 pr-6">
      {contentVM.name}
      {contentVM.contentType === "video" ? (
        <FilmIcon className="h-5 w-5 absolute left-1 top-[50%] translate-y-[-50%] bg-slate-50" />
      ) : (
        <PhotoIcon className="h-5 w-5  absolute left-1 top-[50%] translate-y-[-50%] bg-slate-50" />
      )}
    </div>
  );

  if (isDragging) {
    return (
      <div className="w-full text-left text-sm truncate">
        {contentVM.name}
        {contentVM.contentType === "video" ? (
          <FilmIcon className="h-5 w-5 absolute left-1 top-[50%] translate-y-[-50%] bg-slate-50" />
        ) : (
          <PhotoIcon className="h-5 w-5  absolute left-1 top-[50%] translate-y-[-50%] bg-slate-50" />
        )}

        <XMarkIcon className="h-5 w-5  absolute right-1 top-[50%] translate-y-[-50%] bg-slate-50" />
      </div>
    );
  } else {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="relative w-full pl-6 pr-6 py-2 ">
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
  }
});

const SegmentContentBoxItemObv = observer(function SegmentContentBoxItem({
  contentVM,
  isDragging,
}: ItemProps2) {
  return (
    <div
      draggable={false}
      className="relative text-xs font-normal w-full h-[96px] pl-[100px] "
    >
      <img
        draggable={false}
        className="w-[96px] h-full bg-black/30 object-contain absolute left-0 top-0"
        src={contentVM.thumbnail}
        alt=""
      />

      {contentVM.contentType === "video" ? (
        <FilmIcon className="h-5 w-5 absolute left-[76px] bottom-0 " />
      ) : (
        <PhotoIcon className="h-5 w-5  absolute left-[76px] bottom-0" />
      )}

      <p className="w-full h-full text-xs font-medium line-clamp-4 text-left whitespace-break-spaces">
        {contentVM.fileName}
      </p>
    </div>
  );
});

// interface ItemContextMenu extends PropsWithChildren {
//   onDeleteItem?: () => void;
//   onConfigItem?: () => void;
//   onContentInfo?: () => void;
// }

// function ItemContextMenu({
//   children,
//   onDeleteItem,
//   onConfigItem,
//   onContentInfo,
// }: ItemContextMenu) {
//   return (
//     <ContextMenu>
//       <ContextMenuTrigger>{children}</ContextMenuTrigger>
//       <ContextMenuContent className="">
//         <ContextMenuItem onClick={onDeleteItem}>콘텐츠삭제</ContextMenuItem>
//         <ContextMenuItem onClick={onConfigItem}>유효기간설정</ContextMenuItem>
//         <ContextMenuItem onClick={onContentInfo}>컨텐츠정보</ContextMenuItem>
//       </ContextMenuContent>
//     </ContextMenu>
//   );
// }

interface MyTooltipProps extends PropsWithChildren {
  contentVM: BaseContentViewModel;
}

function MyTooltip({ children, contentVM }: MyTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger className="">{children}</TooltipTrigger>
      <TooltipContent side="right" className="mb-5">
        <p>{contentVM.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
