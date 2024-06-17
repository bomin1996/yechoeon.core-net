using HanChosung;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp;
using SmartGuideSystem.Common.Defines;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using System;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Authorize]
    [Route("api/departments")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly ILogger<DepartmentsController> _logger;

        public DepartmentsController(SGSDataContext dataContext, ILogger<DepartmentsController> logger)
        {
            _dataContext = dataContext;
            _logger = logger;
        }

        //[HttpGet]
        //public async Task<IEnumerable<SGDepartment>> Get()
        //{
        //    var result = await _dataContext.Departments.OrderBy(department => department.Name).ToArrayAsync();
        //    return result;
        //}

        //[HttpGet("{depth}")]
        //public async Task<IEnumerable<SGDepartment>> Get(int depth)
        //{
        //    var result = await _dataContext.Departments
        //        .Where(department => department.Depth == depth)
        //        .OrderBy(department => department.Name)
        //        .ToArrayAsync();
        //    return result;
        //}

        [HttpGet("{deptCode}")]
        public async Task<SGDepartment?> Get(string deptCode)
        {
            var dept = await _dataContext.Departments.FirstOrDefaultAsync(d => d.DeptCode == deptCode);
            return dept;
        }

        [HttpGet]
        public async Task<IEnumerable<SGDepartment>> Get(int? depth, string? option)
        {
            if (!depth.HasValue)
            {
                var result = await _dataContext.Departments.OrderBy(department => department.Name).ToArrayAsync();
                return result;
            }
            else
            {
                if (option == "to")
                {
                    var result = await _dataContext.Departments
                    .Where(d => d.Depth <= depth.Value)
                    .OrderBy(department => department.Name)
                    .ToArrayAsync();

                    return result;
                }
                else if (option == "from")
                {
                    var result = await _dataContext.Departments
                    .Where(d => d.Depth >= depth.Value)
                    .OrderBy(department => department.Name)
                    .ToArrayAsync();

                    return result;
                }
                else
                {
                    var result = await _dataContext.Departments
                    .Where(d => d.Depth == depth.Value)
                    .OrderBy(department => department.Name)
                    .ToArrayAsync();

                    return result;
                }

            }

        }

        [Authorize(Roles = "SystemAdmin,Admin")]
        [HttpPost]
        public async Task<SGDepartment?> Post([FromBody] SGDepartment department)
        {
            // SearchFilter1 = FindSearchFilter.ChosungDivider(organizationChart.Name),

            
            department.SearchFilter1 = FindSearchFilter.ChosungDivider(department.Name);
            //_dataContext.Departments.Update(department);
            _dataContext.Departments.Add(department);
            //user.CreatedTime = DateTime.UtcNow;

            var count = await _dataContext.SaveChangesAsync();
            
            return department;
        }

        [Authorize(Roles = "SystemAdmin,Admin")]
        [HttpPut]
        public async Task<SGDepartment?> Put([FromBody] SGDepartment department)
        {
        //deptCode: string;
        //name: string;
        //deptFullName: string;
        //    parentDeptCode ?: string;
        //    parentDeptName ?: string;

        //    officeTel ?: string;
        //    officeFax ?: string;
        //jobDescription: string;
        //depth: number;
        //useYn: boolean;
            var dept = await _dataContext.Departments.FirstAsync(d => d.DeptCode == department.DeptCode);
            dept.Depth = department.Depth;
            dept.Name = department.Name;
            dept.ParentDeptCode= department.ParentDeptCode;
            dept.ParentDeptName = department.ParentDeptName;
            dept.OfficeTel = department.OfficeTel;
            dept.OfficeFax = department.OfficeFax;
            dept.Depth = department.Depth;
            dept.JobDescription = department.JobDescription;

            // SearchFilter1 = FindSearchFilter.ChosungDivider(organizationChart.Name),


            //department.SearchFilter1 = FindSearchFilter.ChosungDivider(department.Name);
            _dataContext.Departments.Update(dept);
            //_dataContext.Departments.Add(department);
            //user.CreatedTime = DateTime.UtcNow;

            var count = await _dataContext.SaveChangesAsync();

            return department;
        }

        [Authorize(Roles = "SystemAdmin,Admin")]
        [HttpDelete("{deptCode}")]
        public async Task<bool> Delete(string deptCode)
        {
            var userDeptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;
            var mi = new SGDepartment { DeptCode = deptCode };
            _dataContext.Departments.Remove(mi);
            var result = _dataContext.SaveChanges() == 1;

            return result;
        }
    }
}
