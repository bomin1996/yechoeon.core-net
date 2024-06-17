import axios from "axios";
import { ISGLoginUser } from "../../../../shares/ISGLoginUser";

export namespace AccountApi {
  export async function login(userId: string, password: string) {
    try {
      const formData = new FormData();
      formData.append("userId", encodeURIComponent(userId));
      formData.append("password", encodeURIComponent(password));
      //const res = await axios.post("/api/account/login", formData);
      const res = await fetch("/api/account/login", {
        method: "POST",
        cache: "no-cache",

        body: formData,
      });
      if (res.ok) {
        const json = await res.json();
        return {
          status: res.status,
          data: json,
        };
      } else {
        const json = await res.json();
        return {
          status: res.status,
          data: json,
        };
      }
    } catch (exc) {
      console.log(exc);
    }
  }

  export async function logout() {
    try {
      //const res = await axios.get("/api/account/logout");
      // window.localStorage.removeItem("currentUser");
      window.sessionStorage.removeItem("currentUser");

      await fetch("/api/account/logout");
    } catch (exc) {
      console.log(exc);
    }
  }

  export async function getCurrentUser() {
    try {
      const res = await axios.get("/api/account/");
      // console.log("/api/account/ => res;", res);
      // return Ok(new {Expired=expired, CurrentUser=currentLoginUser});
      return res;
    } catch (exc) {
      console.log(exc);
    }
  }

  export async function userList() {
    try {
      const res = await axios.get("/api/account/users");
      // console.log("/api/account/users => res;", res);
      return res.data;
    } catch (exc) {
      console.log(exc);
    }
  }

  export async function addUser(user: ISGLoginUser) {
    // try {
    //   const res = await axios.post("/api/account", user);
    //   return res.data;
    // } catch (exc) {
    //   console.log(exc);
    // }
    try {
      const res = await axios.post("/api/account", user);
      if (res) {
        const resultJson = res.data;
        // console.log("updateUser:", resultJson);
        return { result: resultJson };
      } else {
        return { error: "서버오류" };
      }
    } catch (exc) {
      console.log(exc);
      return { error: exc };
    }
  }

  // export async function changePassword(
  //   user: ISGLoginUser,
  //   oldPwd: string,
  //   newPwd: string
  // ) {
  //   try {
  //     return await axios.post(`/api/account/${user.loginId}/changePwd`, {
  //       oldPassword: oldPwd,
  //       newPassword: newPwd,
  //     });
  //   } catch (exc) {
  //     console.log(exc);
  //   }
  // }

  export async function changePassword(
    user: ISGLoginUser,
    oldPwd: string,
    newPwd: string
  ) {
    return await axios.post(`/api/account/${user.loginId}/changePwd`, {
      oldPassword: oldPwd,
      newPassword: newPwd,
    });
  }

  export async function resetPassword(user: ISGLoginUser, newPwd: string) {
    // try {
    //   return await axios.post(`/api/account/${user.loginId}/resetPwd`, {
    //     newPassword: newPwd,
    //   });
    // } catch (exc) {
    //   console.log(exc);
    // }
    try {
      const res = await axios.post(`/api/account/${user.loginId}/resetPwd`, {
        newPassword: newPwd,
      });
      if (res) {
        const resultJson = res.data;
        // console.log("updateUser:", resultJson);
        return { result: resultJson };
      } else {
        return { error: "서버오류" };
      }
    } catch (exc) {
      console.log(exc);
      return { error: exc };
    }
  }

  export async function deleteUser(user: ISGLoginUser) {
    // try {
    //   return await axios.delete(`/api/account/${user.loginId}`);
    // } catch (exc) {
    //   console.log(exc);
    // }
    try {
      const res = await axios.delete(`/api/account/${user.loginId}`);
      if (res) {
        const resultJson = res.data;
        // console.log("updateUser:", resultJson);
        return { result: resultJson };
      } else {
        return { error: "서버오류" };
      }
    } catch (exc) {
      console.log(exc);
      return { error: exc };
    }
  }

  export async function modifyPermission(user: ISGLoginUser) {
    try {
      user.deptFullName = user.deptFullName ?? "";
      const res = await axios.put(
        // `/api/account/${user.loginId}/permission`,
        `/api/account/permission`,
        {
          loginId: user.loginId,
          role: user.role,
          extraSettings: user.extraSettings,
        }
      );
      if (res) {
        const result = res.data;
        return { result: result };
      } else {
        return { error: "서버오류" };
      }
    } catch (exc) {
      console.log(exc);
      return { error: exc };
    }
  }
}
