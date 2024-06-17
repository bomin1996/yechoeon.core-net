import { KioskType } from "@shares/KioskType";
import { ISGDevice } from "@shares/";
import axios from "axios";

export namespace DeviceApis {
  export async function deviceList() {
    try {
      // const res = await fetch(`/api/SharedApi/devices`);
      // const resultJson = await res.json();
      const res = await axios.get("/api/devices");
      const resultJson = res.data;
      // console.log("deviceList:", resultJson);
      return resultJson;
    } catch (exc) {
      console.log(exc);
      return [];
    }
  }

  export async function addDevice(device: ISGDevice) {
    try {
      const res = await axios.post(`/api/devices`, device);
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

  export async function updateDevice(device: ISGDevice) {
    try {
      const res = await axios.put(`/api/devices`, device);
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

  export async function removeDevice(device: ISGDevice) {
    // try {
    //   const res = await fetch(`/api/devices/${device.id}`, {
    //     method: "DELETE",
    //   });
    //   return res.status === 200;
    // } catch (exc) {
    //   console.log(exc);
    //   return false;
    // }

    try {
      const res = await axios.delete(`/api/devices/${device.id}`);
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

  export async function refresh(deviceId: string) {
    const res = await axios.post(`/api/devices/${deviceId}/refresh`);
    return res.data;
  }

  export async function existDeviceId(deviceId: string) {
    try {
      const res = await axios.get(`/api/devices/${deviceId}/exist`);
      return res;
    } catch (exc) {
      console.log(exc);
    }
  }

  export async function refreshKioskType(kioskType: KioskType) {
    const res = await axios.post(`/api/devices/kiosktype/${kioskType}/refresh`);
    return res.data;
  }

  export async function updateKioskType(kioskType: KioskType) {
    const res = await axios.post(`/api/devices/kiosktype/${kioskType}/update`);
    return res.data;
  }

  export async function activeDeviceStatus() {
    const res = await axios.get(`/api/devices/active-device-status`);
    console.log("activeDeviceStatus:", res.data);
    return res.data;
  }
}
