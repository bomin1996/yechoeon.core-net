import axios from "axios";
import { ContentLayoutViewModel } from "@/viewmodels/cms/ContentLayoutViewModel";
import { ISGContentLayout } from "../../../../shares/ISGContentLayout";

export namespace ContentApi {
  export async function contentList(category: string) {
    try {
      const res = await axios.get("/api/content/");
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

  export async function contentLayoutList() {
    try {
      const res = await axios.get("/api/content/layouts");
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

  //   id: number;
  //   name: string;
  //   desc?: string;
  //   category1?: string;
  //   layoutType?: string;
  //   modifiedTime?: string;
  //   modifier?: string;
  //   sceneItems: Array<ISGScene>;

  export async function updateContentLayout(
    viewModel: ContentLayoutViewModel,
    desc?: string,
    category1?: string
  ) {
    try {
      const requestBody: ISGContentLayout = {
        id: viewModel.id,
        name: viewModel.name,
        desc: desc,
        category1: category1,
        sceneItems: viewModel.sceneItems,
      };

      const res = await axios.post(`/api/content/layouts`, requestBody);
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

  export async function deleteContent(id: number) {
    try {
      const res = await axios.delete(`/api/content/${id}`);
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

  export async function deleteContentLayout(id: number) {
    const res = await axios.delete(`/api/content/layouts/${id}`);
    const resultJson = res.data;
    return resultJson;
  }
}
