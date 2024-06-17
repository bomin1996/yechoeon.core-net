import { observer } from "mobx-react";
import SimpleComboBox from "@/components/ui/dropdown/SimpleComboBox";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";

interface Props {
  className?: string;
  itemViewModel: MemberSeatingPlaceViewModel;
}

export default observer(function MemberPropertiesPanel({
  className,
  itemViewModel,
}: Props) {
  let sizeIndex = 0;
  let colorIndex = 0;

  switch (itemViewModel.size) {
    case "Large":
      sizeIndex = 0;
      break;
    case "Medium":
      sizeIndex = 1;
      break;
    case "Small":
      sizeIndex = 2;
      break;
  }

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
    case "Red":
      colorIndex = 5;
      break;
  }

  return (
    <div className={`${className} p-4   text-black`}>
      <div className="grid grid-cols-5 text-xs gap-2 items-center">
        <span>표시명</span>
        <input
          className="text-black col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          type="text"
          readOnly
          value={itemViewModel.title}
          onChange={(ev) => {
            itemViewModel.title = ev.target.value;
          }}
        />
        {/* <span>표시직급</span>
        <input
          className="text-black col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          type="text"
          value={itemViewModel.grade}
          onChange={(ev) => {
            itemViewModel.grade = ev.target.value;
          }}
        />
        <span>전화</span>
        <input
          value={itemViewModel.officeTel}
          onChange={(ev) => {
            itemViewModel.officeTel = ev.target.value;
          }}
          className="col-span-4 text-black px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          type="text"
        />
        <span>팩스</span>
        <input
          value={itemViewModel.officeFax}
          onChange={(ev) => {
            itemViewModel.officeFax = ev.target.value;
          }}
          className="col-span-4 px-3 py-2 text-black rounded-md focus:shadow outline-green-500/50 focus:outline"
          type="text"
        />
        <span>업무</span>
        <textarea
          value={itemViewModel.jobDescription}
          onChange={(ev) => {
            itemViewModel.jobDescription = ev.target.value;
          }}
          className="col-span-4 rouned-full text-sm text-black min-h-[200px] px-4 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          maxLength={200}
        /> */}

        <span>사이즈</span>

        <SimpleComboBox
          className="col-span-4"
          items={["large", "medium", "small"]}
          selectedIdx={sizeIndex}
          onSelectedItem={(it, index) => {
            switch (index) {
              case 0:
                itemViewModel.setCardSize("Large");
                break;
              case 1:
                itemViewModel.setCardSize("Medium");
                break;
              case 2:
                itemViewModel.setCardSize("Small");
                break;
            }
          }}
        />
        <span>색상</span>
        <SimpleComboBox
          className="col-span-4"
          items={["Yellow", "Blue", "Green", "Mint", "Orange", "Red"]}
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
              case 5:
                itemViewModel.setCardColor("Red");
                break;
            }
          }}
        />
      </div>
    </div>
  );
});
