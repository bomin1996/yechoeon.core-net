import { ISGOrganizationChart, ISGEditOrganizationChart } from "@shares/*";
import axios from "axios";
import { SeatAreaViewModel } from "@/viewmodels/organization_chart/SeatAreaViewModel";
// export namespace OrganizationApis {
//   export async function orgChartList() {
//     try {
//       const res = await fetch(`/api/SharedApi/OragnizationCharts`);
//       const resultJson = await res.json();
//       console.log("OragnizationCharts:", resultJson);
//       return resultJson;
//     } catch (exc) {
//       console.log(exc);
//       return [];
//     }
//   }

//   export async function updateOrgChart(viewModel: SeatAreaViewModel) {
//     console.log("save organization chart:", JSON.stringify(viewModel));

//     const teams = viewModel.groupSeats.map((g, i) => {
//       return {
//         name: g.name,
//         title: g.title,

//         officeTel: g.officeTel,
//         officeFax: g.officeFax,
//         jobDescription: g.job,

//         leader:
//           g.getLeaderMember() !== null
//             ? { sid: g.getLeaderMember()!.sid }
//             : undefined,
//         lines: [
//           g.getLineMembers(0).map((u) => {
//             return { sid: u.sid };
//           }),
//           g.getLineMembers(1).map((u) => {
//             return { sid: u.sid };
//           }),
//         ],
//       };
//     });

//     const requestBody: ISGEditOrganizationChart = {
//       id: viewModel.orgChart?.id ?? 0,
//       deptCode: viewModel.deptCode,
//       title: viewModel.title,
//       name: viewModel.name,
//       desc: viewModel.desc,
//       deptName: viewModel.deptName,
//       officeFax: viewModel.officeFax,
//       officeTel: viewModel.officeTel,
//       departJob: viewModel.departJob,
//       chartType: viewModel.chartType,
//       topDeptLeader: viewModel.topDeptLeader
//         ? { sid: viewModel.topDeptLeader.sid }
//         : undefined,
//       deptLeader: viewModel.deptLeader!,
//       teams: teams,
//     };

//     //https://localhost:7130/api/SharedApi/OragnizationCharts
//     const res = await fetch(`/api/SharedApi/OragnizationCharts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });

//     const resultJson = await res.json();
//     return resultJson;
//   }

//   export async function deleteOrgChart(id: number) {
//     const res = await fetch(`/api/SharedApi/OragnizationChart?id=${id}`, {
//       method: "DELETE",
//     });

//     const resultJson = await res.json();
//     return resultJson;
//   }
// }

export namespace OrganizationApis {
  export async function orgChartList() {
    try {
      const res = await axios.get(`/api/organizationcharts`);
      const resultJson = res.data;
      return resultJson;
    } catch (exc) {
      console.log(exc);
      return [];
    }
  }

  export async function updateOrgChart(viewModel: SeatAreaViewModel) {
    const teams = viewModel.groupSeats.map((g, i) => {
      return {
        name: g.name,
        title: g.title,

        officeTel: g.officeTel,
        officeFax: g.officeFax,
        jobDescription: g.job,

        dontShowTeamDetailButton: g.dontShowTeamDetailButton,
        dontAddTeamWord: g.dontAddTeamWord,

        leader:
          g.getLeaderMember() !== null
            ? { sid: g.getLeaderMember()!.sid }
            : undefined,
        lines: [
          g.getLineMembers(0).map((u) => {
            return { sid: u.sid };
          }),
          g.getLineMembers(1).map((u) => {
            return { sid: u.sid };
          }),
        ],
      };
    });

    const requestBody: ISGEditOrganizationChart = {
      id: viewModel.orgChart?.id ?? 0,
      deptCode: viewModel.deptCode,
      title: viewModel.title,
      name: viewModel.name,
      desc: viewModel.desc,
      deptName: viewModel.deptName,
      officeFax: viewModel.officeFax,
      officeTel: viewModel.officeTel,
      departJob: viewModel.departJob,
      chartType: viewModel.chartType,
      //vm.dontShowTeamDetailButton = organizationChart.dontShowTeamDetailButton ?? false;
      dontShowTeamDetailButton: viewModel.dontShowTeamDetailButton,

      topDeptLeader: viewModel.topDeptLeader
        ? { sid: viewModel.topDeptLeader.sid }
        : undefined,
      deptLeader: viewModel.deptLeader!,
      teams: teams,
    };

    const res = await axios.post(`/api/organizationcharts`, requestBody);
    const resultJson = await res.data;
    return resultJson;
  }

  export async function deleteOrgChart(id: number) {
    const res = await axios.delete(`/api/organizationcharts/${id}`);
    const resultJson = res.data;
    return resultJson;
  }

  export async function existOrgChartName(orgChartName: string) {
    try {
      const res = await axios.get(
        `/api/organizationcharts/${orgChartName}/exist`
      );
      return res;
    } catch (exc) {
      console.log(exc);
    }
  }
}
