import axios from "axios";
import { ISGNotice, ISGNoticeInfo } from "@shares/ISGNoticeInfo";

export namespace noticegApis {
  export async function noticeInfos(
    startTime?: string,
    endTime?: string,
    deptName?: string
  ) {
    try {
      const res = await axios.get(`/api/notice`, {
        params: { startTime, endTime, deptName },
      });
      return res.data;
    } catch (exc) {
      console.log(exc);
      return exc;
    }
  }

  export async function addNoticeInfo(mi: ISGNotice) {
    try {
      const res = await axios.post(`/api/notice`, mi);
      if (res) {
        const resultJson = res.data;
        //console.log("updateUser:", resultJson);
        return { result: resultJson };
      } else {
        return { error: "서버오류" };
      }
    } catch (exc) {
      console.log(exc);
      return { error: exc };
    }
  }

  export async function updateMeetingInfo(mi: ISGNotice) {
    try {
      const res = await axios.put(`/api/notice`, mi);
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

  export async function deleteNoticeInfo(mi: ISGNotice) {
    try {
      const res = await axios.delete(`/api/notice/${mi.id}`);
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
