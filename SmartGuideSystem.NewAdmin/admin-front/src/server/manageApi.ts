import axios, { AxiosResponse } from "axios";

export namespace ManageApi {
  export async function migrateDB() {
    // try {
    //   const res = await axios.get(
    //     `/api/manage-server/import-departments-users`
    //   );
    //   return res;
    // } catch (exc) {
    //   console.log(exc);
    //   return exc;
    // }

    try {
      const res = await axios.post(
        `/api/manage-server/import-departments-users`
      );
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

  export async function signAgeInfo() {
    try {
      const res = await axios.get(`/api/manage-server/signage-info`);
      return res.data;
    } catch (exc) {
      console.log(exc);
      return exc;
    }
  }

  export async function councilSettings() {
    try {
      // const res = await axios.get(`/api/manage-server/council-settings`);
      const res = await axios.get(`/api/council/council-settings`);

      return res.data;
    } catch (exc) {
      console.log(exc);
      return exc;
    }
  }

  export async function migrateDeptUsersFromInsa(deptCode: string) {
    try {
      const res = await axios.post(
        `/api/manage-server/update-users-by-deptcode/${deptCode}`
      );
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
}
