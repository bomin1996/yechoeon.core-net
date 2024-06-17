import { observer } from "mobx-react";
import SimpleComboBox from "@/components/ui/dropdown/SimpleComboBox";
import { TeamBannerPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/TeamBannerPlaceViewModel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shad-components/ui/select";

interface Props {
  className?: string;
  itemViewModel: TeamBannerPlaceViewModel;
}
export default observer(function TeamBannerProperties({
  className,
  itemViewModel,
}: Props) {
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
        <span>전화</span>
        <input
          value={itemViewModel.officeTel ?? ""}
          onChange={(ev) => {
            itemViewModel.officeTel = ev.target.value;
          }}
          className="col-span-4 text-black px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          type="text"
        />
        <span>팩스</span>
        <input
          value={itemViewModel.officeFax ?? ""}
          onChange={(ev) => {
            itemViewModel.officeFax = ev.target.value;
          }}
          className="col-span-4 px-3 py-2 text-black rounded-md focus:shadow outline-green-500/50 focus:outline"
          type="text"
        />
        <span>업무</span>
        <textarea
          value={itemViewModel.jobDescription ?? ""}
          onChange={(ev) => {
            itemViewModel.jobDescription = ev.target.value;
          }}
          className="col-span-4 rouned-full text-sm text-black min-h-[200px] px-4 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          maxLength={200}
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
        {/* <span>타입</span>
        <Select>
          <SelectTrigger className="col-span-4 outline focus:outline-red-400">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
    </div>
  );
});
