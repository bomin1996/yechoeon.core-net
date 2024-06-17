import { observer } from "mobx-react";
import { useContext } from "react";
import MarkerAreaContext from "@/contexts/MarkerAreaContext";
import { DepartmentMarkerViewModel } from "@/viewmodels/floor_map/DepartmentMarkerViewModel";
import { FloorMapViewModel } from "@/viewmodels/floor_map/FloorMapViewModel";

interface Props {
  viewModel: DepartmentMarkerViewModel;
  areaViewModel: FloorMapViewModel;
}

export default observer(function DepartmentMarkerView({
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
      className={`absolute cursor-pointer hover:outline-[#00b4bf] hover:bg-green-500/70 translate-x-[-50%] translate-y-[-50%]  flex border-2 outline-purple-500 outline-[6px] outline-dashed animate-pulse  ${
        viewModel.isSelected
          ? "outline-[#838081] bg-black/50"
          : "outline-[#00b4bf] bg-transparent"
      } `}
    >
      <span
        className={`animate-pulse m-auto px-[10px] py-[4px] text-[14px] font-bold text-white rounded-[6px]  ${
          viewModel.actionIndex === 0 ? "bg-[#014da2]" : "bg-[#5aa947]"
        }`}
      >
        {viewModel.title
          ? viewModel.title
          : viewModel.actionIndex === 0
          ? "조직도"
          : "안내"}
      </span>

      <div
        onMouseDown={(ev) => {
          ctx?.onMouseDown("size", ev.clientX, ev.clientY, viewModel);
          ev.stopPropagation();
        }}
        className="absolute right-[-10px] bottom-[-10px] w-[20px] h-[20px] rounded-full bg-slate-300 hover:bg-white/75 hover:scale-150 active:scale-150 border-4 border-[
          #00b4bf]"
      ></div>
    </div>
  );
});
