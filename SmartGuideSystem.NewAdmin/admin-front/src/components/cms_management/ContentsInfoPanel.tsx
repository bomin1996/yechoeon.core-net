import SimpleComboBox from "../ui/dropdown/SimpleComboBox";
import TimeSelectBar from "./TimeSelectBar";
import { observer } from "mobx-react";
import { SceneSegmentViewModel } from "@/viewmodels/cms/SceneSegmentViewModel";

const contentFits = ["object-fill", "object-cover", "object-contain"];
const contentFitTitles = [
  "전체표시 화면늘림",
  "중앙에 맞춤(비율유지)",
  "전체표시 비율유지",
];

interface Props {
  className?: string;
  segmentVM?: SceneSegmentViewModel;
}

export default observer(function ContentsInfoPanel({
  className,
  segmentVM,
}: Props) {
  let contentFitIndex = 0;
  if (segmentVM?.selected) {
    switch (segmentVM.selected.contentFit) {
      case "object-fill":
        contentFitIndex = 0;
        break;
      case "object-cover":
        contentFitIndex = 1;
        break;
      case "object-contain":
        contentFitIndex = 2;
        break;
    }
  }

  return (
    <div className={`${className}  `}>
      <p className="text-[20px] font-bold">컨텐츠 위치/크기</p>
      <div className="grid grid-cols-2 mt-3 mb-3 gap-2">
        <p>X 좌표</p>
        <p>Y 좌표</p>
        <input
          type="text"
          readOnly
          value={`${segmentVM?.x ?? ""}px`}
          className="px-3 py-2  rounded-md text-white bg-black focus:shadow outline-green-500/50 focus:outline"
        />

        <input
          readOnly
          type="text"
          value={`${segmentVM?.y ?? ""}px`}
          className="px-3 py-2 rounded-md text-white bg-black  focus:shadow outline-green-500/50 focus:outline"
        />

        <p>너비</p>
        <p>높이</p>
        <input
          type="text"
          readOnly
          value={`${segmentVM?.width ?? ""}px`}
          className="px-3 py-2 rounded-md text-white bg-black focus:shadow outline-green-500/50 focus:outline"
        />

        <input
          type="text"
          readOnly
          value={`${segmentVM?.height ?? ""}px`}
          className="px-3 py-2 rounded-md text-white bg-black  focus:shadow outline-green-500/50 focus:outline"
        />
      </div>

      {/* <p>재생 시간 : {segmentVM?.selected?.duration}</p> */}
      <p>재생 시간 </p>

      <TimeSelectBar
        // hour={0}
        // min={0}
        // sec={0}
        duration={segmentVM?.selected?.duration ?? 0}
        isEnable={segmentVM?.selected?.contentType === "image"}
        onChange={(dur) => {
          segmentVM?.selected?.changeDuration(dur);
        }}
      />
      {/* <p>컨텐츠 갯수 : {segmentVM?.contents?.length}</p> */}

      <p>컨텐츠 비율 :</p>
      <SimpleComboBox
        items={contentFitTitles}
        selectedIdx={contentFitIndex}
        onSelectedItem={(it, index) => {
          console.log("onSelectedItem:", it);
          const content = segmentVM?.selected;
          if (content) {
            const contentFit = contentFits[index];
            content.settingContentFit(contentFit);
          }
        }}
        className="mt-3"
      />
    </div>
  );
});
