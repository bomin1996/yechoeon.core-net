import { observer } from "mobx-react";
// import React from "react";
import SimpleComboBox from "@/components/ui/dropdown/SimpleComboBox";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";
import {
  MemberCardColor,
  MemberCardSize,
} from "../../../../../../shares/ISGSCNode";
import { TeamBannerPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/TeamBannerPlaceViewModel";

interface Props {
  className?: string;
  itemViewModels: Array<BaseSeatingPlaceViewModel>;
}

export default observer(function MultipleMemberPropertiesPanel({
  className,
  itemViewModels,
}: Props) {
  let sizeIndex = -1;
  let colorIndex = -1;

  const changeCardSize = (size: MemberCardSize) => {
    itemViewModels.forEach((item) => {
      const mvm = item as MemberSeatingPlaceViewModel;
      if (mvm) {
        mvm.setCardSize(size);
      }
    });
  };
  const changeCardColor = (color: MemberCardColor) => {
    itemViewModels.forEach((item) => {
      const mvm = item as MemberSeatingPlaceViewModel;
      if (mvm) {
        mvm.setCardColor(color);
      }
      const tvm = item as TeamBannerPlaceViewModel;
      if (tvm) {
        tvm.setCardColor(color);
      }
    });
  };

  return (
    <div className={`${className} p-4 text-black`}>
      <div className="grid grid-cols-5 text-xs gap-2 items-center">
        <span>사이즈</span>

        <SimpleComboBox
          className="col-span-4"
          items={["large", "medium", "small"]}
          selectedIdx={sizeIndex}
          onSelectedItem={(it, index) => {
            switch (index) {
              case 0:
                changeCardSize("Large");
                break;
              case 1:
                changeCardSize("Medium");
                break;
              case 2:
                changeCardSize("Small");
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
                changeCardColor("Yellow");
                break;
              case 1:
                changeCardColor("Blue");
                break;
              case 2:
                changeCardColor("Green");
                break;
              case 3:
                changeCardColor("Mint");
                break;
              case 4:
                changeCardColor("Orange");
                break;
              case 5:
                changeCardColor("Red");
                break;
            }
          }}
        />
      </div>
    </div>
  );
});
