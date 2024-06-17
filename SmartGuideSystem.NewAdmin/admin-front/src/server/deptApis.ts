import axios from "axios";
import { ISGDepartment } from "../../../../shares/ISGDepartment";

export namespace DeptApis {
  export async function deptList(depth?: number, option?: string) {
    try {
      const param = {
        params: {
          depth: depth,
          option: option,
        },
      };
      const res =
        !depth && !option
          ? await axios.get(`/api/departments`)
          : await axios.get(`/api/departments`, param);

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

  export async function department(deptCode: string) {
    try {
      const res = await axios.get(`/api/departments/${deptCode}`);
      const resultJson = res.data;
      // console.log("Departments:", resultJson);
      return resultJson;
    } catch (exc) {
      console.log(exc);
    }
  }

  export async function addDepartment(department: ISGDepartment) {
    try {
      const res = await axios.post(`/api/departments`, department);
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

  export async function updateDepartment(department: ISGDepartment) {
    try {
      const res = await axios.put(`/api/departments`, department);
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

  export async function removeDepartment(department: ISGDepartment) {
    try {
      const res = await axios.delete(`/api/departments/${department.deptCode}`);
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
