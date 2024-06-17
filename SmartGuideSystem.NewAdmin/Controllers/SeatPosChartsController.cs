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
    [Route("api/seatposcharts")]
    [ApiController]
    public class SeatPosChartsController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly ILogger<SeatPosChartsController> _logger;
        private readonly KioskService _kioskService;

        public SeatPosChartsController(SGSDataContext dataContext, ILogger<SeatPosChartsController> logger, KioskService kioskService)
        {
            _dataContext = dataContext;
            _logger = logger;
            _kioskService = kioskService;
        }

        [HttpGet]
        public async Task<IEnumerable<SGSeatPosChartJson>> Get()
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var deptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;

            if (role == "SystemAdmin" || role == "Admin")
            {
                var result = await _dataContext.SeatPosCharts
                    .OrderBy(sc => sc.Name)
                    .Select(x => x.ToChartJson())
                    .ToArrayAsync();
                return result;
            }
            else
            {
                var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;
                var result = await _dataContext.SeatPosCharts
                    .Where(o => o.DeptCode == deptCode)
                    .OrderBy(sc => sc.Name)
                    .Select(x => x.ToChartJson())
                    .ToArrayAsync();
                return result;
            }

            //return new List<SGSeatPosChartJson> { };
        }

        [HttpPost]
        public async Task<IActionResult> Post(SGSeatPosChartJson chartJson)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var deptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;

            if (role != "SystemAdmin" && role != "Admin")
            {
                if (string.IsNullOrWhiteSpace(deptCode) || chartJson.DeptCode != deptCode)
                {
                    return Unauthorized();
                }
            }

            SGDepartment department = null;
            using var transaction = _dataContext.Database.BeginTransaction();

            List<SGSCNode> nodeList = new List<SGSCNode>();
            List<SGUser> userList = new List<SGUser>();

            try
            {
                if (!string.IsNullOrEmpty(chartJson.DeptCode))
                {
                    department = await _dataContext.Departments.FirstOrDefaultAsync(d => d.DeptCode == chartJson.DeptCode);
                }

                SGSeatPosChart chart = new SGSeatPosChart
                {
                    Id = chartJson.Id,
                    ChartType = chartJson.ChartType,
                    DeptCode = chartJson.DeptCode,
                    DeptName = chartJson.DeptName,
                    Title = chartJson.Title,



                    UseYn = true,
                    Name = chartJson.Name,
                    Desc = chartJson.Desc,
                    SearchFilter1 = FindSearchFilter.ChosungDivider(chartJson.Name),

                    //ChartJson = new SGSeatPosChartJson
                    //{
                    //    ChartType = chartJson.ChartType,
                    //    DeptCode = chartJson.DeptCode,
                    //    DeptName = chartJson.DeptName,
                    //    Title = chartJson.Title,
                    //    Name = chartJson.Name,
                    //    Desc = chartJson.Desc,
                    //    Department = department,
                    //    Nodes = new List<SGSCNode>()
                    //}
                    ChartJson = chartJson,
                    ModifiedTime = DateTime.UtcNow,
                    Modifier = modifier,
                };

                

                _dataContext.SeatPosCharts.Update(chart);
                _dataContext.SaveChanges();

                HashSet<string> idSet = new HashSet<string>();
                foreach (var node in chart.ChartJson.Nodes)
                {
                    if (node.NodeType == SCNodeType.Member)
                    {
                        var mvm = node as SGSCMemberNode;
                        if (mvm != null && mvm.Member != null && !string.IsNullOrEmpty(mvm.Member.Sid))
                        {
                            idSet.Add(mvm.Member.Sid);
                        }
                    }
                }

                foreach (var usid in idSet)
                {
                    var u = await _dataContext.Users.FirstOrDefaultAsync(u => u.Sid == usid );
                    userList.Add(u);
                }


                var changedUserList = new List<SGUser>();

                userList.ForEach(u =>
                {
                    if (u.chartId != chart.Id || u.chartName != chart.Name)
                    {
                        u.chartId = chart.Id;
                        u.chartName = chart.Name;
                        changedUserList.Add(u);
                    }
                });
                //_dataContext.Users.UpdateRange(userList);
                _dataContext.Users.UpdateRange(changedUserList);
                _dataContext.SaveChanges();

                transaction.Commit();

                try
                {
                    if (chartJson.Id > 0)
                    {
                        var devices = await _dataContext.Devices
                            .Where(d => d.KioskType == KioskType.OrganizationChart.ToString() && d.chartId == chartJson.Id)
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
        public bool DeleteSeatPosChart(int id)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var deptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;



            //var chart = new SGSeatPosChart { Id = id };

            var chart = _dataContext.SeatPosCharts.FirstOrDefault(o => o.Id == id);

            if (chart == null)
            {
                return false;
            }

            if (role != "SystemAdmin" && role != "Admin")
            {
                if (string.IsNullOrWhiteSpace(deptCode) || chart.DeptCode != deptCode)
                {
                    return false;
                }
            }

            _dataContext.SeatPosCharts.Remove(chart);
            return _dataContext.SaveChanges() == 1;
        }

        [HttpGet("{name}/exist")]
        public async Task<IActionResult> GetSeatPosChartNameExist(string name)
        {
            var result = await _dataContext.SeatPosCharts.FirstOrDefaultAsync(o => o.Name == name);
            return Ok(new { exist = (result != null) });
        }
    }
}
