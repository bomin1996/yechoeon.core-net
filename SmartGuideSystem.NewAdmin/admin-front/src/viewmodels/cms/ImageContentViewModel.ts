import { ISGContent } from "@shares/*";
import { BaseContentViewModel } from "./BaseContentViewModel";

export class ImageContentViewModel extends BaseContentViewModel {
  // get contentType() {
  //   return "image";
  // }
  contentType: string = "image";

  static from(data: ISGContent): ImageContentViewModel {
    const vm = new ImageContentViewModel();
    vm.fileName = data.uploadFileName;
    vm.name = data.name;
    vm.thumbnail = data.thumbnail;
    vm.url = data.url;
    vm.id = data.id;
    vm.duration = 10 * 1000; // 10Seconds
    vm.width = data.width;
    vm.height = data.height;
    vm.size = data.size;
    vm.contentFit = "object-fill";

    return vm;
  }
}
