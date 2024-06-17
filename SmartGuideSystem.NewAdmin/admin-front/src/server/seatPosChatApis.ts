import axios from "axios";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import {
  ISGSeatPosChart,
} from "@shares/ISGSeatPosChart";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";

export namespace seatPosChatApis {
  export async function seatPosChatList() {
    try {
      const res = await axios.get(`/api/seatposcharts`);
      const resultJson = res.data;
      return resultJson;
    } catch (exc) {
      console.log(exc);
      return [];
    }
  }

  export async function updatePosChart(viewModel: SeatingChartViewModel) {
    const nodes = viewModel.placeItems.map((node, index) =>
      convertSCNode(node)
    );

    const requestBody: ISGSeatPosChart = {
      id: viewModel.seatPosChart?.id ?? 0,
      title: viewModel.title,

      officeTel: viewModel.officeTel,
      officeFax: viewModel.officeFax,
      jobDescription: viewModel.jobDescription,

      name: viewModel.name,
      desc: viewModel.desc,
      deptCode: viewModel.deptCode,
      deptName: viewModel.deptName,
      department: viewModel.department,

      chartType: "free style",
      useYn: true,

      nodes: nodes,

      width: viewModel.width,
      height: viewModel.height,
    };

    const res = await axios.post(`/api/seatposcharts`, requestBody);
    const resultJson = await res.data;
    return resultJson;
  }

  export async function deletePosChart(id: number) {
    const res = await axios.delete(`/api/seatposcharts/${id}`);
    const resultJson = res.data;
    return resultJson;
  }

  function convertSCNode(viewModel: BaseSeatingPlaceViewModel): any {
    // if (viewModel.seatingType === "Member") {
    //   const mVm = viewModel as MemberSeatingPlaceViewModel;
    //   const mNode: ISGSCMemberNode = mvm

    //   return mNode;
    // } else {
    //   throw "Not implemnt";
    // }

    return viewModel.toNode();
  }

  export async function existChartName(chartName: string) {
    try {
      const res = await axios.get(`/api/seatposcharts/${chartName}/exist`);
      return res;
    } catch (exc) {
      console.log(exc);
    }
  }
}
