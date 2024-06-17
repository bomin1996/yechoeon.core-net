import React, { useContext, useState } from "react";
import {
  withFullModalWithCloseButton,
  withModal3,
} from "src/components/ui/modal/withModal";
import { motion } from "framer-motion";
import RightTitleLayout, {
  RightTitleAdaptiveLayout,
  RightTitleLayout2NoImage,
} from "../RightTitleLayout";
import TitleSegmented from "../ui/TitleSegmented";
import FloorArea from "../FloorGuideMap/FloorArea";
import KioskContext from "src/contexts/KioskContext";

interface Props {
  destination: string;
}
export default withFullModalWithCloseButton(
  function GetDirectionFloorGuideMapModal({ destination }: Props) {
    const kioskInfo = useContext(KioskContext);
    const did = kioskInfo?.deviceInfo?.deviceId;
    const bds = kioskInfo!.buildingInfo!;
    let fromFloor;
    let destFloor;

    for (let i = 0; i < bds.length && (!fromFloor || !destFloor); i++) {
      const building = bds[i];
      const floors = building.floors;
      if (!floors) {
        continue;
      }
      for (let j = 0; j < floors.length && (!fromFloor || !destFloor); j++) {
        const items = floors[j].items;
        if (!items) {
          continue;
        }
        for (let k = 0; k < items.length && (!fromFloor || !destFloor); k++) {
          if (
            !fromFloor &&
            items[k].itemType === "KioskDevice" &&
            items[k].deviceId === did
          ) {
            fromFloor = floors[j];
          }
          if (
            !destFloor &&
            items[k].itemType === "Department" &&
            items[k].orgChartName === destination
          ) {
            destFloor = floors[j];
          }
        }
      }
    }

    if (!fromFloor) {
      fromFloor = bds[0].floors![0];
    }

    const targetFloors = [fromFloor, destFloor];
    const [tabIndex, setTabIndex] = useState(1);

    return (
      <div className="flex w-screen h-screen ">
        <motion.div
          className="flex w-full h-full"
          initial={{
            x: "-100%",
          }}
          animate={{
            x: "0%",
          }}
          exit={{
            x: "-100%",
          }}>
          <RightTitleAdaptiveLayout
            title={`길찾기 > ${destination}`}
            className="">
            <TitleSegmented
              className="absolute h-[66px] z-10
                        top-[171px] max-2xl:left-[50%] max-2xl:translate-x-[-50%] max-2xl:w-[910px]
                        max-2xl:justify-center
                         2xl:top-[33px] 2xl:right-[528px]
                        "
              titles={["출발", "도착"]}
              selectedIndex={tabIndex}
              onSelected={(title, index) => setTabIndex(index)}
            />

            <div className="flex absolute w-full max-2xl:bottom-[50%] 2xl:bottom-[53%] translate-y-[50%] ">
              <FloorArea
                floor={targetFloors[tabIndex]}
                destination={tabIndex === 1 ? destination : undefined}
                startDeviceId={tabIndex === 0 ? did : undefined}
                className="m-auto mb-[40px]max-w-[1700px]"
              />
            </div>

            <p className="absolute max-2xl:top-[16%] top-[120px] right-[36px] font-black text-[80px] text-[#171c31] ">
              {targetFloors[tabIndex]?.buttonName}
            </p>
          </RightTitleAdaptiveLayout>
        </motion.div>
      </div>
    );
  }
);
