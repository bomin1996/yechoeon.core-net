import axios from "axios";
import { ISGLocalMap } from "@shares/ISGLocalMap";

export namespace LocalMapApi {
  export async function localMapList() {
    try {
      const res = await axios.get("/api/localmap");
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

  export async function addLocalMap(localmap: ISGLocalMap) {
    try {
      const res = await axios.post(`/api/localmap`, localmap);
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

  export async function updateLocalMap(localmap: ISGLocalMap) {
    try {
      const res = await axios.put(`/api/localmap`, localmap);
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

  export async function removeLocalMap(localmap: ISGLocalMap) {
    try {
      const res = await axios.delete(`/api/localmap/${localmap.id}`);
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
