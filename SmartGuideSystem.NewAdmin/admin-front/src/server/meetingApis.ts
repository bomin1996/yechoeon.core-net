import { ISGMeetingInfo } from "@shares/ISGMeetingInfo";
import axios from "axios";

export namespace meetingApis {
  export async function meetingInfos(
    startTime?: string,
    endTime?: string,
    deptName?: string
  ) {
    try {
      const res = await axios.get(`/api/meetinginfo`, {
        params: { startTime, endTime, deptName },
      });
      return res.data;
    } catch (exc) {
      console.log(exc);
      return exc;
    }
  }

  export async function addMeetingInfo(mi: ISGMeetingInfo) {
    // try {
    //   console.log("/api/meetinginfo req body:", JSON.stringify(mi));

    //   const res = await axios.post(`/api/meetinginfo`, mi);
    //   return res.data;
    // } catch (exc) {
    //   console.log(exc);
    //   return exc;
    // }

    try {
      const res = await axios.post(`/api/meetinginfo`, mi);
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

  export async function updateMeetingInfo(mi: ISGMeetingInfo) {
    // try {
    //   console.log("/api/meetinginfo req body:", JSON.stringify(mi));
    //   const res = await axios.put(`/api/meetinginfo`, mi);
    //   return res.data;
    // } catch (exc) {
    //   console.log(exc);
    //   return exc;
    // }

    try {
      const res = await axios.put(`/api/meetinginfo`, mi);
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

  export async function deleteMeetingInfo(mi: ISGMeetingInfo) {
    // try {
    //   console.log("/api/meetinginfo req body:", JSON.stringify(mi));
    //   const res = await axios.delete(`/api/meetinginfo/${mi.id}`);
    //   return res.data;
    // } catch (exc) {
    //   console.log(exc);
    //   return exc;
    // }

    try {
      const res = await axios.delete(`/api/meetinginfo/${mi.id}`);
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

  export async function meetingRooms() {
    try {
      const res = await axios.get(`/api/meetinginfo/meetingRooms`);
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
