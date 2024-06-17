using Npgsql.Internal.TypeHandlers.GeometricHandlers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGuideSystem.DB.Model.JSON
{
    public class SGEditOrganizationChartJson
    {
        public int Id { get; set; }
        public string DeptCode { get; set; }
        public string ChartType { get; set; }
        public string DeptName { get; set; }
        public string Name { get; set; }
        public string? Desc { get; set; }
        public string? Title { get; set; }
        public string? OfficeTel { get; set; }
        public string? OfficeFax { get; set; }
        public string? DepartJob { get; set; }


        public SGEditUser? TopDeptLeader { get; set; }
        public SGEditUser? DeptLeader { get; set; }
        public SGEditTeam[]? Teams { get; set; }
    }

    public class SGEditUser
    {
        public string Sid { get; set; }
    }

    public class SGEditTeam
    {
        public string Name { get; set; }
        public string? Title { get; set; }

        public string? OfficeTel { get; set; }
        public string? OfficeFax { get; set; }
        public string? JobDescription { get; set; }

        public bool? DontAddTeamWord { get; set; }
        public bool? DontShowTeamDetailButton { get; set; }

        public SGEditUser? Leader { get; set; }

        public List<List<SGEditUser>>? Lines { get; set; }
    }
}


//export interface ISGEditOrganizationChart
//{
//    id: number;
//    deptCode: string;
//    title: string;
//    chartType: string;

//    topDeptLeader?: ISGEditUser;
//    deptLeader?: ISGEditUser;
//    teams?:Array<ISGEditTeam>;
//}

//export interface ISGEditTeam
//{
//    name: string;
//  title?: string;
//  leader?: ISGEditUser;
//  members?: Array<ISGEditUser>;
//}

//export interface ISGEditUser
//{
//    sid: string;
//}