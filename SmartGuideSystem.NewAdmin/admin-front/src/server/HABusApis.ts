import { IHABusInfo } from "@shares/*";
import axios from "axios";
export namespace HABusApi {
  export async function busInfoList() {
    try {
      const res = await axios.get("/api/habus");
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

  export async function addBusRouteInfo(busInfo: FormData) {
    try {
      console.log("/api/habus", busInfo);
      const res = await axios.post(`/api/habus`, busInfo);
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

  export async function updateBusRouteInfo(id: number, busInfo: FormData) {
    try {
      const res = await axios.put(`/api/habus/${id}`, busInfo);
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

  export async function removeBusRouteInfo(busInfo: IHABusInfo) {
    try {
      console.log("removeBusRouteInfo", busInfo);
      const res = await axios.delete(`/api/habus/${busInfo.id}`);
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
