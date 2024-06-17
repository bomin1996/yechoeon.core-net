import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import KioskContext from "src/contexts/KioskContext";
import TitleSegmented from "../ui/TitleSegmented";
import FloorArea from "./FloorArea";
import { ISGFloor } from "@shares/ISGFloor";
import BuildingFloorsHorizontalCircleMenu from "./BuildingFloorsHorizontalCircleMenu";
import RightTitleLayout, {
  RightTitleLayout2NoImage,
} from "../RightTitleLayout";

interface Props {
  deptCode?: string;
  orgChartName?: string;
  isSearchMode?: boolean;
}

export default function Index({ isSearchMode = false, orgChartName }: Props) {
  const kioskCtx = useContext(KioskContext);
  const { buildingIndex, floorIndex } = useParams();
  const initBuildingIndex = parseInt(buildingIndex ?? "0");
  let initFloorIndex = parseInt(floorIndex ?? "0");

  const [searchParams, _] = useSearchParams();
  const searchFloorName = searchParams.get("floorname");
  if (searchFloorName && kioskCtx?.buildingInfo) {
    const binfo = kioskCtx?.buildingInfo[initBuildingIndex];
    if (binfo) {
      const findIndex = binfo.floors?.findIndex((f, index) => {
        return f.buttonName === searchFloorName;
      });
      if (findIndex && findIndex !== -1) {
        initFloorIndex = findIndex;
      }
    }
  }

  const [selectedBuildingIndex, setSelectedBuildingIndex] =
    useState(initBuildingIndex);
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(initFloorIndex);

  useEffect(() => {
    if (orgChartName && kioskCtx?.buildingInfo) {
      for (let i = 0; i < kioskCtx.buildingInfo!.length; i++) {
        const fs = kioskCtx.buildingInfo![i].floors;
        const idx =
          fs?.findIndex((fr) => {
            const itemIdx =
              fr.items?.findIndex((it) => it.orgChartName === orgChartName) ??
              -1;
            return itemIdx !== -1;
          }) ?? -1;
        if (idx !== -1) {
          setSelectedBuildingIndex(i);
          setSelectedFloorIndex(idx);
          break;
        }
      }
    }
  }, [orgChartName]);

  useEffect(() => {
    if (!isSearchMode) {
      console.log(initBuildingIndex, initFloorIndex);
      setSelectedBuildingIndex(initBuildingIndex);
      setSelectedFloorIndex(initFloorIndex);
    }
  }, [floorIndex]);

  if (!kioskCtx || !kioskCtx.buildingInfo) return null;

  const titles = kioskCtx.buildingInfo.map((bi) => bi.name);
  const building = kioskCtx.buildingInfo[selectedBuildingIndex];
  const floorList = building.floors ?? [];
  const floor =
    selectedFloorIndex >= 0 ? floorList[selectedFloorIndex] : undefined;

  const handleChangeFloorIndex = (floorIndex: number) => {
    setSelectedFloorIndex(floorIndex);
  };

  return (
    <div
      className="relative w-full h-full 
    max-2xl:pt-vertical-topbar-height max-2xl:pb-vertical-bottombar-height  
    2xl:pt-mainTopSpacing 2xl:pb-horizontal-bottombar-height 2xl:pr-mainSecondRightSpacing "
    >
      <RightTitleLayout2NoImage
        title="청사안내도"
        className="w-full h-full pt-[100px] pl-[0px] flex flex-row max-2xl:flex-col max-2xl:items-center max-2xl:pt-[100px] max-2xl:pl-[0px]"
      >
        <FloorLayerLayout
          floor={floor}
          floorList={floorList}
          activeFloorIndex={selectedFloorIndex}
          onChangedFloor={(floorIndex) => setSelectedFloorIndex(floorIndex)}
        />

        <BuildingFloorsHorizontalCircleMenu
          // className="absolute  bottom-[173px] left-[50%] translate-x-[-50%] flex space-x-[16px]"
          className="absolute w-full  bottom-[73px] max-2xl:bottom-[240px] left-[50%] translate-x-[-50%]
          flex-wrap
          flex flex-row justify-center gap-x-[16px] gap-y-[16px]
          "
          floorList={floorList}
          selectedIndex={selectedFloorIndex}
          onClickFloor={(floor, index) => {
            setSelectedFloorIndex(index);
            handleChangeFloorIndex(index);
          }}
        />
        <TitleSegmented
          // className="absolute w-[565px] h-[66px] right-[600px]  top-[59px] z-10 "
          className="absolute h-[66px] z-10
          top-[171px] max-2xl:left-[50%] max-2xl:translate-x-[-50%] max-2xl:w-[910px]
          max-2xl:justify-center
           2xl:top-[33px] 2xl:right-[528px]
          "
          titles={titles}
          selectedIndex={selectedBuildingIndex}
          onSelected={(title, index) => {
            setSelectedBuildingIndex(index);
            if (kioskCtx.buildingInfo![index].floors!.length > 0) {
              setSelectedFloorIndex(0);
            } else {
              setSelectedFloorIndex(-1);
            }
          }}
        />

        <p className="absolute max-2xl:top-[16%] top-[120px] right-[36px] font-black text-[80px] text-button-default ">
          {floor?.buttonName}
        </p>
      </RightTitleLayout2NoImage>
    </div>
  );
}

interface FloorLayerLayoutProps {
  floorList: Array<ISGFloor>;
  floor?: ISGFloor;
  activeFloorIndex: number;
  onChangedFloor: (index: number) => void;
}
//2xl:bottom-[180px]
function FloorLayerLayout({ floor }: FloorLayerLayoutProps) {
  return (
    <div
      // className="absolute w-full bottom-[300px]  "
      className="absolute w-full max-2xl:bottom-[50%] 2xl:bottom-[53%] translate-y-[50%]  "
    >
      {/* <p className="absolute top-[0px] right-[141px] font-black text-[80px] text-[#171c31] z-10">
        {floor?.buttonName}
      </p> */}
      <div className=" h-full  flex">
        <FloorArea floor={floor} className="m-auto mb-[40px] max-w-[1700px]" />
      </div>
    </div>
  );
}
