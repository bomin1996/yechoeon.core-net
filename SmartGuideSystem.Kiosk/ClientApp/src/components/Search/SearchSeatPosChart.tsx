import React, { useEffect, useState } from "react";
import {
  withModal3,
  withModal4,
  withFullModalWithCloseButton,
} from "src/components/ui/modal/withModal";
import { ISGSeatPosChart } from "@shares/ISGOrganizationChart";
import { KioskApi } from "src/server/kioskApi";
import SeatPositionChart from "../SeatPositionChart";
import {
  BlackRightTitleLayout,
  RightTitleLayout2NoImage,
} from "../RightTitleLayout";
import { motion } from "framer-motion";

interface Props {
  chartId: number;
  chart?: ISGSeatPosChart;
}
export default withFullModalWithCloseButton(function SearchSeatPosChart({
  chartId,
  chart,
}: Props) {
  const [seatPosChart, setSeatPosChart] = useState<ISGSeatPosChart | undefined>(
    chart
  );

  useEffect(() => {
    if (!chart) {
      KioskApi.requesSeatPosChart(chartId)
        .then((charts) => setSeatPosChart(charts))
        .catch((exc) => console.log(exc));
    }
  }, [chartId]);

  const oChart = chart ?? seatPosChart;

  if (!seatPosChart) {
    return null;
  }

  // return (
  //   <RightTitleLayout2NoImage
  //     className="w-full h-full bg-[#9DFFFD]/10"
  //     title={oChart?.name ?? ""}
  //   >
  //     <div className="fixed left-0 right-0 bottom-0 top-0 z-0">
  //       <SeatPositionChart inputChart={oChart} />
  //     </div>
  //   </RightTitleLayout2NoImage>
  // );

  return (
    <div className="flex w-screen h-screen ">
      {/* <motion.div
        className="flex w-full h-full"
        initial={{
          x: "-100%",
        }}
        animate={{
          x: "0%",
        }}
        exit={{
          x: "-100%",
        }}
      > */}
      <SeatPositionChart
        classNameForFrame="bg-main-background bg-center bg-cover bg-no-repeat "
        className=""
        inputChart={oChart}
      />
      {/* </motion.div> */}
      {/* <SeatPositionChart inputChart={oChart} /> */}
    </div>
  );
});
