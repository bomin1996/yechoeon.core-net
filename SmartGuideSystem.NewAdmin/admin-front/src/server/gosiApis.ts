import axios from "axios";

export namespace gosiApis {
  export async function gosiInfos(
    startTime?: string,
    endTime?: string,
    deptName?: string
  ) {
    try {
      const res = await axios.get(`/api/gosiinfo`, {
        params: { startTime, endTime, deptName },
      });
      return res.data;
    } catch (exc) {
      console.log(exc);
      return exc;
    }
  }
}
