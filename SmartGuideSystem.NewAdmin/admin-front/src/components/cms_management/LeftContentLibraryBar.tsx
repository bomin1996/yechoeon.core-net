import { PropsWithChildren, useContext, useState } from "react";
import DialogContext from "@/contexts/DialogContext";
import { PlayIcon } from "@heroicons/react/24/outline";
import SearchInput2 from "../ui/input/SearchInput2";
import DragDropContainer from "./DragDropContainer";
import ContentsToggleSwitch from "./ContentsToggleSwitch";
import ContentListItem from "./ContentListItem";
import ContentLayoutEditContext from "@/contexts/ContentLayoutEditContext";
import { observer } from "mobx-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/shad-components/ui/context-menu";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/shad-components/ui/tooltip";

import { ISGContent } from "@shares/ISGContent";
// import { useOkDialog } from "../modals/UploadFileProgressDialog";
import showContentInfoDialog from "../dialogs/ContentInfoDialog";
// import { showMessageOkCancelDialog } from "../modals";
import BlockUIContext from "@/contexts/BlockUIContext";
// import { ContentApi } from "@/server/contentApi";
// import toast from "react-hot-toast";
import { MAX_UPLOAD_FILE_SIZE, UPLOAD_FILE_TYPES } from "@/const";
// import SearchInput3 from "../ui/input/SearchInput3";

interface Props {
  className?: string;
}

export default observer(function LeftContentLibraryBar({ className }: Props) {
  const dialogCtx = useContext(DialogContext);
  const blockUICtx = useContext(BlockUIContext);
  const [searchText, setSearchText] = useState("");
  const [selectedContentId, setSelectedContentId] = useState<number>();
  const [listStyle, setListStyle] = useState<"List" | "Box">("List");
  const layoutEditCtx = useContext(ContentLayoutEditContext);

  const contents = layoutEditCtx?.contents ?? [];
  const filtered = searchText
    ? contents.filter((c) => c.name.includes(searchText))
    : contents;

  const handleDeleteContent = (content: ISGContent) => {
    // useOkDialog(() => {
    //   alert("deleted");
    // });
    layoutEditCtx?.removeContent(content);
  };

  return (
    <div className={`relative ${className} pt-[120px]`}>
      <DragDropContainer
        dragPlaceHolderText="이미지/동영상 끌어놓기 "
        dragFormat="Files"
        onDrop={(ev) => {
          const file = ev!.dataTransfer.files[0];

          // alert("fileSize" + file.size);
          // alert("fileType" + file.type);

          if (file.size > MAX_UPLOAD_FILE_SIZE) {
            alert("300MB 이하 파일만 업로드 가능합니다.");
            return;
          }

          if (!UPLOAD_FILE_TYPES.includes(file.type)) {
            alert(
              "동영상(*.mp4) / 이미지(*.png, *.jpg, *webp, *.gif) 파일만 업로드 가능합니다."
            );
            return;
          }

          const formData = new FormData();
          formData.append("File", file);
          formData.append("FileName", file.name);
          formData.append("FileSize", file.size.toString());

          // showFileUploadDialog(
          //   dialogCtx!,
          //   formData,
          //   () => {
          //     console.log("Cancel Upload Video");
          //   },
          //   (url) => {
          //     //setVideoUrl(url);
          //     alert(url);
          //   }
          // );

          const category = layoutEditCtx?.contentLayout.category1 ?? "";
          layoutEditCtx?.addFileToContentLibrary(formData, category);
        }}
      >
        <div className="absolute flex flex-col w-full h-[120px] left-0 top-0 px-4">
          <p className=" flex items-center h-[60px] border-b border-black/30 ">
            <PlayIcon className="w-6 h-6" />
            <span className="text-lg text-left font-bold ">컨텐츠</span>
          </p>
          <div className="flex items-center space-x-2 w-full h-[60px]">
            <SearchInput2
              className="flex-1 w-0 min-w-0 "
              placeholder="컨텐츠 검색"
              inputText={searchText}
              onChange={(text) => setSearchText(text)}
            />

            <ContentsToggleSwitch
              index={listStyle === "List" ? 0 : 1}
              onSelected={(selectedIndex) => {
                setListStyle(selectedIndex === 0 ? "List" : "Box");
              }}
              className="bg-black  rounded-md p-[4px] space-x-1"
            />
          </div>
        </div>
        <div className="w-full h-full px-2 pb-4">
          <div
            key={"list"}
            className="bg-white rounded-xl w-full h-full px-1 py-1 overflow-y-auto"
          >
            <div
              className={`grid gap-1 ${
                listStyle === "List" ? "grid-cols-1" : "grid-cols-2"
              }  w-full `}
            >
              {filtered.map((item, index) => (
                <ItemContextMenu
                  key={index}
                  onDeleteItem={() => handleDeleteContent(item)}
                  onConfigItem={() => {
                    showContentInfoDialog(dialogCtx!, { content: item });
                  }}
                  onContentInfo={() => {
                    showContentInfoDialog(dialogCtx!, { content: item });
                  }}
                >
                  <ContentListItem
                    key={item.id}
                    onClick={() => {
                      setSelectedContentId(item.id);
                    }}
                    contentItem={item}
                    isSelected={item.id === selectedContentId}
                    boxStyle={listStyle}
                  />
                </ItemContextMenu>
              ))}
            </div>
          </div>
        </div>
      </DragDropContainer>
    </div>
  );
});

interface ItemContextMenu extends PropsWithChildren {
  onDeleteItem?: () => void;
  onConfigItem?: () => void;
  onContentInfo?: () => void;
}
function ItemContextMenu({
  children,
  onDeleteItem,
  onConfigItem,
  onContentInfo,
}: ItemContextMenu) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="">
        <ContextMenuItem onClick={onDeleteItem}>콘텐츠삭제</ContextMenuItem>
        {/* <ContextMenuItem onClick={onConfigItem}>유효기간설정</ContextMenuItem> */}
        <ContextMenuItem onClick={onContentInfo}>컨텐츠정보</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
