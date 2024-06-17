import { observer } from "mobx-react";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
interface Props {
  className?: string;
  viewModel: SeatingChartViewModel;
}
export default observer(function SeatPosChartInfo({
  className,
  viewModel,
}: Props) {
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-5 text-xs gap-2 items-center">
        <span className="text-white">배치도이름</span>
        <input
          className="text-black col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          type="text"
          value={viewModel.name}
          onChange={(ev) => {
            viewModel.name = ev.target.value;
          }}
        />
        <span className="text-white">전화</span>
        <input
          value={viewModel.officeTel}
          onChange={(ev) => {
            viewModel.officeTel = ev.target.value;
          }}
          className="col-span-4 text-black px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          type="text"
        />
        <span className="text-white">팩스</span>
        <input
          value={viewModel.officeFax}
          onChange={(ev) => {
            viewModel.officeFax = ev.target.value;
          }}
          className="col-span-4 px-3 py-2 text-black rounded-md focus:shadow outline-green-500/50 focus:outline"
          type="text"
        />
        <span className="text-white">업무</span>
        <textarea
          value={viewModel.jobDescription}
          onChange={(ev) => {
            viewModel.jobDescription = ev.target.value;
          }}
          className="col-span-4 rouned-full text-sm text-black min-h-[200px] px-4 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          maxLength={200}
        />
        <span className="text-white">설명</span>
        <textarea
          value={viewModel.desc}
          onChange={(ev) => {
            viewModel.desc = ev.target.value;
          }}
          className="col-span-4 rouned-full text-sm text-black min-h-[200px] px-4 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          maxLength={200}
        />

        <span className="text-white">Width</span>
        <input
          value={viewModel.width}
          onChange={(ev) => {
            viewModel.width = ev.target.valueAsNumber;
          }}
          className="col-span-4 px-3 py-2 text-black rounded-md focus:shadow outline-green-500/50 focus:outline"
          type="number"
          min={100}
          max={3840}
        />
        <span className="text-white">Height</span>
        <input
          value={viewModel.height}
          onChange={(ev) => {
            viewModel.height = ev.target.valueAsNumber;
          }}
          className="col-span-4 px-3 py-2 text-black rounded-md focus:shadow outline-green-500/50 focus:outline"
          type="number"
          min={100}
          max={3840}
        />

        <p className="col-span-5 text-white pt-10">
          ( * 가로 1900 * 940 기준 ) ( * 세로 1596 * 1080 기준 )
        </p>
      </div>
    </div>
  );
});
