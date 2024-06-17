import React, { useContext, useEffect, useState } from "react";
import { ColorButton, ImageMenuButton } from "../ui/button";
import TopTitlePanel from "../TopTitlePanel";
import TableList from "../TableList";
import { IHABusInfo } from "@shares/*";
import BlockUIContext from "@/contexts/BlockUIContext";
import DialogContext from "@/contexts/DialogContext";
import 새로만들기아이콘 from "@/assets/buttons/menus/새로만들기.svg";
import 삭제아이콘 from "@/assets/buttons/menus/삭제.svg";
import 수정아이콘 from "@/assets/buttons/menus/수정.svg";

export interface HABusInfo {
  busTypeName?: string;
  busRouteName?: string;
  desc?: string;
}

const sampleBusInfoList = [
  "시외버스",
  "공영버스(군내)",
  "농어촌버스(군내)",
  "농어촌버스(함안.창원)",
  "시내버스(창원)",
];

// function groupBy<T>(collection: T[], key: keyof T) {
//   const groupedResult = collection.reduce((previous, current) => {
//     if (!previous[current[key]]) {
//       previous[current[key]] = [] as T[];
//     }

//     previous[current[key]].push(current);
//     return previous;
//   }, {} as any); // tried to figure this out, help!!!!!
//   return groupedResult;
// }
// const groups = groupBy<IHABusInfo>(busInfoList, "busTypeName");

import IconRoundedTabSegmented, {
  SegmentItemType,
} from "../ui/IconRoundedTabSegmented";
import showHABusRouteInfoDialog from "../dialogs/haman/HABusRouteInfoDialog";
import { HABusApi } from "@/server/HABusApis";
import toast from "react-hot-toast";
import { showMessageOkCancelDialog } from "../modals";
import showHABusFareInfoDialog from "../dialogs/haman/HABusFareDialog";

export default function BusRouteList() {
  const [busInfoList, setBusInfoList] = useState<Array<IHABusInfo>>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const blockUICtx = useContext(BlockUIContext);
  const dialogCtx = useContext(DialogContext);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const queryBusInfoList = async () => {
    blockUICtx?.setBlock(true);
    const { result, error } = await HABusApi.busInfoList();
    blockUICtx?.setBlock(false);
    if (!error) {
      setBusInfoList(result);
    }
  };

  useEffect(() => {
    queryBusInfoList();
  }, []);

  const handleAddBusRoute = () => {
    showHABusRouteInfoDialog(dialogCtx!, {
      title: "새 버스 노선 등록",
      busRouteInfo: {
        id: 0,
        busTypeName: selectedItem?.busTypeName ?? "",
        busRouteName: "",
        imageUrl: "",
        desc: "",
        useYn: true,
      },
      onOk: async (formData) => {
        blockUICtx?.setBlock(true);
        const { error } = await HABusApi.addBusRouteInfo(formData);
        blockUICtx?.setBlock(false);
        if (!error) {
          toast(`추가완료`);
          queryBusInfoList();
        } else {
          toast(`오류발생: ${error}`);
        }
      },
    });
  };

  const handleEditBusRoute = () => {
    console.log("handleEditBusRoute", selectedItem);
    showHABusRouteInfoDialog(dialogCtx!, {
      title: "버스 노선 수정",
      busRouteInfo: {
        id: selectedItem.id,
        busTypeName: selectedItem.busTypeName,
        busRouteName: selectedItem.busRouteName,
        imageUrl: selectedItem.imageUrl,
        desc: selectedItem.desc,
        useYn: true,
      },
      onOk: async (formData) => {
        blockUICtx?.setBlock(true);
        const { error } = await HABusApi.updateBusRouteInfo(
          selectedItem.id,
          formData
        );
        blockUICtx?.setBlock(false);
        if (!error) {
          toast(`수정완료`);
          queryBusInfoList();
        } else {
          toast(`오류발생: ${error}`);
        }
      },
    });
  };

  const handleDeleteBusRoute = () => {
    console.log("handleDeleteBusRoute", selectedItem);
    showMessageOkCancelDialog(
      dialogCtx!,
      "버스노선 삭제",
      `${selectedItem.busRouteName} / ${selectedItem.desc} 삭제?`,
      async () => {
        blockUICtx?.setBlock(true);
        const { result, error } = await HABusApi.removeBusRouteInfo(
          selectedItem
        );
        blockUICtx?.setBlock(false);
        if (!error) {
          const idx = busInfoList.findIndex((u) => u.id === selectedItem.id);
          busInfoList.splice(idx, 1);
          setBusInfoList([...busInfoList]);
          toast(`삭제완료`);
        } else {
          toast(`오류발생: ${error}`);
        }
      }
    );
  };

  const handleEditBusFare = () => {
    const selectedFareItem = filteredList.find(
      (f) => f.dataType === "BusFare" && f.busTypeName === selectedTitle
    );

    let fareInfo: IHABusInfo;
    if (selectedFareItem) {
      console.log("selectedFareItem", selectedFareItem);
      fareInfo = {
        id: selectedFareItem.id,
        busTypeName: selectedFareItem.busTypeName,
        imageUrl: selectedFareItem.imageUrl,
        desc: selectedFareItem.desc,
        useYn: true,
      };
    } else {
      console.log("selectedFareItem is null");
      fareInfo = {
        id: 0,
        busTypeName: selectedItem.busTypeName,
        imageUrl: "",
        desc: "",
        useYn: true,
      };
    }

    console.log("handleEditBusRoute", selectedItem);
    showHABusFareInfoDialog(dialogCtx!, {
      title: fareInfo.busTypeName + "운임정보 입력",
      busRouteInfo: fareInfo,
      onOk: async (formData) => {
        blockUICtx?.setBlock(true);

        if (fareInfo.id === 0) {
          const { error } = await HABusApi.addBusRouteInfo(formData);
          blockUICtx?.setBlock(false);
          if (!error) {
            toast(`추가완료`);
            queryBusInfoList();
          } else {
            toast(`오류발생: ${error}`);
          }
        } else {
          const { error } = await HABusApi.updateBusRouteInfo(
            selectedItem.id,
            formData
          );
          blockUICtx?.setBlock(false);
          if (!error) {
            toast(`수정완료`);
            queryBusInfoList();
          } else {
            toast(`오류발생: ${error}`);
          }
        }
      },
    });
  };

  let titles = [...new Set(busInfoList.map((v) => v.busTypeName))];
  if (titles === undefined) {
    titles = [];
  }
  const tabItems: Array<SegmentItemType> = titles.map((b, idx) => {
    return {
      title: b ?? "",
      icon: undefined,
    };
  });

  const selectedTitle = titles[selectedTabIndex];
  const filteredList = busInfoList.filter(
    (b) => b.busTypeName === selectedTitle
  );
  const selectedRoute = filteredList ? filteredList[selectedRowIndex] : [];
  const selectedItem = filteredList[selectedRowIndex];

  return (
    <div className="h-full w-full  flex-shrink-0  relative flex flex-col text-white bg-[#231f20] pt-topMenuBarHeight">
      <TopTitlePanel
        title="함안군 버스 노선관리"
        className="absolute left-0 top-0 w-full h-[120px]"
        visibleSearch={false}>
        <IconRoundedTabSegmented
          items={tabItems}
          className="absolute bottom-0 left-4"
          onSelected={(index) => setSelectedTabIndex(index)}
          selectedIndex={selectedTabIndex}
        />

        <div className="flex absolute right-[32px] bottom-0 divide-x space-x-[12px] py-[12px]">
          <ImageMenuButton
            title={"수정"}
            imageSrc={수정아이콘}
            disabled={!selectedRoute}
            onClick={handleEditBusRoute}
          />
          <ImageMenuButton
            title={"삭제"}
            imageSrc={삭제아이콘}
            disabled={!selectedRoute}
            onClick={handleDeleteBusRoute}
          />
          <ImageMenuButton
            title={"신규 노선 등록"}
            colorType="yellow"
            imageSrc={새로만들기아이콘}
            onClick={handleAddBusRoute}
          />
        </div>
      </TopTitlePanel>

      <ColorButton
        className="w-[300px]  ml-6 mt-4"
        title={`${selectedTitle} 운임 정보 입력`}
        onClick={handleEditBusFare}
        colorStyle="cancel"
      />

      <TableList
        selectedRowIndex={selectedRowIndex}
        onSelectRow={(idx) => {
          setSelectedRowIndex(idx);
        }}
        className="w-full h-full px-[33px] bg-[#231f20] overflow-auto "
        columnNames={["busTypeName", "busRouteName", "desc"]}
        columnTitles={["버스명", "노선명", "설명"]}
        rowItems={filteredList !== undefined ? filteredList : []}
        onDoubleClickRow={(index) => {
          // setSelectedItem(filteredList[index]);
          //   handleEditDevice();
        }}
      />
    </div>
  );
}
