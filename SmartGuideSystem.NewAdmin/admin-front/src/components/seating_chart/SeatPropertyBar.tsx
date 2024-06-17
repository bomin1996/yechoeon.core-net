import { observer } from "mobx-react";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import MemberPropertiesPanel from "./seating_properties/MemberPropertiesPanel";
import TeamBannerProperties from "./seating_properties/TeamBannerProperties";
import { TeamBannerPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/TeamBannerPlaceViewModel";
import { ChartTitlePlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/ChartTitlePlaceViewModel";
import ChartTitleProperties from "./seating_properties/ChartTitleProperties";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";
import MultipleMemberPropertiesPanel from "./seating_properties/MultipleMemberPropertiesPanel";
import SeatChartLinkProperties from "./seating_properties/SeatChartLinkProperties";
import { SeatChartLinkPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/SeatChartLinkPlaceViewModel";
interface Props {
  className?: string;
  viewModel: SeatingChartViewModel;
}

export default observer(function SeatPropty({ className, viewModel }: Props) {
  const lastSelectedItem = viewModel.lastSelectedItem;
  const selection = viewModel.selection();

  if (selection && selection.length > 1) {
    return <MultipleMemberPropertiesPanel itemViewModels={selection} />;
  }

  if (lastSelectedItem) {
    switch (lastSelectedItem.seatingType) {
      case "Member":
        return (
          <MemberPropertiesPanel
            itemViewModel={lastSelectedItem as MemberSeatingPlaceViewModel}
          />
        );
      case "TeamBanner":
        return (
          <TeamBannerProperties
            itemViewModel={lastSelectedItem as TeamBannerPlaceViewModel}
          />
        );
      case "ChartTitle":
        return (
          <ChartTitleProperties
            itemViewModel={lastSelectedItem as ChartTitlePlaceViewModel}
          />
        );
      case "Link":
        return (
          <SeatChartLinkProperties
            itemViewModel={lastSelectedItem as SeatChartLinkPlaceViewModel}
          />
        );
      default:
        return null;
    }
  } else {
  }

  return null;
});
