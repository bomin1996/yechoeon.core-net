import { useState } from "react";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import SimpleComboBox from "../ui/dropdown/SimpleComboBox";
import { observer } from "mobx-react";

const snapsValues = [10, 20, 40, 50, 100, 8, 16, 32, 64, 128];
const snapsTitles = snapsValues.map((v) => v.toString());
const zoomRatios = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0];
const ratioTitles = zoomRatios.map((v) => `${v * 100}%`);

interface Props {
  className?: string;
  viewModel: SeatingChartViewModel;
  zoom: number;
  onChangeZoom: (newZoom: number) => void;
  onChangeBackgroundClassName: (className: string) => void;
}

export default observer(function SeatChartTopSubToolbar({
  className,
  viewModel,
  zoom,
  onChangeZoom,
  onChangeBackgroundClassName,
}: Props) {
  const [snapIndex, setSnapIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  const zoomIndex = zoomRatios.findIndex(
    (v) => (v * 100).toFixed() === (zoom * 100).toFixed()
  );

  return (
    <div
      className={`px-[32px] py-[8px]  text-white flex items-center space-x-3 text-sm ${className}`}
    >
      {/* <h1 className="text-red-500 text-2xl">{(zoom * 100).toFixed()}</h1> */}
      <span>배경:</span>
      <SimpleComboBox
        className="w-[80px] text-sm"
        items={["메인", "팝업", "화이트", "블랙"]}
        selectedIdx={bgIndex}
        onSelectedItem={(it, index) => {
          setBgIndex(index);
          switch (index) {
            case 0:
              onChangeBackgroundClassName(
                `bg-[url("@/assets/seat_chart/main-placeholder.png")]`
              );
              break;
            case 1:
              onChangeBackgroundClassName(
                `bg-[url("@/assets/seat_chart/search-placeholder.png")]`
              );
              break;
            case 2:
              onChangeBackgroundClassName(`bg-white`);
              break;
            case 3:
              onChangeBackgroundClassName(`bg-black`);
              break;
          }
        }}
      />

      <span>Zoom:</span>
      <SimpleComboBox
        className="w-[80px] text-sm"
        items={ratioTitles}
        selectedIdx={zoomIndex}
        onSelectedItem={(it, index) => {
          onChangeZoom(zoomRatios[index]);
        }}
      />
      <span>Snap:</span>
      <SimpleComboBox
        className="w-[80px]"
        items={snapsTitles}
        selectedIdx={snapIndex}
        onSelectedItem={(it, index) => {
          setSnapIndex(index);
          viewModel.setSnapSize(snapsValues[index]);
        }}
      />
    </div>
  );
});
