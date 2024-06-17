using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotifyKioskServer;
using SmartGuideSystem.Common.Defines;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Authorize]
    [Route("api/floors")]
    [ApiController]
    public class FloorsController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly ILogger<FloorsController> _logger;
        private readonly KioskService _kioskService;


        public FloorsController(SGSDataContext dataContext, ILogger<FloorsController> logger, KioskService kioskService)
        {
            _dataContext = dataContext;
            _logger = logger;
            _kioskService= kioskService;
        }

        [HttpGet("buildings")]
        public async Task<IEnumerable<SGBuildingInfo>> GetBuildings()
        {
            var result = await _dataContext.BuildingInfo
                .Include(b => b.Floors.OrderBy(f => f.Order))
                .ToArrayAsync();

            return result;
        }

        [HttpGet]
        public async Task<IEnumerable<SGFloor>> Get()
        {
            var result = await _dataContext.Floors.ToArrayAsync();
            return result;
        }

        [HttpGet("buildings/{buildingId}/{buttonName}/{floorMapType}/exist")]
        public async Task<IActionResult> GetOrgChartNameExist(int buildingId, string buttonName, int floorMapType)
        {
            var result = await _dataContext.Floors.FirstOrDefaultAsync(f => f.BuildingId == buildingId && f.ButtonName == buttonName && f.FloorMapType == floorMapType);
            return Ok(new { exist = (result != null) });
        }

        [Authorize(Roles = "SystemAdmin, Admin")]
        [HttpDelete("{floorId}")]
        public async Task<bool> Delete(int floorId)
        {
            var floor = new SGFloor { Id = floorId };
            _dataContext.Floors.Remove(floor);
            var count = await _dataContext.SaveChangesAsync();

            try
            {
                if (count > 0)
                {
                    await _kioskService.UpdateDevicesForKioskType(KioskType.OrganizationChart, $"층별안내도 삭제 업데이트.");
                    await _kioskService.UpdateDevicesForKioskType(KioskType.BuildingGuideHorizontalChart, $"층별안내도 삭제 업데이트.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, null);
            }

            return count > 0;
        }

        [Authorize]
        [Authorize(Roles = "SystemAdmin, Admin")]
        [HttpPost]
        public async Task<SGFloor?> Post([FromBody] SGFloor floor)
        {
            if (floor.Id <= 0)
            {
                await _dataContext.Floors.AddAsync(floor);
            } 
            else
            {
                var mfloor = await _dataContext.Floors.FirstAsync(f => f.Id == floor.Id);
                mfloor.FloorImage = floor.FloorImage;
                mfloor.Order = floor.Order;
                mfloor.Title = floor.Title;
                mfloor.Items = floor.Items;
                mfloor.FloorMapType = floor.FloorMapType;
                _dataContext.Floors.Update(mfloor);
            }
            
            int updatedCount = await _dataContext.SaveChangesAsync();


            try
            {
                if (updatedCount > 0)
                {
                    await _kioskService.UpdateDevicesForKioskType(KioskType.OrganizationChart, $"{floor.ButtonName} 층별안내도 업데이트.");
                    await _kioskService.UpdateDevicesForKioskType(KioskType.BuildingGuideHorizontalChart, $"{floor.ButtonName} 층별안내도 업데이트.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, null);
            }

            return floor;
        }

        [HttpPost("buildings")]
        [Authorize(Roles = "SystemAdmin")]
        public async Task<IActionResult> PostBuildings([FromBody] SGBuildingInfo buildingInfo)
        {
            _dataContext.BuildingInfo.Add(buildingInfo);
            await _dataContext.SaveChangesAsync();
            return Ok(buildingInfo);
        }


        [HttpDelete("buildings/{id}")]
        [Authorize(Roles = "SystemAdmin")]
        public async Task<IActionResult> DeleteBuildings(int id)
        {
            var bi = new SGBuildingInfo { Id = id };
            _dataContext.BuildingInfo.Remove(bi);
            var deletedCount = await _dataContext.SaveChangesAsync();
            return Ok(deletedCount == 1);
        }
    }
}
