using HanChosung;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotifyKioskServer;
using SmartGuideSystem.Common.Defines;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.DB.Model.JSON;
using System.Security.Claims;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Route("api/organizationcharts")]
    [ApiController]
    public class OrganizationChartsController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly ILogger<OrganizationChartsController> _logger;
        private readonly KioskService _kioskService;

        public OrganizationChartsController(SGSDataContext dataContext, ILogger<OrganizationChartsController> logger, KioskService kioskService)
        {
            _dataContext = dataContext;
            _logger = logger;
            _kioskService = kioskService;
        }

        [HttpGet]
        public async Task<IEnumerable<SGOrganizationChartJson>> Get()
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var deptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;

            if (role == "SystemAdmin" || role == "Admin")
            {
                var result = await _dataContext.OrganizationCharts.Select(x => x.ToChartJson()).ToArrayAsync();
                return result;
            }

            else
            {
                var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;
                var result = await _dataContext.OrganizationCharts.Where(o => o.DeptCode == deptCode).Select(x => x.ToChartJson()).ToArrayAsync();
                return result;
            }

        }

        [HttpPost]
        public async Task<IActionResult> Post(SGEditOrganizationChartJson organizationChart)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;
            var deptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;


            if (role != "SystemAdmin" && role != "Admin")
            {
                if (string.IsNullOrWhiteSpace(deptCode) || organizationChart.DeptCode != deptCode)
                {
                    return Unauthorized();
                }
            }



            SGUser deptLeader = null;
            SGUser topDeptLeader = null;
            SGDepartment department = null;

            using var transaction = _dataContext.Database.BeginTransaction();

            List<SGUser> userList = new List<SGUser>();

            try
            {
                if (!string.IsNullOrEmpty(organizationChart.DeptLeader?.Sid))
                {
                    deptLeader = await _dataContext.Users.FirstOrDefaultAsync(u => u.Sid == organizationChart.DeptLeader!.Sid);

                    userList.Add(deptLeader);
                }
                if (!string.IsNullOrEmpty(organizationChart.TopDeptLeader?.Sid))
                {
                    topDeptLeader = await _dataContext.Users.FirstOrDefaultAsync(u => u.Sid == organizationChart.TopDeptLeader!.Sid);

                    userList.Add(topDeptLeader);
                }
                if (!string.IsNullOrEmpty(organizationChart.DeptCode))
                {
                    department = await _dataContext.Departments.FirstOrDefaultAsync(d => d.DeptCode == organizationChart.DeptCode);
                }

                List<SGOrganizationChartTeamJson> teamList = new List<SGOrganizationChartTeamJson>();

                for (int i = 0; i < (organizationChart.Teams?.Length ?? 0); i++)
                {
                    var inputTeam = organizationChart.Teams[i];
                    SGOrganizationChartTeamJson team = new SGOrganizationChartTeamJson();

                    SGUser leader = null;
                    if (string.IsNullOrEmpty(inputTeam.Leader?.Sid) == false)
                    {
                        leader = await _dataContext.Users.FirstOrDefaultAsync(u => u.Sid == inputTeam.Leader!.Sid);
                        userList.Add(leader);
                    }

                    team.Name = inputTeam.Name;
                    team.Title = inputTeam.Title ?? "";
                    team.OfficeTel = inputTeam.OfficeTel;
                    team.OfficeFax = inputTeam.OfficeFax;
                    team.JobDescription = inputTeam.JobDescription;
                    team.Leader = leader;
                    team.DontAddTeamWord = inputTeam.DontAddTeamWord;
                    team.DontShowTeamDetailButton = inputTeam.DontShowTeamDetailButton;

                    List<List<SGUser>> lineList = new List<List<SGUser>>();

                    for (int j = 0; j < (inputTeam.Lines?.Count ?? 0); j++)
                    {
                        var lines = inputTeam.Lines[j];
                        lineList.Add(new List<SGUser>());


                        foreach (var inputUser in lines)
                        {
                            if (!string.IsNullOrEmpty(inputUser.Sid))
                            {
                                var teamUser = await _dataContext.Users.FirstOrDefaultAsync(u => u.Sid == inputUser.Sid);
                                lineList[j].Add(teamUser);

                                userList.Add(teamUser);
                            }
                        }
                    }

                    team.Lines = lineList;

                    teamList.Add(team);
                }


                SGOrganizationChart chart = new SGOrganizationChart
                {
                    Id = organizationChart.Id,
                    ChartType = organizationChart.ChartType,
                    DeptCode = organizationChart.DeptCode,
                    DeptName = organizationChart.DeptName,
                    Title = organizationChart.Title,
                    OfficeFax = organizationChart.OfficeFax,
                    OfficeTel = organizationChart.OfficeTel,
                    DepartJob = organizationChart.DepartJob,
                    DeptLeaderId = organizationChart.DeptLeader?.Sid,
                    TopDeptLeaderId = organizationChart.TopDeptLeader?.Sid,
                    UseYn = true,
                    Name = organizationChart.Name,
                    Desc = organizationChart.Desc,
                    SearchFilter1 = FindSearchFilter.ChosungDivider(organizationChart.Name),

                    ChartJson = new SGOrganizationChartJson
                    {
                        ChartType = organizationChart.ChartType,
                        DeptCode = organizationChart.DeptCode,
                        DeptName = organizationChart.DeptName,
                        Title = organizationChart.Title,
                        OfficeFax = organizationChart.OfficeFax,
                        OfficeTel = organizationChart.OfficeTel,
                        DepartJob = organizationChart.DepartJob,
                        DeptLeader = deptLeader,
                        TopDeptLeader = topDeptLeader,
                        Name = organizationChart.Name,
                        Desc = organizationChart.Desc,
                        Department = department,
                        Teams = teamList.ToArray(),
                    }

                    ,ModifiedTime = DateTime.UtcNow,
                    Modifier = modifier,
                };

                _dataContext.OrganizationCharts.Update(chart);
                _dataContext.SaveChanges();

                var changedUserList = new List<SGUser>();
                userList.ForEach(u =>
                {
                    if (u.OrgChartId != chart.Id || u.OrgChartName != chart.Name)
                    {
                        u.OrgChartId = chart.Id;
                        u.OrgChartName = chart.Name;
                        changedUserList.Add(u);
                    }
                });

                //_dataContext.Users.UpdateRange(userList);
                _dataContext.Users.UpdateRange(changedUserList);
                _dataContext.SaveChanges();

                transaction.Commit();

                try
                {
                    if (organizationChart.Id > 0)
                    {
                        //var device = await _dataContext.Devices.FirstOrDefaultAsync(d => d.OrgChartId.HasValue && d.OrgChartId.Value == organizationChart.Id);
                        //if (device != null)
                        //{
                        //    await _kioskService.UpdateDevice(device.DeviceId, $"{device.DeviceId} 조직도 업데이트.");
                        //}

                        var devices = await _dataContext.Devices
                            .Where(d => d.KioskType == KioskType.OrganizationChart.ToString() && d.OrgChartId == organizationChart.Id)
                            .Take(5)
                            .ToListAsync();

                        foreach ( var device in devices )
                        {
                            await _kioskService.UpdateDevice(device.DeviceId, $"{device.DeviceId} 조직도 업데이트.");
                        }

                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, null);
                }

                return Ok(chart.ToChartJson());
            }
            catch (Exception)
            {
                transaction.RollbackToSavepoint("Can not save SGOrganizationChart");
                
                return null;
            }

           
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOragnizationChart(int id)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;
            var deptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;

            var orgChart = _dataContext.OrganizationCharts.FirstOrDefault(o => o.Id == id);

            if (orgChart == null)
            {
                return NotFound();
            }

            if (role != "SystemAdmin" && role != "Admin")
            {
                if (string.IsNullOrWhiteSpace(deptCode) || orgChart.DeptCode != deptCode)
                {
                    return Unauthorized();
                }
            }

            //var orgChart = new SGOrganizationChart { Id = id };
            _dataContext.OrganizationCharts.Remove(orgChart);
            return Ok( _dataContext.SaveChanges() == 1 );
        }

        [HttpGet("{name}/exist")]
        public async Task<IActionResult> GetOrgChartNameExist(string name)
        {
            var result = await _dataContext.OrganizationCharts.FirstOrDefaultAsync(o => o.Name == name);
            return Ok(new { exist = (result != null) });
        }
    }
}
