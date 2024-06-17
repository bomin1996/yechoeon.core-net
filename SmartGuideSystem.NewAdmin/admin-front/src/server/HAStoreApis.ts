import {
  IHABusInfo,
  IHAStoreData,
  IHAStoreInfo,
  ISGEditUserData,
  ISGUser,
} from "@shares/*";
import axios from "axios";
export namespace HAStoreApis {
  export async function storeList() {
    try {
      const res = await axios.get(`/api/hastore`);
      return res.data;
    } catch (exc) {
      console.log(exc);
      return exc;
    }
  }

  export async function addStore(formData: FormData) {
    try {
      const res = await axios.post(`api/hastore`, formData);
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

  export async function editStore(formData: FormData, store: IHAStoreInfo) {
    try {
      const res = await axios.put(`api/hastore/${store.id}`, formData);
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

  export async function removeStore(store: IHAStoreInfo) {
    try {
      const res = await axios.delete(`/api/hastore/${store.id}`);
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
