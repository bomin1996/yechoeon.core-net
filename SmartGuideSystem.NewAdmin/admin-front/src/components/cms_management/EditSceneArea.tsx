import { useContext, useEffect, useRef } from "react";
import ScenePage from "./ScenePage";
import { SceneViewModel } from "@/viewmodels/cms/SceneViewModel";
import { ContentLayoutViewModel } from "@/viewmodels/cms/ContentLayoutViewModel";
import { observer } from "mobx-react";
import ContentLayoutEditContext from "@/contexts/ContentLayoutEditContext";
// import useWheelZoom from "@/hooks/useWheelZoom";
interface Props {
  className?: string;
  sceneVM: SceneViewModel;
  contentLayoutVM: ContentLayoutViewModel;
}
export default observer(function EditSceneArea({ className, sceneVM }: Props) {
  const layoutEditCtx = useContext(ContentLayoutEditContext);

  const zoom = (event: WheelEvent) => {
    if (event.ctrlKey) {
      event.preventDefault();
      layoutEditCtx?.setScaleDelta(event.deltaY > 0 ? -0.1 : 0.1);
    }
  };
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.addEventListener("wheel", zoom);
      return () => {
        divRef.current?.removeEventListener("wheel", zoom);
      };
    }
  }, []);

  // const { zoom, divRef } = useWheelZoom({
  //   initZoomRatio: layoutEditCtx?.scaleRatio ?? 0.5,
  //   zoomStep: 0.1,
  //   minimumZoomRatio: 0.5,
  //   maximumZoomRatio: 2,
  // });
  // layoutEditCtx?.setScaleRatio(zoom);

  return (
    <div
      ref={divRef}
      className={`${className} relative flex overflow-auto`}
      // onDrop={(ev) => {
      //   ev.preventDefault();
      //   alert("droped me!!");
      //   const jsonText = ev.dataTransfer.getData("json");
      //   const msg = JSON.parse(jsonText);
      //   alert(jsonText);
      // }}
      // onDragOver={(ev) => ev.preventDefault()}
    >
      <ScenePage
        sceneVM={sceneVM}
        scaleRatio={layoutEditCtx?.scaleRatio ?? 1}
        className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-50 "
      />

      <span className="absolute bottom-0 left-0 border border-black px-2 py-2 text-xs text-black bg-green-600">
        {sceneVM.width}x{sceneVM.height}
      </span>
    </div>
  );
});
