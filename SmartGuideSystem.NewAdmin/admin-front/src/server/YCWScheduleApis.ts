import { IYCSchedule, IYCWatcher } from "@shares/ISGMeetingInfo";
import axios from "axios";

export namespace scheduleApis {
  export async function schedules(
    startTime?: string,
    endTime?: string,
    deptName?: string
  ) {
    try {
      const res = await axios.get(`/api/schedule`, {
        params: { startTime, endTime, deptName },
      });
      return res.data;
    } catch (exc) {
      console.log(exc);
      return exc;
    }
  }

  export async function addSchedule(mi: IYCSchedule) {
    try {
      const res = await axios.post(`/api/schedule`, mi);
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

  export async function updateSchedule(mi: IYCSchedule) {
    try {
      const res = await axios.put(`/api/schedule`, mi);
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

  export async function deleteSchedule(mi: IYCSchedule) {
    try {
      const res = await axios.delete(`/api/schedule/${mi.id}`);
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
