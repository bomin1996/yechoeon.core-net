import { Duration } from "luxon";
import { makeObservable, observable, runInAction } from "mobx";
import { ISGSegmentContent } from "../../../../../shares/ISGContentLayout";

export abstract class BaseContentViewModel {
  url: string = "";
  name: string = "";
  fileName: string = "";
  duration: number = 0;
  thumbnail?: string;
  id: number = 0;
  isSelected: boolean = false;
  contentFit: string = "";
  width: number = 0;
  height: number = 0;
  size: number = 0;

  //abstract get contentType(): string;
  abstract contentType: string;

  constructor(content?: ISGSegmentContent) {
    if (content) {
      this.url = content.url;
      this.name = content.name;
      this.fileName = content.fileName;
      this.duration = content.duration;
      this.thumbnail = content.thumbnail;
      this.id = content.id;
      this.contentFit = content.contentFit;
      this.width = content.width;
      this.height = content.height;
      this.size = content.size;
    }
    makeObservable(this, {
      isSelected: observable,
      duration: observable,
      contentFit: observable,
    });
  }

  // get hours(): number {
  //   const duration = Duration.fromMillis(this.duration);
  //   return duration.hours;
  // }
  // get minutes(): number {
  //   const duration = Duration.fromMillis(this.duration);
  //   return duration.minutes;
  // }
  // get seconds(): number {
  //   const duration = Duration.fromMillis(this.duration);
  //   return duration.seconds;
  // }

  get playTimeDesc(): string {
    const duration = Duration.fromMillis(this.duration);
    return duration.toFormat("hh:mm:ss");
  }

  changeDuration(duration: number) {
    runInAction(() => {
      this.duration = duration;
    });
  }

  settingContentFit(contentFit: string) {
    runInAction(() => {
      this.contentFit = contentFit;
    });
  }
}
