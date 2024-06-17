using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.Admin.Helpers;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.DB.Model.JSON;
using SmartGuideSystem.NewAdmin.Const;
using System.Security.Claims;
using System.Web;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly ILogger<AccountController> _logger;

        public AccountController(SGSDataContext dataContext, ILogger<AccountController> logger)
        {
            _dataContext = dataContext;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var current = HttpContext.User;
            if (current != null && current.Identity.IsAuthenticated)
            {
                var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
                var modifierRole = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role);

                if (modifier.Value == "SignAgeMenu")
                {
                    return Ok(new LoginUser { Name = modifier.Value, Role = modifierRole.Value, UserId = modifier.Value, Grade = "Admin" });
                }

                var currentLoginUser = _dataContext.LoginUsers.FirstOrDefault(lu => lu.LoginId == modifier.Value && lu.Role == modifierRole.Value);

                //return new LoginUser { UserId = current.Identity.Name, Role= role.Value};
                if (currentLoginUser != null)
                {
                    currentLoginUser.Password = string.Empty;
                    //var expired = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Expired).Value;
                    return Ok(currentLoginUser);
                    //return Ok(new {Expired=expired, CurrentUser=currentLoginUser});
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return NotFound();
            }
        }

        [Authorize(Roles = "SystemAdmin,Admin")]
        [HttpPost]
        public async Task<SGLoginUser?> Post([FromBody] SGLoginUser user)
        {

            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
            var modifierRole = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;

            user.ModifiedTime = DateTime.UtcNow;
            user.Modifier = modifier.Value;

            if (modifierRole != "SystemAdmin" && (user.Role != "Admin" && user.Role != "DepartManager"))
            {
                return null;
            }


            var hashedPassword = PasswordHelpers.HashPasswordV3(user.Password);
            user.Password = hashedPassword;

            await _dataContext.LoginUsers.AddAsync(user);
            //user.CreatedTime = DateTime.UtcNow;

            var count = await _dataContext.SaveChangesAsync();
            user.Password = string.Empty;
            return user;
        }

        [Authorize(Roles = "SystemAdmin,Admin")]
        [HttpGet("users")]
        public async Task<IEnumerable<SGLoginUser>> GetUsers()
        {
            var modifierRole = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role);

            var users = modifierRole.Value == "SystemAdmin" ? await _dataContext.LoginUsers.ToArrayAsync() :
                await _dataContext.LoginUsers.Where(lu => lu.Role != "SystemAdmin").ToArrayAsync();

            for (int i = 0; i < users.Length; i++)
            {
                var user = users[i];
                user.Password = string.Empty;
            }
            return users;
        }


        [HttpPost("login")]
        public async Task<IActionResult> PostLogin([FromForm] string userId, [FromForm] string password)
        {
            
            var decodedPassword = HttpUtility.UrlDecode(password);
            var decodedUserid = HttpUtility.UrlDecode(userId);

            var loginUser = await _dataContext.LoginUsers.FirstOrDefaultAsync(u => u.LoginId == decodedUserid);
            if (loginUser == null)
            {
                return NotFound(new { Error = "로그인아이디를 찾을 수 없습니다." });
            }

            if (PasswordHelpers.VerifyHashedPasswordV3(hashedPassword: loginUser.Password, plainPassword: decodedPassword) == false)
            {
                return Unauthorized(new { Error = "잘못된 암호입니다." });

            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, loginUser.Name),
                new Claim(ClaimTypes.NameIdentifier, loginUser.LoginId),
                new Claim("DeptCode", loginUser.DeptCode ?? ""),
                new Claim("DeptName", loginUser.DeptName ?? ""),
                new Claim(ClaimTypes.Role, loginUser.Role),
            };

            var claimsIdentity = new ClaimsIdentity(
            claims, SGSConst.AUTH_COOKIE_KEY_NAME);

            var authProperties = new AuthenticationProperties
            {
                //AllowRefresh = <bool>,
                // Refreshing the authentication session should be allowed.
                AllowRefresh = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(SGSConst.AUTH_LOGIN_EXPIRE_TIME_MIN),
                // The time at which the authentication ticket expires. A 
                // value set here overrides the ExpireTimeSpan option of 
                // CookieAuthenticationOptions set with AddCookie.

                //IsPersistent = true,
                // Whether the authentication session is persisted across 
                // multiple requests. When used with cookies, controls
                // whether the cookie's lifetime is absolute (matching the
                // lifetime of the authentication ticket) or session-based.
                IsPersistent = true,

                //IssuedUtc = <DateTimeOffset>,
                // The time at which the authentication ticket was issued.

                //RedirectUri = <string>
                // The full path or absolute URI to be used as an http 
                // redirect response value.
                RedirectUri="",
                 
            };

            await HttpContext.SignInAsync(
             SGSConst.AUTH_COOKIE_KEY_NAME,
            new ClaimsPrincipal(claimsIdentity),
            authProperties);

            _logger.LogInformation("User {Email} logged in at {Time}.", decodedUserid, DateTime.UtcNow);

            loginUser.LastLoggedInTime = DateTime.UtcNow;
            _dataContext.Update(loginUser);
            await _dataContext.SaveChangesAsync();

            loginUser.Password = string.Empty;

            //return Ok(loginUser);

            // var expired = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Expired).Value;
            //return OK(currentLoginUser);

            

            return Ok(new { Expired = authProperties.ExpiresUtc, CurrentUser = loginUser });
        }

        [HttpGet("logout")]
        public async Task OnGetAsync()
        {
            // Clear the existing external cookie
            await HttpContext.SignOutAsync(
                 SGSConst.AUTH_COOKIE_KEY_NAME);
        }

        [Authorize(Roles = "SystemAdmin,Admin")]
        //[HttpPut("{loginId}/permission")]
        [HttpPut("permission")]
        public async Task<IActionResult> PutPermission([FromBody] ChangePermission user)
        {
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var modifierRole = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;

            if (GetLevel(user.Role) == 0)
            {
                return Problem("Invalid Role");
            }

            if (modifierRole == "Admin" && user.Role == "SystemAdmin")
            {
                return Unauthorized();
            }

            var loginId = user.LoginId;
            var targetUser = await _dataContext.LoginUsers.FirstAsync(lu => lu.LoginId == loginId);

            if (modifierRole == "Admin" && targetUser.Role == "SystemAdmin")
            {
                return Unauthorized();
            }

            targetUser.Role = user.Role;
            targetUser.ExtraSettings = user.ExtraSettings;
            targetUser.ModifiedTime = DateTime.UtcNow;
            targetUser.Modifier = modifier;

            _dataContext.LoginUsers.Update(targetUser);
            var affectedRowCount = await _dataContext.SaveChangesAsync();

            return Ok(affectedRowCount == 1);
        }


        [HttpPost("{loginId}/changePwd")]
        public async Task<IActionResult> PostChangePassword(string loginId, [FromBody] ChangePasswordInfo changeInfo)
        {
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var modifierRole = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var targetUser = await _dataContext.LoginUsers.FirstOrDefaultAsync(u => u.LoginId == loginId);

            if (targetUser == null)
            {
                return NotFound();
            }

            if (targetUser.LoginId != modifier && GetLevel(modifierRole) <= GetLevel(targetUser.Role))
            {
                return Unauthorized();
            }

            //
            if (PasswordHelpers.VerifyHashedPasswordV3(hashedPassword: targetUser.Password, plainPassword: changeInfo.OldPassword))
            {
                var hashNewPwd = PasswordHelpers.HashPasswordV3(changeInfo.NewPassword);

                targetUser.Password = hashNewPwd;
                targetUser.ModifiedTime = DateTime.UtcNow;
                targetUser.Modifier = modifier;

                _dataContext.LoginUsers.Update(targetUser);
                int count = await _dataContext.SaveChangesAsync();

                return Ok();
            } 
            else
            {
                return StatusCode(StatusCodes.Status403Forbidden, "기존패스워드가 일치하지 않습니다.");
            }
            
        }

        [HttpPost("{loginId}/resetPwd")]
        public async Task<IActionResult> PostResetPassword(string loginId, [FromBody] ResetPasswordInfo changeInfo)
        {
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var modifierRole = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var targetUser = await _dataContext.LoginUsers.FirstOrDefaultAsync(u => u.LoginId == loginId);

            if (targetUser == null)
            {
                return NotFound();
            }

            if (modifierRole != "SystemAdmin" && modifierRole != "Admin")
            {
                return Unauthorized();
            }

            if (targetUser.LoginId != modifier && GetLevel(modifierRole) <= GetLevel(targetUser.Role))
            {
                return Unauthorized();
            }

            //
            var hashNewPwd = PasswordHelpers.HashPasswordV3(changeInfo.NewPassword);
            targetUser.Password = hashNewPwd;
            targetUser.ModifiedTime = DateTime.UtcNow;
            targetUser.Modifier = modifier;

            _dataContext.LoginUsers.Update(targetUser);
            int count = await _dataContext.SaveChangesAsync();

            return Ok();

        }

        [HttpDelete("{loginId}")]
        public async Task<IActionResult> DeleteAccount(string loginId)
        {
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var modifierRole = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var targetUser = await _dataContext.LoginUsers.FirstOrDefaultAsync(u => u.LoginId == loginId);

            if (targetUser == null)
            {
                return NotFound(new { Error = "로그인아이디를 찾을 수 없습니다." });
            }

            if (targetUser.LoginId == modifier)
            {
                return Unauthorized();
            }

            if (modifierRole != "SystemAdmin" && modifierRole != "Admin")
            {
                return Unauthorized();
            }

            if (GetLevel(modifierRole) < GetLevel(targetUser.Role))
            {
                return Unauthorized();
            }
            
            _dataContext.LoginUsers.Remove(targetUser);
            int count = await _dataContext.SaveChangesAsync();

            return Ok();

        }

        private int GetLevel(string roleName) 
        { 
            switch (roleName)
            {
                case "SystemAdmin": return 100;
                case "Admin": return 10;
                case "DepartManager": return 1;
            }

            return 0;
        }


        ////임시 
        //[HttpPost("makeuser")]
        //public async Task<List<SGLoginUser>> MakeUser()
        //{
        //    var deptList = await _dataContext.Departments.Where(d => d.Depth == 4).ToListAsync();

        //    var newUserList = new List<SGLoginUser>();
        //    deptList.ForEach(d =>
        //    {
        //        if (d.Name == "회계과")
        //        {
        //            return;
        //        }


        //        SGLoginUser newUser = new SGLoginUser();
        //        newUser.LoginId = d.Name;
        //        newUser.Name = d.Name + "담당자";
        //        var password =
        //        newUser.Password = PasswordHelpers.HashPasswordV3("jinju");
        //        newUser.ModifiedTime = DateTime.UtcNow;
        //        newUser.Modifier = "SYSTEM";
        //        newUser.DeptName = d.Name;
        //        newUser.DeptCode = d.DeptCode;
        //        newUser.DeptFullName = d.DeptFullName;
        //        newUser.Role = "DepartManager";

        //        newUserList.Add(newUser);

        //        //_dataContext.LoginUsers.Add(newUser);

        //    });
        //    _dataContext.LoginUsers.AddRange(newUserList);
        //    var count = await _dataContext.SaveChangesAsync();

        //    return newUserList;
        //}

        //`/api/account/${user.loginId}/permission`,

    }

    public class LoginUser
    {
        public string UserId { get; set;}
        public string Name { get; set;}
        public string? Grade { get; set;}
        public string? Role { get; set;}
    }

    public class LoginInfo
    {
        public string Password { get; set;}
        public string UserId { get; set; }
    }

    public class ChangePasswordInfo
    {
        public string OldPassword { get; set;}  
        public string NewPassword { get; set;}
    }

    public class ResetPasswordInfo
    {
        public string NewPassword { get; set; }
    }

    public class ChangePermission
    {
        public string LoginId { get; set; }
        public string Role { get; set; }
        public LoginUserExtraSettings? ExtraSettings { get; set; }
    }
}
