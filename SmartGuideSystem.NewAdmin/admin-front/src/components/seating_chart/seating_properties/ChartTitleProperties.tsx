import { observer } from "mobx-react";
import { ChartTitlePlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/ChartTitlePlaceViewModel";
interface Props {
  className?: string;
  itemViewModel: ChartTitlePlaceViewModel;
}
export default observer(function ChartTitleProperties({
  className,
  itemViewModel,
}: Props) {
  return (
    <div className={`${className} p-4 overflow-auto `}>
      <div className="grid grid-cols-5 text-xs gap-2 items-center">
        <span>표시명</span>
        <input
          className="text-black col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          type="text"
          value={itemViewModel.title ?? ""}
          onChange={(ev) => {
            itemViewModel.title = ev.target.value;
          }}
        />

        <span>글꼴크기</span>
        <input
          type="range"
          min="20"
          max="100"
          value={itemViewModel.fontSize}
          onChange={(ev) => {
            itemViewModel.fontSize = ev.target.valueAsNumber;
          }}
          className="range col-span-4 "
          step="2"
        />
        <span>글꼴두께</span>
        <input
          type="range"
          min="100"
          max="900"
          value={itemViewModel.fontWeight}
          onChange={(ev) => {
            itemViewModel.fontWeight = ev.target.valueAsNumber;
          }}
          className="range col-span-4 "
          step="100"
        />
      </div>
    </div>
  );
});
