import  { useContext } from "react";
import SvgCanvasNode from "./SvgCanvasNode";
import { SceneSegmentViewModel } from "@/viewmodels/cms/SceneSegmentViewModel";
import DragDropContainer from "./DragDropContainer";
import { observer } from "mobx-react";

import { ISGContent } from "../../../../../shares/ISGContent";
import ContentLayoutEditContext from "@/contexts/ContentLayoutEditContext";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/shad-components/ui/context-menu";

interface Props {
  segment: SceneSegmentViewModel;
  onClick?: () => void;
}

export default observer(function SceneSegment({ segment, onClick }: Props) {
  const layoutEditCtx = useContext(ContentLayoutEditContext);
  const contentLayout = layoutEditCtx?.contentLayout;

  const contentFit = segment.contents[0]?.contentFit ?? "";

  return (
    <SvgCanvasNode
      x={segment.x}
      y={segment.y}
      width={segment.width}
      height={segment.height}
    >
      <DragDropContainer
        dragFormat="content"
        dragPlaceHolderText="컨텐츠를 추가합니다"
        onDrop={(ev) => {
          //alert("컨텐츠를 드래그함");
          const jsonText = ev?.dataTransfer.getData("content");
          //alert(jsonText);
          if (jsonText) {
            const content = JSON.parse(jsonText) as ISGContent;
            contentLayout!.activeScene!.selected = segment;
            segment.addContent(content);
          }
        }}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              onClick={onClick}
              className="relative bg-black h-full w-full text-3xl font-bold"
            >
              <div className="absolute flex w-full h-full bg-gray-800 left-0 top-0">
                <span className="m-auto text-3xl  text-white">
                  {segment.width} x {segment.height}
                </span>
              </div>

              <img
                draggable={false}
                src={segment.thumbnail}
                alt=""
                className={`absolute  left-0 top-0 w-full h-full ${contentFit} `}
              />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="z-[4000]">
            <ContextMenuItem onClick={() => alert("profile")}>
              Profile
            </ContextMenuItem>
            <ContextMenuItem>Billing</ContextMenuItem>
            <ContextMenuItem>Team</ContextMenuItem>
            <ContextMenuItem>Subscription</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        {/* <div
          onClick={onClick}
          className="relative bg-black h-full w-full text-3xl font-bold"
        >
          <div className="absolute flex w-full h-full bg-gray-800 left-0 top-0">
            <span className="m-auto text-3xl  text-white">
              {segment.width} x {segment.height}
            </span>
          </div>

          <img
            draggable={false}
            src={segment.thumbnail}
            alt=""
            className={`absolute  left-0 top-0 w-full h-full ${contentFit} `}
          />
        </div> */}
      </DragDropContainer>

      {segment.isSelected && <SelectionBox />}
    </SvgCanvasNode>
  );
});

function SelectionBox() {
  return (
    <>
      <div className="absolute  left-0 top-0 w-full h-full pointer-events-none border-4 border-purple-600"></div>
      <div className="absolute  left-0 top-0 translate-x-[-50%] translate-y-[-50%] w-6 h-6 rounded-full bg-slate-300 shadow border border-purple-700" />
      <div className="absolute  right-0 top-0 translate-x-[50%] translate-y-[-50%] w-6 h-6 rounded-full bg-slate-300 shadow  border border-purple-700" />
      <div className="absolute  left-0 bottom-0 translate-x-[-50%] translate-y-[50%] w-6 h-6 rounded-full bg-slate-300 shadow  border border-purple-700" />
      <div className="absolute  right-0 bottom-0 translate-x-[50%] translate-y-[50%] w-6 h-6 rounded-full bg-slate-300 shadow  border border-purple-700" />
    </>
  );
}
