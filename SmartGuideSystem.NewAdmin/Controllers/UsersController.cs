using HanChosung;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NotifyKioskServer;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using System.Data;
using System.Security.Claims;
using WebpConverter;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Route("api/users")]
    [Authorize]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly ILogger<UsersController> _logger;
        private readonly KioskService _kioskService;
        private readonly ImageOptions _snapshotOptions;
        public UsersController(SGSDataContext dataContext, ILogger<UsersController> logger, KioskService kioskService, IOptionsSnapshot<ImageOptions> snapshotOptionsAccessor)
        {
            _dataContext = dataContext;
            _logger = logger;
            _kioskService = kioskService;
            _snapshotOptions = snapshotOptionsAccessor.Value;
        }

        [HttpGet]
        public async Task<IEnumerable<SGUser>> Get()
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            if (role == "DepartManager")
            {
                var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;
                if (!string.IsNullOrWhiteSpace(deptCode))
                {
                    var result = await _dataContext.Users.Where(user => user.DeptCode == deptCode).OrderBy(user => user.Name).ToArrayAsync();
                    return result;
                } 
                else
                {
                    return new SGUser[0];
                }
            }
            else // SystemAdmin,Admin,
            {
                var result = await _dataContext.Users.OrderBy(user => user.DeptCode).ToArrayAsync();
                return result;
            }
        }

        
        [HttpPost]
        public async Task<IActionResult> Post(EditSGUserData editUserData)
        {
            // 신규직원추가
            // 과담당자는 담당부서 직원만 추가할 수 있다.
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;

            if (role != "SystemAdmin" && role != "Admin" && editUserData.DeptCode != deptCode) // 다른과 이상 경로진입 ?
            {
                return Unauthorized();
            }

            if (editUserData.PhotoDataBase64 != null)
            {
                editUserData.Photo = await SaveWebpImageFromBase64(editUserData.PhotoDataBase64);
            }

            editUserData.SearchFilter1 = FindSearchFilter.ChosungDivider(editUserData.Name);
            editUserData.CreateType = "SGS";
            editUserData.ModifiedTime = DateTime.UtcNow;
            editUserData.Modifier = modifier;

            _dataContext.Users.Add(editUserData);
            await _dataContext.SaveChangesAsync();

            return Ok(editUserData as SGUser);
        }

        private async Task<string> SaveWebpImageFromBase64(string photoDataBase64)
        {
            string base64Str = photoDataBase64;
            if (base64Str.StartsWith("data:image/jpeg;base64,"))
            {
                base64Str = base64Str.Replace("data:image/jpeg;base64,", "");
            } 
            else if (base64Str.StartsWith("data:image/png;base64,"))
            {
                base64Str = base64Str.Replace("data:image/png;base64,", "");
            }
            else if (base64Str.StartsWith("data:image/gif;base64,"))
            {
                base64Str = base64Str.Replace("data:image/gif;base64,", "");
            }
            else if (base64Str.StartsWith("data:image/webp;base64,"))
            {
                base64Str = base64Str.Replace("data:image/webp;base64,", "");
            }

            var imageData = Convert.FromBase64String(base64Str);
            var tempFilePath = System.IO.Path.GetTempFileName();
            using (var stream = System.IO.File.Create(tempFilePath))
            {
                await stream.WriteAsync(imageData);
            }
            var guid = Guid.NewGuid();
            var filePath = System.IO.Path.Combine(_snapshotOptions.SavePath, "photo", guid.ToString() + ".webp");
            ConvertWebpImageHelper.ConvertJpgToWebp(tempFilePath, filePath);
            return Path.GetFileName(filePath);
        }

        [HttpPut]
        public async Task<IActionResult> Put(EditSGUserData editUserData)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;

            if (role != "SystemAdmin" && role != "Admin" && editUserData.DeptCode != deptCode) // 다른과 이상 경로진입 ?
            {
                return Unauthorized();
            }

            if (editUserData.PhotoDataBase64 != null)
            {
                editUserData.Photo = await SaveWebpImageFromBase64(editUserData.PhotoDataBase64);
            }

            var targetUser = await _dataContext.Users.FirstAsync(it => it.Sid == editUserData.Sid);

            ///
            //editUserData.LoginID = targetUser.LoginID;
            //editUserData.PositionCode = targetUser.PositionCode;
            //editUserData.PositionName = targetUser.PositionName;
            //editUserData.GradeCode = targetUser.GradeCode;
            //editUserData.GradeName = targetUser.GradeName;
            //editUserData.UpdateDateTime = targetUser.UpdateDateTime;
            //editUserData.UpdateDateTime2 = targetUser.UpdateDateTime2;
            //editUserData.UpdateDateTime3 = targetUser.UpdateDateTime3;
            //editUserData.UserRank = targetUser.UserRank;
            //editUserData.SearchFilter2 = targetUser.SearchFilter2;
            //editUserData.SearchFilter3 = targetUser.SearchFilter3;

            targetUser.Photo = editUserData.Photo;
            targetUser.Name = editUserData.Name;
            targetUser.Email = editUserData.Email;
            targetUser.OfficeFax = editUserData.OfficeFax;
            targetUser.OfficeTel = editUserData.OfficeTel;
            targetUser.DeptCode = editUserData.DeptCode;
            targetUser.DeptName = editUserData.DeptName;
            targetUser.TeamName = editUserData.TeamName;
            targetUser.TeamPosition = editUserData.TeamPosition;
            targetUser.PositionName = editUserData.PositionName;
            targetUser.ProfileGrade = editUserData.ProfileGrade;
            targetUser.ProfileJobDescription = editUserData.ProfileJobDescription;
            targetUser.JobDescription = editUserData.JobDescription;
            targetUser.OrgChartId = editUserData.OrgChartId;
            targetUser.OrgChartName = editUserData.OrgChartName;
            targetUser.chartId = editUserData.chartId;
            targetUser.chartName = editUserData.chartName;
            targetUser.UseYn = editUserData.UseYn;
            targetUser.SearchFilter1 = FindSearchFilter.ChosungDivider(editUserData.Name);
            targetUser.ModifiedTime = DateTime.UtcNow;
            targetUser.Modifier = modifier;
            ///



            _dataContext.Users.Update(targetUser);
            await _dataContext.SaveChangesAsync();

            return Ok(targetUser as SGUser);
        }

        [HttpDelete("{sid}")]
        public async Task<IActionResult> Delete(string sid)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;

            if (role != "SystemAdmin" && role != "Admin" ) // 관리자 이상 삭제가능
            {
                return Unauthorized();
            }

            var user = new SGUser { Sid = sid };
            _dataContext.Users.Remove(user);
            var deletedCount = await _dataContext.SaveChangesAsync();

            return Ok(deletedCount == 1);
        }

        //[Authorize(Roles = "SystemAdmin,Admin")]
        //[HttpGet]
        //public async Task<IEnumerable<SGUser>> Get(int pageIndex, int pageCount)
        //{
        //    var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
        //    if (role == "DepartManager")
        //    {
        //        var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;
        //        if (!string.IsNullOrWhiteSpace(deptCode))
        //        {
        //            var result = await _dataContext.Users.Where(user => user.DeptCode == deptCode).OrderBy(user => user.Name).ToArrayAsync();
        //            return result;
        //        }
        //        else
        //        {
        //            return new SGUser[0];
        //        }
        //    }
        //    else // SystemAdmin,Admin,
        //    {
        //        var result = await _dataContext.Users.Take(100).OrderBy(user => user.DeptCode).ToArrayAsync();
        //        return result;
        //    }
        //}

        [HttpGet("{deptCode}")]
        public async Task<IEnumerable<SGUser>> Get(string deptCode)
        {
            var result = await _dataContext.Users
                .Where(user => user.DeptCode == deptCode)
                .OrderBy(device => device.Name)
                .ToArrayAsync();
            return result;
        }

        
        //[HttpGet("teams/{deptCode}")]
        [HttpGet("{deptCode}/teams")]
        public async Task<Dictionary<string, List<SGUser>>> GetTeamUsers(string deptCode)
        {
            var allMembers = await _dataContext.Users
                    .Where(u => u.DeptCode == deptCode && u.UseYn )
                    .ToListAsync();

            var membersByTeam = allMembers.Where(u => !string.IsNullOrEmpty(u.TeamName))
                .GroupBy(u => u.TeamName?.Replace("팀",""))
                .ToDictionary(g => g.Key!, g => g.ToList());

            var membersByNoTeam = allMembers.Where(u => string.IsNullOrEmpty(u.TeamName));
            membersByTeam.Add("팀없음", membersByNoTeam.ToList());

            return membersByTeam;
        }

        //[HttpPost("{sid}/status")]
        [HttpPost("status")]

        //public async Task<SGUser> PostUser(string sid, [FromForm] string status)
        public async Task<SGUser> PostUser([FromForm] string sid, [FromForm] string status)
        {
            using var transaction = _dataContext.Database.BeginTransaction();
            try
            {
                var updateUser = await _dataContext.Users.FirstAsync(u => u.Sid == sid);
                if (status != "일정없음")
                {
                    updateUser.Status = status;
                } 
                else
                {
                    updateUser.Status = string.Empty;
                }

                var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
                updateUser.Modifier = modifier.Value;
                updateUser.ModifiedTime = DateTime.UtcNow;
                // 변경시간..
                // 변경자...HttpContext .UserClianmnew Claim(ClaimTypes.NameIdentifier, loginUser.LoginId),

                int? orgChartId = null;

                if (updateUser.OrgChartId.HasValue && updateUser.OrgChartId.Value > 0)
                {
                    var orgChart = await _dataContext.OrganizationCharts.FirstOrDefaultAsync(o => o.Id == updateUser.OrgChartId.Value);
                    if (orgChart != null)
                    {
                        if (orgChart.UpdateUserStatus(updateUser.Sid, updateUser.Status))
                        {
                            _dataContext.OrganizationCharts.Update(orgChart);
                            orgChartId = orgChart.Id;
                        }
                        
                    }
                }

                int? seatPosChartId = null;
                if (updateUser.chartId.HasValue && updateUser.chartId.Value > 0)
                {
                    var seatPosChart = await _dataContext.SeatPosCharts.FirstOrDefaultAsync(o => o.Id == updateUser.chartId.Value);
                    if (seatPosChart != null)
                    {
                        if (seatPosChart.UpdateUserStatus(updateUser.Sid, updateUser.Status))
                        {
                            _dataContext.SeatPosCharts.Update(seatPosChart);
                            seatPosChartId = updateUser.chartId;
                        }

                    }
                }

                _dataContext.Users.Update(updateUser);
                await _dataContext.SaveChangesAsync();

                transaction.Commit();

                try
                {
                    if (orgChartId.HasValue)
                    {
                        var device = await _dataContext.Devices.FirstOrDefaultAsync(d => d.OrgChartId.HasValue && d.OrgChartId.Value == orgChartId.Value);
                        if (device != null)
                        {
                            await _kioskService.UpdateDevice(device.DeviceId, $"{device.DeviceId} 조직도 업데이트.");
                        }
                    }

                    if (seatPosChartId.HasValue)
                    {
                        var device = await _dataContext.Devices.FirstOrDefaultAsync(d => d.chartId.HasValue && d.chartId.Value == seatPosChartId.Value);
                        if (device != null)
                        {
                            await _kioskService.UpdateDevice(device.DeviceId, $"{device.DeviceId} 배치도 업데이트.");
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, null);
                }

                return updateUser;
            }
            catch 
            {
                transaction.Rollback();
                return null;
            }
        }

        [HttpPost("testapi/{no}")]
        public async Task<IActionResult> PostTestApi(int no)
        {
            if (no < 10)
            {
                //return Unauthorized();
                return NotFound("no data");
            }

            var users = await _dataContext.Users.Where(u => u.UserRank > no).ToArrayAsync();
            return Ok(users);
        }

        ///api/users/council
        [HttpGet("council")]
        public async Task<IEnumerable<SGUser>> GetCouncil()
        {
            var result = await _dataContext.Users.Where(user => user.DeptName == "의회사무국" && user.PositionName == "의원").OrderBy(user => user.Name).ToArrayAsync();
            return result;
        }
    }

    public class EditSGUserData : SGUser
    {
        public string? PhotoDataBase64 { get; set; }
        public string? PhotoFileName { get; set; }
    }
}
