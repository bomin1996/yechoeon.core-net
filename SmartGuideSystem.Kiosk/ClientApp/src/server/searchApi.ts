import { ISGUser } from "@shares/ISGUser";
import axios from "axios";

export namespace SearchApi {
  export interface UserSearchResult {
    resultCount: number;
    pageCount: number;
    pageIndex: number;
    result: Array<ISGUser>;
  }

  export async function searchUser2(
    searchText: string,
    pageIndex: number = 0,
    pageCount: number = 50
  ) {
    const api_url = `/api/kioskinfo/search/users`;
    try {
      //string searchText, int? pageIndex = 0, int? pageCount = 50
      const res = await axios.get(api_url, {
        params: {
          searchText,
          pageIndex,
          pageCount,
        },
      });

      console.log(api_url, res.data);
      return res.data;
    } catch (e) {
      console.log(api_url, e);
    }
  }

  export async function searchOrgChart(searchText: string) {
    const api_url = `/api/kioskinfo/search/organization-chart/${searchText}`;
    try {
      const res = await fetch(api_url);
      const jsonResult = await res.json();
      console.log(api_url, jsonResult);
      return jsonResult;
    } catch (e) {
      console.log(api_url, e);
      return [];
    }
  }

  export async function searchSeatPosChart(searchText: string) {
    const api_url = `/api/kioskinfo/search/seatpos-chart/${searchText}`;
    try {
      const res = await fetch(api_url);
      const jsonResult = await res.json();
      console.log(api_url, jsonResult);
      return jsonResult;
    } catch (e) {
      console.log(api_url, e);
      return [];
    }
  }

  export async function searchUser(searchText: string) {
    const api_url = `/api/kioskinfo/SearchUser/${searchText}`;
    try {
      const res = await fetch(api_url);
      const jsonResult = await res.json();
      console.log(api_url, jsonResult);
      return jsonResult;
    } catch (e) {
      console.log(api_url, e);
      return [];
    }
  }

  // export async function searchDepartment(searchText: string) {
  //   const api_url = `/api/kioskinfo/SearchDepartment/${searchText}`;
  //   try {
  //     const res = await fetch(api_url);
  //     const jsonResult = await res.json();
  //     console.log(api_url, jsonResult);
  //     return jsonResult;
  //   } catch (e) {
  //     console.log(api_url, e);
  //     return [];
  //   }
  // }
}
