import SvgCanvasLayer from "./SvgCanvasLayer";
import SceneSegment from "./SceneSegment";
import { SceneViewModel } from "@/viewmodels/cms/SceneViewModel";
import { observer } from "mobx-react";

interface Props {
  className?: string;
  scaleRatio: number;
  sceneVM: SceneViewModel;
}
export default observer(function ScenePage({
  className,
  scaleRatio,
  sceneVM,
}: Props) {
  // const layoutEditCtx = useContext(ContentLayoutEditContext);

  // const sgvm = new SceneSegmentViewModel();
  // sgvm.x = 0;
  // sgvm.y = 476;
  // sgvm.width = 978;
  // sgvm.height = 416;

  // const sgvm2 = new SceneSegmentViewModel();
  // sgvm2.x = 0;
  // sgvm2.y = 0;
  // sgvm2.width = 978;
  // sgvm2.height = 416;

  const w = sceneVM.width * scaleRatio;
  const h = sceneVM.height * scaleRatio;

  // console.log("page w - h", w, h, scaleRatio);

  const visibleSegmentList = sceneVM.segments.filter((sg) => sg.isVisible);

  return (
    <div
      style={{
        width: `${w}px`,
        height: `${h}px`,
      }}
      className={`${className}`}
    >
      <SvgCanvasLayer
        className=" w-full h-full"
        viewWidth={sceneVM.width}
        viewHeight={sceneVM.height}
      >
        {/* <SceneSegment segment={sgvm} />
        <SceneSegment segment={sgvm2} /> */}

        {visibleSegmentList.map((segment, index) => (
          <SceneSegment
            onClick={() => {
              sceneVM.selected = segment;
              segment.selectFirstContent();
            }}
            key={index}
            segment={segment}
          />
        ))}
      </SvgCanvasLayer>
    </div>
  );
});
