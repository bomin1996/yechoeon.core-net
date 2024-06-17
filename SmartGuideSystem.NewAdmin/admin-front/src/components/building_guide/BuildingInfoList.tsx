import { useContext, useEffect, useState } from "react";
import TableList from "../TableList";
import EditFloorGuideMapPopup from "./EditFloorGuideMapPopup";
import { ISGBuildingInfo, ISGFloor } from "@shares/";
import { FloorMapViewModel } from "@/viewmodels/floor_map/FloorMapViewModel";
import { FloorApis } from "@/server/floorApis";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import { showListItemDialog, showMessageOkCancelDialog } from "../modals";
import BlockUIContext from "@/contexts/BlockUIContext";
import { showAddNewBuildingDialog } from "../modals/AddNewBuildingModal";
import toast from "react-hot-toast";
import AuthContext from "@/contexts/AuthContext";
import TopTitlePanel from "../TopTitlePanel";
import { ImageMenuButton } from "../ui/button";

import 삭제아이콘 from "@/assets/buttons/menus/삭제.svg";
import 수정아이콘 from "@/assets/buttons/menus/수정.svg";
import 새층추가아이콘 from "@/assets/buttons/menus/새층추가.svg";
import 새빌딩추가아이콘 from "@/assets/buttons/menus/새빌딩추가.svg";
import 엑스아이콘 from "@/assets/buttons/menus/취소.svg";
import IconRoundedTabSegmented, {
  SegmentItemType,
} from "../ui/IconRoundedTabSegmented";
import 빌딩아이콘 from "@/assets/buttons/menus/빌딩아이콘.svg";

export default function BuildingInfoList() {
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ISGFloor>();
  const [buildings, setBuildings] = useState<ISGBuildingInfo[]>([]);
  const dialogCtx = useContext(DialogContext);
  const blockUICtx = useContext(BlockUIContext);
  const authCtx = useContext(AuthContext);

  const requestDeleteFloor = async (floor: ISGFloor) => {
    blockUICtx?.setBlock(true);
    await FloorApis.deleteFloor(floor);
    blockUICtx?.setBlock(false);

    await queryBuildings();
  };

  const queryBuildings = async () => {
    blockUICtx?.setBlock(true);

    const buildings = await FloorApis.buildings();
    blockUICtx?.setBlock(false);

    setBuildings(buildings ? buildings : []);
  };

  const requestUpdateFloor = async (vm: FloorMapViewModel) => {
    try {
      blockUICtx?.setBlock(true);

      const floor = await FloorApis.updateFloor(vm);
      await queryBuildings();

      blockUICtx?.setBlock(false);
    } catch (exc) {
      console.log(exc);
    }
  };

  const editFloor = () => {
    if (filterdItem[selectedRowIndex]) {
      showEditFloorDialog(
        dialogCtx!,
        FloorMapViewModel.from(filterdItem[selectedRowIndex]),
        (vm) => {
          requestUpdateFloor(vm);
        }
      );
    }
  };

  const handleAddNewBuilding = () => {
    showAddNewBuildingDialog(dialogCtx!, async (buildingName, buildingCode) => {
      blockUICtx?.setBlock(true);
      const { result, error } = await FloorApis.addBuilding({
        id: 0,
        deptCode: buildingCode,
        name: buildingName,
        floorIds: [],
      });
      blockUICtx?.setBlock(false);
      if (!error) {
        toast(`추가완료`);
        queryBuildings();
      } else {
        toast(`오류발생: ${error}`);
      }
    });
  };

  const handleDeleteBuilding = () => {
    showListItemDialog(
      dialogCtx!,
      "삭제할 빌딩 선택",
      buildings,
      (it, idx, items, onClick) => {
        return (
          <div
            className="px-4 py-2 rounded-lg hover:bg-black/5 cursor-pointer"
            onClick={() => onClick(it)}>
            <span className="cursor-pointer">
              {it.name} [{it.deptCode}]
            </span>
          </div>
        );
      },
      (item) => {
        dialogCtx?.popDialog();
        const msg = `${item.name} [${item.deptCode}] 를 삭제합니다`;

        showMessageOkCancelDialog(
          dialogCtx!,
          "빌딩삭제",
          msg,
          async () => {
            blockUICtx?.setBlock(true);
            const { result, error } = await FloorApis.deleteBuilding(item.id);
            blockUICtx?.setBlock(false);
            if (!error) {
              toast(`삭제완료`);
              queryBuildings();
            } else {
              toast(`오류발생: ${error}`);
            }
          },
          undefined,
          undefined,
          false
        );
      },
      "space-y-3"
    );
  };

  useEffect(() => {
    queryBuildings();
  }, []);

  const tabTitles = buildings.map((b, i) => b.name);
  const tabItems: Array<SegmentItemType> = buildings.map((b, idx) => {
    return {
      title: b.name,
      icon: 빌딩아이콘,
    };
  });

  let filterdItem: Array<ISGFloor> = [];
  if (buildings.length > 0 && buildings[selectedTabIndex].floors != undefined) {
    filterdItem = buildings[selectedTabIndex].floors!;
  }

  const visibleBuildingButtons = authCtx!.user?.role === "SystemAdmin";

  return (
    <div className="h-full w-full relative pt-topMenuBarHeight text-white bg-[#231f20] ">
      {/* <span className="absolute top-5 left-5 text-2xl font-bold ">
        청사안내도
      </span> */}

      {/* <div className="h-32 bg-[#312a2d] flex flex-row items-end gap-2 pb-0 px-4 flex-shrink-0">
        <RoundedTabSegmented
          titles={tabTitles}
          onSelected={(index) => setSelectedTabIndex(index)}
          selectedIndex={selectedTabIndex}
        />

        {visibleBuildingButtons && (
          <ColorButton
            className="ml-auto mb-2"
            colorStyle="add"
            title="새 빌딩 추가"
            onClick={() => {
              showAddNewBuildingDialog(
                dialogCtx!,
                async (buildingName, buildingCode) => {
                  blockUICtx?.setBlock(true);
                  const { result, error } = await FloorApis.addBuilding({
                    id: 0,
                    deptCode: buildingCode,
                    name: buildingName,
                    floorIds: [],
                  });
                  blockUICtx?.setBlock(false);
                  if (!error) {
                    toast(`추가완료`);
                    queryBuildings();
                  } else {
                    toast(`오류발생: ${error}`);
                  }
                }
              );
            }}
          />
        )}

        {visibleBuildingButtons && (
          <ColorButton
            className="mb-2 mr-[16px]"
            colorStyle="delete"
            title="빌딩 삭제"
            onClick={() => {
              showListItemDialog(
                dialogCtx!,
                "삭제할 빌딩 선택",
                buildings,
                (it, idx, items, onClick) => {
                  return (
                    <div
                      className="px-4 py-2 rounded-lg hover:bg-black/5 cursor-pointer"
                      onClick={() => onClick(it)}
                    >
                      <span className="cursor-pointer">
                        {it.name} [{it.deptCode}]
                      </span>
                    </div>
                  );
                },
                (item) => {
                  dialogCtx?.popDialog();
                  const msg = `${item.name} [${item.deptCode}] 를 삭제합니다`;

                  showMessageOkCancelDialog(
                    dialogCtx!,
                    "빌딩삭제",
                    msg,
                    async () => {
                      blockUICtx?.setBlock(true);
                      const { result, error } = await FloorApis.deleteBuilding(
                        item.id
                      );
                      blockUICtx?.setBlock(false);
                      if (!error) {
                        toast(`삭제완료`);
                        queryBuildings();
                      } else {
                        toast(`오류발생: ${error}`);
                      }
                    },
                    undefined,
                    undefined,
                    false
                  );
                },
                "space-y-3"
              );
            }}
          />
        )}

        <ColorButton
          className="ml-auto mb-2"
          colorStyle="delete"
          title="삭제"
          disable={!selectedItem}
          onClick={() => {
            showMessageOkCancelDialog(
              dialogCtx!,
              "삭제",
              `${selectedItem?.buttonName}을 삭제합니다`,
              () => {
                requestDeleteFloor(selectedItem!);
              }
            );
          }}
        />

        <ColorButton
          className="mb-2"
          colorStyle="modify"
          title="수정"
          disable={!selectedItem}
          onClick={() =>
            showEditFloorDialog(
              dialogCtx!,
              FloorMapViewModel.from(filterdItem[selectedRowIndex]),
              (vm) => {
                //FloorApis.updateFloor(vm);
                requestUpdateFloor(vm);
              }
            )
          }
        />

        <ColorButton
          className="mb-2"
          colorStyle="add"
          title="새 층 추가"
          onClick={() => {
            const newFloorVm = new FloorMapViewModel();
            newFloorVm.buildingId = buildings[selectedTabIndex].id;
            showEditFloorDialog(dialogCtx!, newFloorVm, (vm) => {
              requestUpdateFloor(vm);
            });
          }}
        />
      </div> */}

      <TopTitlePanel
        title="청사안내도"
        visibleSearch={false}
        className="absolute left-0 top-0 w-full h-[120px]">
        <IconRoundedTabSegmented
          items={tabItems}
          className="absolute bottom-0 left-4"
          onSelected={(index) => setSelectedTabIndex(index)}
          selectedIndex={selectedTabIndex}
        />

        <div className="flex absolute right-[32px] bottom-0 divide-x space-x-[12px] py-[12px]">
          <ImageMenuButton
            title={"새 빌딩 추가"}
            colorType="red"
            imageSrc={새빌딩추가아이콘}
            onClick={handleAddNewBuilding}
          />
          <ImageMenuButton
            title={"빌딩삭제"}
            imageSrc={엑스아이콘}
            disabled={!selectedItem}
            onClick={handleDeleteBuilding}
          />
          <ImageMenuButton
            title={"수정"}
            imageSrc={수정아이콘}
            disabled={!selectedItem}
            onClick={editFloor}
          />
          <ImageMenuButton
            title={"삭제"}
            imageSrc={삭제아이콘}
            disabled={!selectedItem}
            onClick={() => {
              showMessageOkCancelDialog(
                dialogCtx!,
                "삭제",
                `${selectedItem?.buttonName}을 삭제합니다`,
                () => {
                  requestDeleteFloor(selectedItem!);
                }
              );
            }}
          />
          <ImageMenuButton
            title={"새로만들기"}
            colorType="yellow"
            imageSrc={새층추가아이콘}
            onClick={() => {
              const newFloorVm = new FloorMapViewModel();
              newFloorVm.buildingId = buildings[selectedTabIndex].id;
              showEditFloorDialog(dialogCtx!, newFloorVm, (vm) => {
                requestUpdateFloor(vm);
              });
            }}
          />
        </div>
      </TopTitlePanel>

      <TableList
        selectedRowIndex={selectedRowIndex}
        onSelectRow={(idx) => {
          setSelectedRowIndex(idx);
          setSelectedItem(filterdItem![idx]);
          // console.log("selected floor:", filterdItem![idx]);
        }}
        className="w-full h-full px-[33px] overflow-auto"
        columnNames={[
          "order",
          "floorMapType",
          "buttonName",
          "title",
          "modifydate",
          "editUser",
        ]}
        columnTitles={[
          "표시순서",
          "타입",
          "층 이름",
          "층 제목",
          "수정일",
          "작업자",
        ]}
        rowItems={filterdItem ?? []}
        onDoubleClickRow={editFloor}
        renderForColumn={(colData, index) => {
          if (index === 1) {
            return colData === 0 ? "정방향" : "역방향";
          } else {
            return colData;
          }
        }}
      />
    </div>
  );
}

function showEditFloorDialog(
  ctx: IDialogContextData,
  viewModel: FloorMapViewModel,
  onOk: (viewModel: FloorMapViewModel) => void,
  onCancel?: () => void
): void {
  ctx?.pushDialog(
    <EditFloorGuideMapPopup
      key="EditFloorGuideMapPopup"
      onClose={() => ctx!.popDialog()}
      isOpen={true}
      viewModel={viewModel}
      onOk={(vm) => {
        ctx!.popDialog();
        onOk(vm);
      }}
      onCancle={() => ctx!.popDialog()}
    />
  );
}
