import React, { useContext } from "react";
import { ISGFloor, ISGFloorItem } from "@shares/ISGFloor";
import DepartmentMarker from "./markers/DepartmentMarker";
import KioskDeviceMarker from "./markers/KioskDeviceMarker";
import DialogContext, { IDialogContextData } from "src/contexts/DialogContext";
import KioskContext from "src/contexts/KioskContext";
import TeamModal from "../OrganizationChart/modal/TeamModal";
import { useNavigate } from "react-router-dom";
import { showSeatPosChartModal } from "../Search";
import DestinationMarker from "./markers/DestinationMarker";

interface Props {
  floor?: ISGFloor;
  className?: string;
  destination?: string;
  startDeviceId?: string;
}
export default function FloorArea({
  floor,
  className,
  destination,
  startDeviceId,
}: Props) {
  const dialogCtx = useContext(DialogContext);
  const kioskCtx = useContext(KioskContext);
  const navigate = useNavigate();
  const thisDeviceId = kioskCtx?.deviceInfo?.deviceId ?? "";

  const handleHome = () => {
    dialogCtx?.popAllDialogs();
    navigate("/");
  };

  const handleClickDepartMarker = (marker: ISGFloorItem) => {
    if (marker.action === "ShowOrganizationChart") {
      if (marker.organizationChartId) {
        showSeatPosChartModal(dialogCtx!, marker.organizationChartId!);
      }
    } else if (marker.action === "ShowFloorMap") {
    } else if (marker.action === "ShowInfoPopup") {
      showMarkerModal(dialogCtx!, marker, handleHome);
    }
  };

  let destinationFloorItem;
  if (destination) {
    destinationFloorItem = floor?.items?.find(
      (v, index) => v.orgChartName === destination
    );
  }

  let startFloorItem;
  if (startDeviceId) {
    startFloorItem = floor?.items?.find(
      (v, index) => v.deviceId === startDeviceId
    );
  }

  return (
    <div className={`  ${className}  relative `}>
      <img
        className=" object-contain object-center h-[600px] rounded-3xl"
        src={floor?.floorImage}
        alt=""
      />

      {floor?.items?.map((marker, index) => {
        if (marker.itemType === "Department") {
          return (
            <DepartmentMarker
              key={marker.title}
              onClick={() => handleClickDepartMarker(marker)}
              marker={marker}
            />
          );
        } else if (
          marker.itemType === "KioskDevice" &&
          marker.deviceId === thisDeviceId
        ) {
          return <KioskDeviceMarker key={marker.deviceId} marker={marker} />;
        }
      })}

      {destinationFloorItem && (
        <DestinationMarker
          key={"found-destination"}
          marker={destinationFloorItem}
          title="도착위치"
        />
      )}
      {startFloorItem && (
        <DestinationMarker
          key={"found-start"}
          marker={startFloorItem}
          title="출발위치"
        />
      )}
    </div>
  );
}

// function showOrganizationChartModal(
//   dialogCtx: IDialogContextData,
//   // deptCode: string,
//   direction: "Horizontal" | "Vertical",
//   orgChartId: number,
//   onHome: () => void
// ) {
//   KioskApi.requestOrgChart(orgChartId)
//     .then((orgChart) => {
//       dialogCtx.pushDialog(
//         <SearchOrganizationChart
//           direction={direction}
//           key="showOrganizationChartModal"
//           orgChart={orgChart}
//           orgChartId={orgChartId}
//           onHome={() => {
//             dialogCtx.popDialog();
//             onHome();
//           }}
//           onClose={() => dialogCtx.popDialog()}
//         />
//       );
//     })
//     .catch((exc) => console.log(exc));
// }

function showMarkerModal(
  dialogCtx: IDialogContextData,
  marker: ISGFloorItem,
  onHome: () => void
) {
  dialogCtx.pushDialog(
    <TeamModal
      key="showMarkerModal"
      teamInfo={{
        name: marker.title ?? "",
        officeTel: "",
        officeFax: "",
        jobDescription: marker.content ?? "",
      }}
      onHome={() => {
        dialogCtx.popDialog();
        onHome();
      }}
      onClose={() => dialogCtx.popDialog()}
    />
  );
}
