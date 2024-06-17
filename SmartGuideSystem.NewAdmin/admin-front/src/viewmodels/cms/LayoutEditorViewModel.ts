import { makeObservable, observable, runInAction } from "mobx";
import { ContentLayoutViewModel } from "./ContentLayoutViewModel";
import { ISGContent } from "@shares/*";
import axios from "axios";

// interface IContentLayoutEdit {
//   selectedItem?: ISelectedItem;
//   selectItem: (item?: ISelectedItem) => void;
//   scaleRatio: number;
//   setScaleRatio: (scaleRatio: number) => void;
//   setScaleDelta: (scaleDelta: number) => void;
//   contentLayout: ContentLayoutViewModel;
//   contents: ISGContent[];
//   addFileToContentLibrary: (formData: FormData) => void;
// }

export class LayoutEditorViewModel {
  scaleRatio: number = 1;
  contents: ISGContent[] = [];
  contentLayoutVM: ContentLayoutViewModel;

  constructor(layoutVM: ContentLayoutViewModel) {
    this.contentLayoutVM = layoutVM;
    makeObservable(this, {
      scaleRatio: observable,
      contents: observable,
    });
  }

  async queryContents() {
    const res = await axios.get("/api/content/");
    console.log("contents:", res.data);
    const data: ISGContent[] = res.data;
    runInAction(async () => {
      this.contents = data;
    });
  }

  // const addFileToContentLibrary = (formData: FormData) => {
  //   showFileUploadDialog(
  //     dialogCtx!,
  //     formData,
  //     () => {
  //       console.log("Cancel Upload Video");
  //     },
  //     (url) => {
  //       //setVideoUrl(url);
  //       //alert(url);

  //       queryContents();
  //     }
  //   );
  // };
}
