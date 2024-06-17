import React, { useCallback, useEffect, useRef } from "react";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { observer } from "mobx-react";
import SeatingChartDragAreaView from "./SeatingChartDragAreaView";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";
import MemberPlaceHolder1 from "./place_holder_views/MemberPlaceHolder1";
import MemberPlaceHolder2 from "./place_holder_views/MemberPlaceHolder2";
import MemberPlaceHolder3 from "./place_holder_views/MemberPlaceHolder3";
import SvgGridBack from "./SvgGridBack";
import TeamBannerPlaceHolder1 from "./place_holder_views/TeamBannerPlaceHolder1";
import { TeamBannerPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/TeamBannerPlaceViewModel";
import { ChartTitlePlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/ChartTitlePlaceViewModel";
import ChartTitlePlaceHolder1 from "./place_holder_views/ChartTitlePlaceHolder1";
import { TemplateNames } from "@/viewmodels/seating_chart/TempateNames";
import EntranceHolder1 from "./place_holder_views/EntranceHolder1";
import { EntrancePlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/EntrancePlaceViewModel";
import MemberStyle1PlaceHolder from "./place_holder_views/MemberStyle1PlaceHolder";
import TeamBannerPlaceHolder2 from "./place_holder_views/TeamBannerPlaceHolder2";
import EntranceHolder2 from "./place_holder_views/EntranceHolder2";
import EntranceHolder3 from "./place_holder_views/EntranceHolder3";
import { SeatChartLinkPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/SeatChartLinkPlaceViewModel";
import SeatChartLinkPlaceHolder from "./place_holder_views/SeatChartLinkPlaceHolder";
import MemberStyle2PlaceHolder from "./place_holder_views/MemberStyle2PlaceHolder";

interface Props {
  viewModel: SeatingChartViewModel;
  snapSize: number;
  chartWidth: number;
  chartHeight: number;
  className?: string;
  actualWidth: number;
  actualHeight: number;
  // showGrid: boolean;
  backImageData?: string;
}

export default observer(function SeatingChart({
  viewModel,
  className,
  chartWidth,
  chartHeight,
  snapSize,
  actualWidth,
  actualHeight,
  // showGrid,
  backImageData,
}: Props) {
  // const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
  //   x: 0,
  //   y: 0,
  // });

  // const [contextMenuInfo, setContextMenuInfo] = useState({
  //   show: false,
  //   x: 0,
  //   y: 0,
  // });

  const divRef = useRef<HTMLDivElement>(null);

  const handleSelectItem = useCallback(
    (
      ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
      item: BaseSeatingPlaceViewModel
    ) => {
      if (divRef.current) {
        const { realX, realY } = convertPoint2(
          divRef.current,
          ev,
          // chartWidth,
          // chartHeight
          viewModel.width,
          viewModel.height
        );
        viewModel.mouseDownItem(item, realX, realY);
        ev.stopPropagation();
      }
    },
    [viewModel]
  );

  const handleMouseMove = useCallback(
    (ev: MouseEvent) => {
      if (divRef.current && ev.buttons === 1) {
        const { realX, realY } = convertPoint2(
          divRef.current,
          ev,
          // chartWidth,
          // chartHeight
          viewModel.width,
          viewModel.height
        );
        // setMousePosition({ x: Math.round(realX), y: Math.round(realY) });
        viewModel.mouseMove(realX, realY);
      }
    },
    [viewModel]
  );

  const handleMouseUp = useCallback(
    (ev: MouseEvent) => {
      viewModel.mouseUp(ev.clientX, ev.clientY);
    },
    [viewModel]
  );

  const handleEmptyDown = useCallback(
    (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (divRef.current) {
        const { realX, realY } = convertPoint2(
          divRef.current,
          ev,
          // chartWidth,
          // chartHeight
          viewModel.width,
          viewModel.height
        );
        viewModel.startDrag(realX, realY);
      }
    },
    [viewModel]
  );

  useEffect(() => {
    // if (divRef.current) {
    //   divRef.current.addEventListener("mousemove", handleMouseMove);
    //   divRef.current.addEventListener("mouseup", handleMouseUp);

    //   return () => {
    //     if (divRef.current) {
    //       divRef.current.removeEventListener("mousemove", handleMouseMove);
    //       divRef.current.removeEventListener("mouseup", handleMouseUp);
    //       console.log("clean up events");
    //     }
    //   };
    // }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      console.log("clean up events");
    };
  }, []);

  const unselectedItems = viewModel.placeItems.filter((it) => !it.isSelected);
  const selectedItems = viewModel.selection();

  return (
    <div
      // className={` ${className}  relative select-none shadow bg-[url("@/assets/seat_chart/5@2x.webp")] bg-no-repeat bg-contain `}
      className={` ${className}  relative select-none shadow  bg-no-repeat bg-contain `}
      ref={divRef}
      style={{
        width: `${actualWidth}px`,
        height: `${actualHeight}px`,
      }}
      onMouseDown={handleEmptyDown}
      onContextMenu={(ev) => {
        ev.preventDefault();
        // setContextMenuInfo({ show: true, x: ev.clientX, y: ev.clientY });
      }}>
      <img src={backImageData} className="absolute w-full h-full" />
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${viewModel.width} ${viewModel.height}`}
        className="h-full object-center relative overflow-visible"
        preserveAspectRatio="none">
        {viewModel.showGrid && (
          <SvgGridBack snapSize={viewModel.snapSize} majorStrokeWidth={3} />
        )}

        {unselectedItems.map((item, index) =>
          renderSeatingComponent(item, index, handleSelectItem)
        )}
        {selectedItems.map((item, index) =>
          renderSeatingComponent(item, index, handleSelectItem)
        )}

        {viewModel.areaDragger.isDragging && (
          <SeatingChartDragAreaView
            dragger={viewModel.areaDragger}
            className="bg-red-500/30 z-10 border-2 box-border border-black"
          />
        )}
      </svg>
      <span className="absolute top-0 right-0 border border-black px-2 py-2 text-xs text-black bg-yellow-400">
        {viewModel.width}x{viewModel.height}
      </span>
      {/* <span className="absolute bottom-0 left-0 border border-black px-2 py-2 text-xs text-black bg-green-600">
        {mousePosition.x}x{mousePosition.y}
      </span> */}

      <span className="absolute bottom-0 left-0 border border-black px-2 py-2 text-xs text-black bg-green-600">
        Selection:{viewModel.selectedItems?.length}
      </span>

      {/* {contextMenuInfo.show && (
        <div
          onBlur={(ev) => {
            setContextMenuInfo({ show: false, x: 0, y: 0 });
          }}
          className="absolute bg-sky-500"
          style={{
            // left: `${contextMenuInfo.x}px`,
            // top: `${contextMenuInfo.y}px`,
            left: `0px`,
            top: `0px`,
          }}
        >
          Context Menu Showing
        </div>
      )} */}
    </div>
  );
});

export function renderSeatingComponent(
  item: BaseSeatingPlaceViewModel,
  index: number,
  onSelectItem: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: BaseSeatingPlaceViewModel
  ) => void
) {
  // console.log("render item:", item);

  if (item.seatingType === "Member") {
    const vm = item as MemberSeatingPlaceViewModel;
    switch (vm.templateName) {
      case TemplateNames.template_member1:
        return (
          <MemberPlaceHolder1
            item={item as MemberSeatingPlaceViewModel}
            key={item.id}
            onSelectItem={onSelectItem}
            className=" box-border "
          />
        );
      case TemplateNames.template_leader_horizontal:
        return (
          <MemberPlaceHolder2
            item={item as MemberSeatingPlaceViewModel}
            key={item.id}
            onSelectItem={onSelectItem}
            className=" box-border "
          />
        );
      case TemplateNames.template_leader_vertical:
        return (
          <MemberPlaceHolder3
            item={item as MemberSeatingPlaceViewModel}
            key={item.id}
            onSelectItem={onSelectItem}
            className=" box-border "
          />
        );
      case TemplateNames.template_member_style1_member:
      case TemplateNames.template_member_style1_leader1:
      case TemplateNames.template_member_style1_leader2:
        return (
          <MemberStyle1PlaceHolder
            item={item as MemberSeatingPlaceViewModel}
            key={item.id}
            onSelectItem={onSelectItem}
            className=" box-border "
          />
        );
      case TemplateNames.template_member_style2_member:
      case TemplateNames.template_member_style2_leader1:
      case TemplateNames.template_member_style2_leader2:
        return (
          <MemberStyle2PlaceHolder
            item={item as MemberSeatingPlaceViewModel}
            key={item.id}
            onSelectItem={onSelectItem}
            className=" box-border "
          />
        );
      default:
        return null;
    }
  } else if (item.seatingType === "TeamBanner") {
    const vm = item as TeamBannerPlaceViewModel;
    switch (vm.templateName) {
      case TemplateNames.template_banner1: {
        return (
          <TeamBannerPlaceHolder1
            item={item as TeamBannerPlaceViewModel}
            key={item.id}
            onSelectItem={onSelectItem}
            className=" box-border"
          />
        );
      }
      case TemplateNames.template_banner2: {
        return (
          <TeamBannerPlaceHolder2
            item={item as TeamBannerPlaceViewModel}
            key={item.id}
            onSelectItem={onSelectItem}
            className=" box-border"
          />
        );
      }
      default:
        return null;
    }
  } else if (item.seatingType === "ChartTitle") {
    return (
      <ChartTitlePlaceHolder1
        item={item as ChartTitlePlaceViewModel}
        key={item.id}
        onSelectItem={onSelectItem}
        className=" box-border"
      />
    );
  } else if (item.seatingType === "Entrance") {
    const vm = item as EntrancePlaceViewModel;
    switch (vm.templateName) {
      case TemplateNames.template_entrance1:
        return (
          <EntranceHolder1
            item={item as EntrancePlaceViewModel}
            key={item.id}
            onSelectItem={onSelectItem}
            className=" box-border"
          />
        );
      case TemplateNames.template_entrance2:
        return (
          <EntranceHolder2
            item={item as EntrancePlaceViewModel}
            key={item.id}
            onSelectItem={onSelectItem}
            className=" box-border"
          />
        );
      case TemplateNames.template_entrance3:
        return (
          <EntranceHolder3
            item={item as EntrancePlaceViewModel}
            key={item.id}
            onSelectItem={onSelectItem}
            className=" box-border"
          />
        );

      default:
        return null;
    }
    // return (

    //   <EntranceHolder1
    //     item={item as EntrancePlaceViewModel}
    //     key={item.id}
    //     onSelectItem={onSelectItem}
    //     className=" box-border"
    //   />
    // );
  } else if (item.seatingType === "Link") {
    const vm = item as SeatChartLinkPlaceViewModel;
    switch (vm.templateName) {
      case TemplateNames.template_link1:
        return (
          <SeatChartLinkPlaceHolder
            item={vm}
            key={item.id}
            onSelectItem={onSelectItem}
            className="box-border"
          />
        );
      default:
        return null;
    }
  }
}

function convertPoint2(
  divRef: HTMLDivElement,
  ev: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>,
  vw: number,
  vh: number
) {
  const width = vw;
  const height = vh;

  // const x = ev.pageX - divRef.offsetLeft;
  // const y = ev.pageY - divRef.offsetTop;
  const brect = divRef.getBoundingClientRect();
  const x = ev.clientX - brect.left;
  const y = ev.clientY - brect.top;

  const aw = divRef.clientWidth;
  const ah = divRef.clientHeight;

  const rx = width * (x / aw);
  const ry = height * (y / ah);

  return { realX: rx, realY: ry };
}
