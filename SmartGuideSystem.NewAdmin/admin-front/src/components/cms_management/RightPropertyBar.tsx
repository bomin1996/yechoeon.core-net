import  { PropsWithChildren, useContext, useState } from "react";
import ContentsInfoPanel from "./ContentsInfoPanel";
import DragDropListPanel from "./DragDropListPanel";
import ContentsToggleSwitch from "./ContentsToggleSwitch";
import ContentLayoutEditContext from "@/contexts/ContentLayoutEditContext";
import { observer } from "mobx-react";
import { ContentLayoutViewModel } from "@/viewmodels/cms/ContentLayoutViewModel";
interface Props extends PropsWithChildren {
  className?: string;
  contentLayout?: ContentLayoutViewModel;
}

export default observer(function RightPropertyBar({ className }: Props) {
  const layoutEditCtx = useContext(ContentLayoutEditContext);
  const contentLayout = layoutEditCtx?.contentLayout;
  const [listStyle, setListStyle] = useState<"List" | "Box">("List");
  return (
    <div
      className={`${className} px-3 py-4 flex flex-col bg-[#e8e6da] items-center font-bold `}
    >
      <ContentsInfoPanel
        className="w-full"
        segmentVM={contentLayout?.activeScene?.activeSegment}
      />
      <div className="flex w-full items-baseline my-3">
        <span className="flex-1 text-left text-lg">컨텐츠리스트 {}</span>
        <ContentsToggleSwitch
          index={listStyle === "List" ? 0 : 1}
          onSelected={(selectedIndex) => {
            setListStyle(selectedIndex === 0 ? "List" : "Box");
          }}
          className=" bg-black  rounded-md p-[4px] space-x-1"
        />
      </div>
      <DragDropListPanel
        itemStyle={listStyle}
        className="w-full flex-1"
        segment={contentLayout?.activeScene?.activeSegment}
      />

      {/* <SegmentContentList
        className="w-full flex-1 "
        segment={contentLayout?.activeScene?.activeSegment}
        itemStyle={listStyle}
      /> */}
    </div>
  );
});
