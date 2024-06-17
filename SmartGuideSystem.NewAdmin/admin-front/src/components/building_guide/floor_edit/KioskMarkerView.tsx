import { observer } from "mobx-react";
import { useContext } from "react";
import MarkerAreaContext from "@/contexts/MarkerAreaContext";
import { KioskDeviceMarkerViewModel } from "@/viewmodels/floor_map/KioskDeviceMarkerViewModel";
import { FloorMapViewModel } from "@/viewmodels/floor_map/FloorMapViewModel";

interface Props {
  viewModel: KioskDeviceMarkerViewModel;
  areaViewModel: FloorMapViewModel;
}

export default observer(function KioskDeviceMarkerView({
  viewModel,
  areaViewModel,
}: Props) {
  const ctx = useContext(MarkerAreaContext);

  return (
    <div
      draggable={false}
      onMouseDown={(ev) => {
        ctx?.onMouseDown("move", ev.clientX, ev.clientY, viewModel);
      }}
      onDragStart={(ev) => ev.preventDefault()}
      style={viewModel.style}
      className="absolute flex select-none flex-col"
    >
      <div className="h-[20px] w-[20px]">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-90"></span>
      </div>
      <span
        style={{
          fontSize: `${areaViewModel.fontSize}px`,
        }}
        className="bg-black/50 text-white text-center text-sm border rounded-lg px-2 py-1 absolute min-w-[150px] left-[50%] bottom-[100%] translate-x-[-50%] "
      >
        {viewModel.deviceId}
      </span>

      <div className="bg-red-600 h-[10px] w-[10px] rounded-full absolute left-[50%] top-[50%]  translate-x-[-50%] translate-y-[-50%]"></div>

      {/* <div className="m-auto flex items-center bg-[#ef4122] text-[14px] py-[4px] px-[14px] font-bold rounded-[6px] shadow text-white translate-x-[-50%] translate-y-[-50%] cursor-pointer">
        <span className="m-auto">현위치[{viewModel.title}]</span>
      </div> */}
    </div>
  );
});
