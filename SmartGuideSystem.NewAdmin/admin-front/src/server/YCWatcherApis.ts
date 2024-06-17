import { IYCWatcher } from "@shares/ISGMeetingInfo";
import axios from "axios";

export namespace watcherApis {
  export async function watchers(startTime?: string, endTime?: string) {
    try {
      const res = await axios.get(`/api/watcher`, {
        params: { startTime, endTime },
      });
      return res.data;
    } catch (exc) {
      console.log(exc);
      return exc;
    }
  }

  export async function addWatcher(mi: IYCWatcher) {
    try {
      const res = await axios.post(`/api/watcher`, mi);
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

  export async function updateWatcher(mi: IYCWatcher) {
    try {
      const res = await axios.put(`/api/watcher`, mi);
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

  export async function deleteWatcher(mi: IYCWatcher) {
    try {
      const res = await axios.delete(`/api/watcher/${mi.id}`);
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
