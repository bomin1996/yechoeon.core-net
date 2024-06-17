import { observer } from "mobx-react";
import { useContext } from "react";
import { showSelectSeatPosChartPopup } from "@/components/modals/SelectSeatPosChartModal";
import SimpleComboBox from "@/components/ui/dropdown/SimpleComboBox";
import DialogContext from "@/contexts/DialogContext";
import { SeatChartLinkPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/SeatChartLinkPlaceViewModel";
interface Props {
  className?: string;
  itemViewModel: SeatChartLinkPlaceViewModel;
}
export default observer(function SeatChartLinkProperties({
  className,
  itemViewModel,
}: Props) {
  const dialogCtx = useContext(DialogContext);

  let colorIndex = 0;
  switch (itemViewModel.color) {
    case "Yellow":
      colorIndex = 0;
      break;
    case "Blue":
      colorIndex = 1;
      break;
    case "Green":
      colorIndex = 2;
      break;
    case "Mint":
      colorIndex = 3;
      break;
    case "Orange":
      colorIndex = 4;
      break;
  }
  return (
    <div className={`${className} p-4  text-black `}>
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
        <span>색상</span>
        <SimpleComboBox
          className="col-span-4"
          items={["yellow", "blue", "green", "mint", "orange"]}
          selectedIdx={colorIndex}
          onSelectedItem={(it, index) => {
            switch (index) {
              case 0:
                itemViewModel.setCardColor("Yellow");
                break;
              case 1:
                itemViewModel.setCardColor("Blue");
                break;
              case 2:
                itemViewModel.setCardColor("Green");
                break;
              case 3:
                itemViewModel.setCardColor("Mint");
                break;
              case 4:
                itemViewModel.setCardColor("Orange");
                break;
            }
          }}
        />

        <span>관련부서:</span>
        <input
          type="text"
          readOnly={true}
          value={itemViewModel.chartName}
          className="col-span-3 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
        ></input>
        <button
          onClick={() => {
            showSelectSeatPosChartPopup(dialogCtx!, (seatPosChart) => {
              itemViewModel.chartName = seatPosChart.name;
              itemViewModel.chartId = seatPosChart.id;
            });
          }}
          className="btn-normal py-2 col-span-1"
        >
          변경
        </button>
      </div>
    </div>
  );
});
