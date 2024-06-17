import { useContext, useEffect, useState } from "react";
import { ISGDepartment, ISGOrganizationChart } from "@shares/ISGDepartment";
import { showSelectDepartmentPopup } from "../modals/SelectFindDepartmentModal";
import TableList from "../TableList";
import ColorButton from "../ui/button/ColorButton";
import EditOrganizationChartPopup from "./organization_chart_edit/EditOrganizationChartPopup";
import { OrganizationApis } from "@/server/organizationApis";
import { SeatAreaViewModel } from "@/viewmodels/organization_chart/SeatAreaViewModel";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import DialogModal from "../ui/modal/DialogModal";
import BlockUIContext from "@/contexts/BlockUIContext";
import AuthContext from "@/contexts/AuthContext";
import { DeptApis } from "@/server/deptApis";
import SearchInput2 from "../ui/input/SearchInput2";
import { descTime24 } from "@/helpers/desc-helpers";
import { toast } from "react-hot-toast";

export default function OrganizationChartList() {
  const authCtx = useContext(AuthContext);
  const blockUICtx = useContext(BlockUIContext);

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [orgCharts, setOrgCharts] = useState<Array<ISGOrganizationChart>>([]);
  // const [selectedOrgChart, setSelectedOrgChart] =
  //   useState<ISGOrganizationChart>();
  const [searchText, setSearchText] = useState("");

  const requestOrgChars = async () => {
    blockUICtx?.setBlock(true);
    try {
      const result = await OrganizationApis.orgChartList();
      setOrgCharts(result);
    } catch (exc) {
      console.log(exc);
    } finally {
      blockUICtx?.setBlock(false);
    }
  };

  const requestDeleteOrgChart = async (id: number) => {
    try {
      // const result = await OrganizationApis.deleteOrgChart(id);
      await requestOrgChars();
    } catch (exc) {
      console.log(exc);
    }
  };

  const requestUpdateOrgChart = async (viewModel: SeatAreaViewModel) => {
    const orgChart = await OrganizationApis.updateOrgChart(viewModel);
    if (orgChart as ISGOrganizationChart) {
      // console.log("update open:", orgChart);
      // const index = orgCharts.findIndex((o) => o.id === orgChart.id);
      // if (index !== -1) {
      //   orgCharts[index] = orgChart;

      //   setOrgCharts([...orgCharts]);
      // }
      await requestOrgChars();
    }
  };

  const requestSaveOrganizationChart = async (vm: SeatAreaViewModel) => {
    const orgChart = await OrganizationApis.updateOrgChart(vm);
    if (orgChart as ISGOrganizationChart) {
      setOrgCharts([...orgCharts, orgChart]);
      setSelectedRowIndex(-1);
    }
  };

  useEffect(() => {
    requestOrgChars();
  }, []);

  const dialogCtx = useContext(DialogContext);

  const handleEditOrganizationChart = () => {
    if (selectedOrgChart) {
      showEditOrganizationChartPopup(
        dialogCtx!,
        SeatAreaViewModel.from(selectedOrgChart),

        selectedOrgChart.department!,
        async (vm) => {
          blockUICtx?.setBlock(true);
          await requestUpdateOrgChart(vm);
          blockUICtx?.setBlock(false);
        },
        () => {}
      );
    }
  };

  const handleAddOrgChartByDepartmentManager = async (deptCode: string) => {
    blockUICtx?.setBlock(true);
    const department = await DeptApis.department(deptCode);
    blockUICtx?.setBlock(false);

    if (department) {
      const vm = new SeatAreaViewModel(department.deptCode, department.name);
      vm.officeTel = department.officeTel;
      vm.officeFax = department.officeFax;

      showEditOrganizationChartPopup(
        dialogCtx!,
        vm,
        department,
        async (viewModel) => {
          blockUICtx?.setBlock(true);
          await requestSaveOrganizationChart(viewModel);
          blockUICtx?.setBlock(false);
          toast("추가되었습니다.");
        }
      );
    }
  };

  const handleShowSelectDepartment = () => {
    if (authCtx?.user?.role === "DepartManager") {
      if (authCtx?.user?.deptCode) {
        handleAddOrgChartByDepartmentManager(authCtx?.user?.deptCode);
      }
    } else {
      showSelectDepartmentPopup(dialogCtx!, (department) => {
        const vm = new SeatAreaViewModel(department.deptCode, department.name);
        vm.officeTel = department.officeTel;
        vm.officeFax = department.officeFax;
        showEditOrganizationChartPopup(
          dialogCtx!,
          vm,
          department,
          async (viewModel) => {
            blockUICtx?.setBlock(true);
            await requestSaveOrganizationChart(viewModel);
            blockUICtx?.setBlock(false);
          }
        );
      });
    }
  };

  const filteredCharts = searchText
    ? orgCharts.filter((oct) => oct.name.includes(searchText))
    : orgCharts;

  const selectedOrgChart = filteredCharts[selectedRowIndex];

  return (
    <div className="h-full w-full relative flex flex-col text-white bg-[#231f20] overflow-auto">
      <span className="absolute top-5 left-5 text-2xl font-bold ">
        조직도 리스트
      </span>

      <div className="h-32 bg-[#464344] flex flex-row items-end gap-2 pb-0 px-8 flex-shrink-0">
        <div className="flex w-full mb-2 gap-2">
          <SearchInput2
            className="mr-auto"
            placeholder="조직도 이름,제목,관련부서명으로 검색"
            inputText={searchText}
            onChange={(text) => {
              setSearchText(text);
            }}
          />

          {/* <SearchInput
            className="mr-10 h-8 w-80"
            inputText={searchText}
            onChange={(input) => {
              setSearchText(input);
            }}
            placeholder="검색어"
          /> */}

          <ColorButton
            className="ml-auto"
            colorStyle="cancel"
            title="삭제"
            disable={!selectedOrgChart}
            onClick={() => {
              showDeleteChartPopup(dialogCtx!, selectedOrgChart!, () => {
                //deleteOrgChart
                requestDeleteOrgChart(selectedOrgChart!.id);
              });
            }}
          />
          <ColorButton
            colorStyle="normal"
            title="수정"
            disable={!selectedOrgChart}
            onClick={() => handleEditOrganizationChart()}
          />
          <ColorButton
            colorStyle="open"
            title="새로만들기"
            onClick={handleShowSelectDepartment}
          />
        </div>
      </div>

      <TableList
        selectedRowIndex={selectedRowIndex}
        onSelectRow={(idx) => {
          setSelectedRowIndex(idx);
          // setSelectedOrgChart(filteredCharts[idx]);
        }}
        className="w-full px-[33px] overflow-auto "
        columnNames={[
          "name",
          "title",
          "deptName",
          "desc",
          "modifier",
          "modifiedTime",
        ]}
        columnTitles={[
          "조직도이름",
          "조직도제목",
          "관련부서명",
          "조직도설명",
          "수정자",
          "수정일자",
        ]}
        rowItems={filteredCharts}
        onDoubleClickRow={(index) => handleEditOrganizationChart()}
        renderForColumn={(colData, colIndex) => {
          if (colIndex === 5) {
            return descTime24(colData);
          } else {
            return colData;
          }
        }}
      />
    </div>
  );
}

function showEditOrganizationChartPopup(
  ctx: IDialogContextData,
  viewModel: SeatAreaViewModel,
  department: ISGDepartment,
  onOk: (viewModel: SeatAreaViewModel) => void,
  onCancel?: () => void
): void {
  ctx?.pushDialog(
    <EditOrganizationChartPopup
      isOpen={true}
      depart={department!}
      viewModel={viewModel}
      onOk={() => {
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
  orgChart: ISGOrganizationChart,
  onOk: () => void,
  onCancel?: () => void
): void {
  ctx?.pushDialog(
    <DialogModal
      key="showDeleteChartPopup"
      isOpen={true}
      title={`조직도 삭제`}
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
      <p>
        {orgChart.department?.name} 부서의 조직도 [{orgChart.name}] 삭제합니다?
      </p>
    </DialogModal>
  );
}
