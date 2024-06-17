import { useContext, useEffect, useState } from "react";
import { ISGDepartment, ISGSeatPosChart } from "@shares/ISGDepartment";
import { showSelectDepartmentPopup } from "../modals/SelectFindDepartmentModal";
import TableList from "../TableList";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import DialogModal from "../ui/modal/DialogModal";
import BlockUIContext from "@/contexts/BlockUIContext";
import AuthContext from "@/contexts/AuthContext";
import { DeptApis } from "@/server/deptApis";
import SeatingChartMain from "./SeatingChartMain";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import { seatPosChatApis } from "@/server/seatPosChatApis";
import { descTime } from "@/helpers/desc-helpers";
import { toast } from "react-hot-toast";
import TopTitlePanel from "../TopTitlePanel";
import { ImageMenuButton } from "../ui/button";
import 새로만들기아이콘 from "@/assets/buttons/menus/새로만들기.svg";
import 삭제아이콘 from "@/assets/buttons/menus/삭제.svg";
import 수정아이콘 from "@/assets/buttons/menus/수정.svg";
import { showMessageOkCancelDialog } from "../modals";

export default function SeatingChartList() {
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [charts, setPosCharts] = useState<Array<ISGSeatPosChart>>([]);
  const [selectedPosChart, setSelectedPosChart] = useState<ISGSeatPosChart>();
  const [searchText, setSearchText] = useState("");
  const authCtx = useContext(AuthContext);
  const blockUICtx = useContext(BlockUIContext);
  const dialogCtx = useContext(DialogContext);

  const requestCharts = async () => {
    blockUICtx?.setBlock(true);
    try {
      const result = await seatPosChatApis.seatPosChatList();
      setPosCharts(result);
    } catch (exc) {
      console.log(exc);
    } finally {
      blockUICtx?.setBlock(false);
    }
  };

  const requestDeletePosChart = async (id: number) => {
    try {
      // const result = await seatPosChatApis.deletePosChart(id);
      await requestCharts();
      toast("삭제완료");
    } catch (exc) {
      console.log(exc);
    }
  };

  const requestUpdatePosChart = async (viewModel: SeatingChartViewModel) => {
    const posChart = await seatPosChatApis.updatePosChart(viewModel);
    if (posChart as ISGSeatPosChart) {
      //console.log("update open:", posChart);
      await requestCharts();
      toast("수정완료");
    }
  };

  const requestSavePosChart = async (vm: SeatingChartViewModel) => {
    const posChart = await seatPosChatApis.updatePosChart(vm);

    if (posChart as ISGSeatPosChart) {
      // setPosCharts([...charts, posChart]);
      await requestCharts();
      toast("추가완료");
    }
  };

  useEffect(() => {
    requestCharts();
  }, []);

  const handleEditSeatPosChart = () => {
    if (selectedPosChart) {
      showEditPosChartPopup(
        dialogCtx!,
        SeatingChartViewModel.from(selectedPosChart),
        selectedPosChart.department!,
        async (vm) => {
          blockUICtx?.setBlock(true);
          await requestUpdatePosChart(vm);
          blockUICtx?.setBlock(false);
        },
        () => {}
      );
    }
  };

  const handleAddSeatPosChartByDepartmentManager = async (deptCode: string) => {
    blockUICtx?.setBlock(true);
    const department = await DeptApis.department(deptCode);
    blockUICtx?.setBlock(false);

    if (department) {
      const vm = new SeatingChartViewModel();
      vm.department = department;
      vm.deptCode = department.deptCode;
      vm.deptName = department.name;
      vm.officeTel = department.officeTel;
      vm.officeFax = department.officeFax;
      vm.jobDescription = department.jobDescription;
      vm.name = department.name;
      vm.title = department.name;

      showEditPosChartPopup(dialogCtx!, vm, department, async (viewModel) => {
        blockUICtx?.setBlock(true);
        await requestSavePosChart(viewModel);
        blockUICtx?.setBlock(false);
      });
    }
  };

  const handleShowSelectDepartment = () => {
    if (authCtx?.user?.role === "DepartManager") {
      if (authCtx?.user?.deptCode) {
        handleAddSeatPosChartByDepartmentManager(authCtx?.user?.deptCode);
      }
    } else {
      showSelectDepartmentPopup(dialogCtx!, (department) => {
        const vm = new SeatingChartViewModel();
        vm.department = department;
        vm.deptCode = department.deptCode;
        vm.deptName = department.name;
        vm.name = department.name;
        vm.title = department.name;

        showEditPosChartPopup(dialogCtx!, vm, department, async (viewModel) => {
          blockUICtx?.setBlock(true);
          await requestSavePosChart(viewModel);
          blockUICtx?.setBlock(false);
        });
      });
    }
  };

  const handleShowSelectDepartmentCopy = () => {
    if (authCtx?.user?.role !== "DepartManager" && selectedPosChart) {
      const msg = `[${selectedPosChart.name}]배치도를 이용하여 복사생성합니다.\n멤버는 빈칸으로 대치됩니다.`;
      showMessageOkCancelDialog(dialogCtx!, "복사생성하기", msg, () => {
        showSelectDepartmentPopup(dialogCtx!, (department) => {
          const from = SeatingChartViewModel.from(selectedPosChart);
          const vm = new SeatingChartViewModel();
          vm.department = department;
          vm.deptCode = department.deptCode;
          vm.deptName = department.name;
          vm.name = department.name;
          vm.title = department.name;
          vm.copyFrom(from);

          showEditPosChartPopup(
            dialogCtx!,
            vm,
            department,
            async (viewModel) => {
              blockUICtx?.setBlock(true);
              await requestSavePosChart(viewModel);
              blockUICtx?.setBlock(false);
            }
          );
        });
      });
    }
  };

  const filteredCharts = searchText
    ? charts.filter((oct) => oct.name.includes(searchText))
    : charts;

  return (
    <div className="h-full w-full relative pt-topMenuBarHeight text-white bg-[#231f20] overflow-auto">
      <TopTitlePanel
        title="자리배치도"
        className="absolute left-0 top-0 w-full h-[120px]"
        searchText={searchText}
        placeholder="배치도 이름,제목,관련부서명으로 검색"
        onChangedSearchText={(st) => setSearchText(st)}
      >
        <div className="flex absolute right-[32px] bottom-0 divide-x space-x-[12px] py-[12px]">
          {authCtx?.user?.role !== "DepartManager" && (
            <ImageMenuButton
              title={"복사생성"}
              colorType="yellow"
              imageSrc={새로만들기아이콘}
              onClick={handleShowSelectDepartmentCopy}
            />
          )}

          <ImageMenuButton
            title={"수정"}
            imageSrc={수정아이콘}
            disabled={!selectedPosChart}
            onClick={() => handleEditSeatPosChart()}
          />
          <ImageMenuButton
            title={"삭제"}
            imageSrc={삭제아이콘}
            disabled={!selectedPosChart}
            onClick={() => {
              showDeleteChartPopup(dialogCtx!, selectedPosChart!, async () => {
                blockUICtx?.setBlock(true);
                await requestDeletePosChart(selectedPosChart!.id);
                blockUICtx?.setBlock(false);
              });
            }}
          />

          <ImageMenuButton
            title={"새로만들기"}
            colorType="yellow"
            imageSrc={새로만들기아이콘}
            onClick={handleShowSelectDepartment}
          />
        </div>
      </TopTitlePanel>

      <TableList
        selectedRowIndex={selectedRowIndex}
        onSelectRow={(idx) => {
          setSelectedRowIndex(idx);
          setSelectedPosChart(filteredCharts[idx]);
        }}
        className="w-full h-full  px-[33px] overflow-auto "
        columnNames={["name", "deptName", "desc", "modifier", "modifiedTime"]}
        columnTitles={[
          "배치도이름",
          "관련부서명",
          "설명",
          "작업자",
          "수정일자",
        ]}
        rowItems={filteredCharts}
        onDoubleClickRow={(index) => handleEditSeatPosChart()}
        renderForColumn={(cd, index, cn) => {
          if (cn === "modifiedTime") {
            return descTime(cd);
          }

          return cd;
        }}
      />
    </div>
  );
}

function showEditPosChartPopup(
  ctx: IDialogContextData,
  viewModel: SeatingChartViewModel,
  department: ISGDepartment,
  onOk: (viewModel: SeatingChartViewModel) => void,
  onCancel?: () => void
): void {
  ctx?.pushDialog(
    <SeatingChartMain
      isOpen={true}
      seatingViewModel={viewModel}
      depart={department!}
      onOk={async () => {
        onOk(viewModel);
        ctx!.popDialog();
      }}
      onCancle={() => {
        ctx!.popDialog();
        onCancel?.();
      }}
      onClose={() => {
        ctx!.popDialog();
        onCancel?.();
      }}
    />
  );
}

function showDeleteChartPopup(
  ctx: IDialogContextData,
  chart: ISGSeatPosChart,
  onOk: () => void,
  onCancel?: () => void
): void {
  ctx?.pushDialog(
    <DialogModal
      key="showDeleteChartPopup"
      isOpen={true}
      title={`자리배치도 삭제`}
      onOk={() => {
        ctx!.popDialog();
        onOk();
      }}
      onClose={() => {
        ctx!.popDialog();
        onCancel?.();
      }}
      onCancel={() => {
        ctx!.popDialog();
        onCancel?.();
      }}
    >
      <p>자리배치도 {chart.name} 삭제합니다?</p>
    </DialogModal>
  );
}
