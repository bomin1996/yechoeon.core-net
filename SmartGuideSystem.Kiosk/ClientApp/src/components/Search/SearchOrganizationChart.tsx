import React, { useEffect, useState } from "react";
import { withModal3 } from "src/components/ui/modal/withModal";
import { ISGOrganizationChart } from "@shares/ISGOrganizationChart";
import OrganizationChart from "../OrganizationChart";
import { KioskApi } from "src/server/kioskApi";

interface Props {
  orgChartId: number;
  orgChart?: ISGOrganizationChart;
}
export default withModal3(function SearchOrganizationChart({
  orgChartId,
  orgChart,
}: Props) {
  const [organizationChart, setOrganizationChart] = useState<
    ISGOrganizationChart | undefined
  >(orgChart);

  useEffect(() => {
    if (!orgChart) {
      KioskApi.requestOrgChart(orgChartId)
        .then((orgChart) => setOrganizationChart(orgChart))
        .catch((exc) => console.log(exc));
    }
  }, [orgChartId]);

  const oChart = orgChart ? orgChart : organizationChart;

  if (!organizationChart) {
    return null;
  }

  return (
    <div className="flex w-screen h-screen bg-secondary-back1">
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
      <OrganizationChart inputOrgChart={oChart} />
      {/* </motion.div> */}
    </div>
  );
});
