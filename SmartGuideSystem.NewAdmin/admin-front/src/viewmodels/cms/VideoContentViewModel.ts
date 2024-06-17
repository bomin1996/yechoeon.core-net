import { ISGContent } from "../../../../../shares/ISGContent";
import { BaseContentViewModel } from "./BaseContentViewModel";

export class VideoContentViewModel extends BaseContentViewModel {
  // get contentType() {
  //   return "video";
  // }

  contentType: string = "video";

  static from(data: ISGContent): VideoContentViewModel {
    const vm = new VideoContentViewModel();
    vm.fileName = data.uploadFileName;
    vm.name = data.name;
    vm.thumbnail = data.thumbnail;
    vm.url = data.url;
    vm.id = data.id;
    vm.duration = data.duration;
    vm.width = data.width;
    vm.height = data.height;
    vm.size = data.size;
    vm.contentFit = "object-fill";
    return vm;
  }
}
