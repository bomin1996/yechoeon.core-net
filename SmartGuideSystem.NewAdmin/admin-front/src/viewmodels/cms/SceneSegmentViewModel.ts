import {  makeObservable, observable, runInAction } from "mobx";
import { BaseContentViewModel } from "./BaseContentViewModel";
import { ISGContent, ISGSceneSegment } from "@shares/*";
import { VideoContentViewModel } from "./VideoContentViewModel";
import { ImageContentViewModel } from "./ImageContentViewModel";

export class SceneSegmentViewModel {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  isSelected: boolean = false;
  contents: Array<BaseContentViewModel> = [];
  selectedContentVM?: BaseContentViewModel;
  thumbnail?: string;

  isVisible = true;

  get selected(): BaseContentViewModel | undefined {
    return this.selectedContentVM;
  }
  set selected(value: BaseContentViewModel | undefined) {
    runInAction(() => {
      if (this.selectedContentVM) {
        this.selectedContentVM.isSelected = false;
      }
      this.selectedContentVM = value;
      if (this.selectedContentVM) {
        this.selectedContentVM.isSelected = true;
      }
    });
  }

  constructor(segement?: ISGSceneSegment) {
    if (segement) {
      this.x = segement.x;
      this.y = segement.y;
      this.width = segement.width;
      this.height = segement.height;
      this.isVisible = segement.isVisible;

      segement.contents?.forEach((ct) => {
        if (ct.contentType === "video") {
          const cvm = new VideoContentViewModel(ct);
          this.contents.push(cvm);
        } else if (ct.contentType === "image") {
          const cvm = new ImageContentViewModel(ct);
          this.contents.push(cvm);
        }
      });
      this.updateThumbnail();
    }
    makeObservable(this, {
      x: observable,
      y: observable,
      width: observable,
      height: observable,
      isSelected: observable,
      contents: observable,
      selectedContentVM: observable,
      thumbnail: observable,
      isVisible: observable,
    });
  }

  updateThumbnail() {
    runInAction(() => {
      const content = this.contents.find((c) => c.thumbnail);
      this.thumbnail = content?.thumbnail;
    });
  }

  addContent(content: ISGContent) {
    let contentVM: BaseContentViewModel;
    if (content.contentType === "video") {
      contentVM = VideoContentViewModel.from(content);
    } else if (content.contentType === "image") {
      contentVM = ImageContentViewModel.from(content);
    }

    //this.contents.push(videoContentVM);
    runInAction(() => {
      this.contents.push(contentVM);
      //this.contents = [...this.contents, videoContentVM];
      //this.contents.splice(this.contents.length, 0, videoContentVM);
      this.updateThumbnail();
    });
  }

  removeContent(contentVM: BaseContentViewModel) {
    runInAction(() => {
      const index = this.contents.findIndex((c) => c.id === contentVM.id);
      if (index !== -1) {
        this.contents.splice(index, 1);
        this.updateThumbnail();
      }
    });
  }

  selectFirstContent() {
    runInAction(() => {
      this.selected = this.contents[0];
    });
  }
}
