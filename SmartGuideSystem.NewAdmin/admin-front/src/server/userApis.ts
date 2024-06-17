import { ISGEditUserData, ISGUser } from "@shares/*";
import axios from "axios";
export namespace UserApis {
  export async function userList(deptCode?: string) {
    try {
      // const queryParam = deptCode ? `?deptCode=${deptCode}` : "";
      // const res = await fetch(`/api/SharedApi/Users${queryParam}`);
      const res = await fetch(`/api/users/${deptCode}`);

      const resultJson = await res.json();
      // console.log("userList:", resultJson);
      return resultJson;
    } catch (exc) {
      console.log(exc);
      return [];
    }
  }

  export async function allUserList() {
    try {
      // const res = await fetch(`/api/SharedApi/Users${queryParam}`);
      const res = await axios.get(`/api/users`);

      const resultJson = res.data;
      // console.log("userList:", resultJson);
      return resultJson;
    } catch (exc) {
      console.log(exc);
      return [];
    }
  }

  export async function addUser(user: ISGEditUserData) {
    try {
      const res = await axios.post(`/api/users`, user);
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

  export async function editUser(user: ISGEditUserData) {
    try {
      const res = await axios.put(`/api/users`, user);
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

  export async function deleteUser(user: ISGEditUserData) {
    try {
      const res = await axios.delete(`/api/users/${user.sid}`);
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

  export async function updateUserStatus(user: ISGUser, status: string) {
    try {
      const formdata = new FormData();
      formdata.append("sid", user.sid);
      formdata.append("status", status);

      //      const res = await axios.post(`/api/users/${user.sid}/status`, formdata);
      const res = await axios.post(`/api/users/status`, formdata);

      const resultJson = res.data;
      // console.log("updateUser:", resultJson);
      return resultJson;
    } catch (exc) {
      console.log(exc);
    }
  }

  export async function teamUsers(deptCode: string) {
    try {
      const res = await fetch(`/api/users/${deptCode}/teams`);
      const resultJson = await res.json();
      // console.log("teamUsers:", resultJson);
      return resultJson;
    } catch (exc) {
      console.log(exc);
      return [];
    }
  }

  export async function testApi(deptCode: number) {
    try {
      const res = await axios.post(`/api/users/testapi/${deptCode}`);
      alert(JSON.stringify(res));
      // if (res.status !== 200) {
      //   return { error: res.statusText };
      // } else {
      //   return { result: res.data };
      // }
      if (res) {
        return { result: res.data };
      } else {
        return { error: "error" };
      }
    } catch (exc) {
      alert("JSON.stringify(exc)");
      alert(JSON.stringify(exc));
      return { error: exc };
    }
  }

  export async function councilUserList() {
    // try {
    //   const res = await fetch(`/api/users/${deptCode}`);

    //   const resultJson = await res.json();
    //   // console.log("userList:", resultJson);
    //   return resultJson;
    // } catch (exc) {
    //   console.log(exc);
    //   return [];
    // }

    try {
      const res = await axios.get(`/api/users/council`);
      if (res) {
        const resultJson = res.data;
        return { result: resultJson };
      } else {
        return { error: "서버오류" };
      }
    } catch (exc) {
      console.log(exc);
      return { error: exc };
    }
  }
}
