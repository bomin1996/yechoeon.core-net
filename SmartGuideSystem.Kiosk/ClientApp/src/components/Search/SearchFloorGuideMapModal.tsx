import React from "react";
import {
  withFullScreenModalByCloseButton,
  withModal3,
  withModalByCloseButton,
} from "src/components/ui/modal/withModal";
import { motion } from "framer-motion";
import { ISGOrganizationChart, ISGTeam } from "@shares/ISGOrganizationChart";
import OrganizationChart from "../OrganizationChart";
import FloorGuideMap from "../FloorGuideMap";
import logoImage from "src/assets/jin_logo.svg";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface Props {
  deptCode?: string;
  deptName?: string;
  orgChartName?: string;
}
export default withModal3(function SearchFloorGuideMapModal({
  deptCode,
  deptName,
  orgChartName,
}: Props) {
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
        }}
      >
        <FloorGuideMap
          isSearchMode={true}
          deptCode={deptCode}
          orgChartName={orgChartName}
        />
      </motion.div>
    </div>
  );
});
