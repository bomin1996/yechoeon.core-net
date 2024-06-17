import { makeObservable, observable, runInAction } from "mobx";
import { SceneSegmentViewModel } from "./SceneSegmentViewModel";
import { ISGScene, SceneType } from "@shares/ISGContentLayout";

export class SceneViewModel {
  width: number = 0;
  height: number = 0;
  segments: Array<SceneSegmentViewModel> = [];
  sceneType?: SceneType;
  activeSegment?: SceneSegmentViewModel;

  // get species(): string {
  //   return this._species;
  // }

  // // setter 함수
  // set species(value:string) {
  //   if ( value.length > 3 ) { this._species = value; }
  // }

  get selected(): SceneSegmentViewModel | undefined {
    return this.activeSegment;
  }
  set selected(value: SceneSegmentViewModel | undefined) {
    runInAction(() => {
      if (this.activeSegment) {
        this.activeSegment.isSelected = false;
      }
      this.activeSegment = value;
      if (this.activeSegment) {
        this.activeSegment.isSelected = true;
      }
    });
  }

  constructor(scene?: ISGScene) {
    if (scene) {
      this.width = scene.width;
      this.height = scene.height;
      //this.sceneType = scene.sceneType;

      scene.segments?.forEach((seg) => {
        const segVM = new SceneSegmentViewModel(seg);
        segVM.selectFirstContent();
        this.segments.push(segVM);
      });

      this.setSceneType(scene.sceneType ?? "FullScreen");
    }
    makeObservable(this, {
      width: observable,
      height: observable,
      segments: observable,
      activeSegment: observable,
      sceneType: observable,
      // selected: observable,
    });
  }

  setSceneType(sceneType: SceneType) {
    console.log("setSceneType:", `${sceneType}`);
    runInAction(() => {
      this.sceneType = sceneType;

      this.segments.forEach((sg) => (sg.isVisible = false));

      switch (sceneType) {
        case "3Div":
          {
            this.segments[0].isVisible = true;
            this.segments[1].isVisible = true;
            this.segments[2].isVisible = true;
            this.segments[0].y = 0;
            this.segments[0].height = 460;
            this.segments[1].y = 485;
            this.segments[1].height = 460;
            this.segments[2].y = 969;
            this.segments[2].height = 460;
          }
          break;
        case "2Div(1:2)":
          {
            this.segments[0].isVisible = true;
            this.segments[1].isVisible = true;
            this.segments[2].isVisible = false;

            this.segments[0].y = 0;
            this.segments[0].height = 448;
            this.segments[1].y = 478;
            this.segments[1].height = 940;
          }
          break;
        case "FullScreen":
          {
            this.segments[0].isVisible = true;
            this.segments[1].isVisible = false;
            this.segments[2].isVisible = false;

            this.segments[0].y = 0;
            this.segments[0].height = 1425;
          }
          break;
        case "FullScreen_(1920x1080)":
          {
            this.width = 1920;
            this.height = 1080;
            this.segments[0].isVisible = true;
            this.segments[0].y = 0;
            this.segments[0].x = 0;
            this.segments[0].height = 1080;
            this.segments[0].width = 1920;
          }
          break;
        case "FullScreen_(2160x3840)":
          {
            this.width = 2160;
            this.height = 3840;
            this.segments[0].isVisible = true;
            this.segments[0].y = 0;
            this.segments[0].x = 0;
            this.segments[0].height = 3840;
            this.segments[0].width = 2160;
          }
          break;
        case "2Div":
          {
            this.segments[0].isVisible = true;
            this.segments[1].isVisible = true;
            this.segments[2].isVisible = false;

            this.segments[0].y = 0;
            this.segments[0].height = 690;
            this.segments[1].y = 728;
            this.segments[1].height = 690;
          }
          break;
        case "2Div(2:1)":
          {
            this.segments[0].isVisible = true;
            this.segments[1].isVisible = true;
            this.segments[2].isVisible = false;

            this.segments[0].y = 0;
            this.segments[0].height = 940;
            this.segments[1].y = 970;
            this.segments[1].height = 448;
          }
          break;
        // 진주
        case "3Div_1_4_1_(8192x2160)":
          {
            this.width = 8192;
            this.height = 2160;

            this.segments[0].isVisible = true;
            this.segments[1].isVisible = true;
            this.segments[2].isVisible = true;

            this.segments[0].x = 0;
            this.segments[0].y = 0;
            this.segments[0].width = 1365;
            this.segments[0].height = 2160;

            this.segments[1].x = 1365;
            this.segments[1].y = 0;
            this.segments[1].width = 5460;
            this.segments[1].height = 2160;

            this.segments[2].x = 1365 + 5460;
            this.segments[2].y = 0;
            this.segments[2].width = 1365;
            this.segments[2].height = 2160;
          }
          break;
        case "4Div_1_1_1_1_(8192x2160)":
          {
            this.width = 8192;
            this.height = 2160;

            this.segments[0].isVisible = true;
            this.segments[1].isVisible = true;
            this.segments[2].isVisible = true;
            if (this.segments.length < 4) {
              const sgvm = new SceneSegmentViewModel();
              this.segments.push(sgvm);
            }
            this.segments[3].isVisible = true;

            this.segments[0].x = 0;
            this.segments[0].y = 0;
            this.segments[0].width = 2048;
            this.segments[0].height = 2160;

            this.segments[1].x = 2048;
            this.segments[1].y = 0;
            this.segments[1].width = 2048;
            this.segments[1].height = 2160;

            this.segments[2].x = 2048 * 2;
            this.segments[2].y = 0;
            this.segments[2].width = 2048;
            this.segments[2].height = 2160;

            this.segments[3].x = 2048 * 3;
            this.segments[3].y = 0;
            this.segments[3].width = 2048;
            this.segments[3].height = 2160;
          }
          break;
        case "1Div_1_(7680x1080)":
          {
            this.width = 7680;
            this.height = 1080;
            this.segments[0].isVisible = true;
            this.segments[0].x = 0;
            this.segments[0].y = 0;
            this.segments[0].width = 6720;
            this.segments[0].height = 1080;
          }
          break;
        case "2Div_2_1_(3840x2160)":
          {
            this.width = 3840;
            this.height = 2160;
            this.segments[0].isVisible = true;
            this.segments[0].x = 0;
            this.segments[0].y = 0;
            this.segments[0].width = 2560;
            this.segments[0].height = 2160;

            this.segments[1].isVisible = true;
            this.segments[1].x = 2560;
            this.segments[1].y = 0;
            this.segments[1].width = 1280;
            this.segments[1].height = 2160;
          }
          break;
        case "2Div_2_1_(1080x1920)":
          {
            this.width = 1080;
            this.height = 1920;
            this.segments[0].isVisible = true;
            this.segments[0].x = 0;
            this.segments[0].y = 0;
            this.segments[0].width = 1080;
            this.segments[0].height = 1325;

            this.segments[1].isVisible = true;
            this.segments[1].x = 0;
            this.segments[1].y = 1325;
            this.segments[1].width = 1080;
            this.segments[1].height = 595;
          }
          break;
        case "FullScreen_(1000x1160)":
          {
            this.width = 1000;
            this.height = 1160;
            this.segments[0].isVisible = true;
            this.segments[0].x = 0;
            this.segments[0].y = 0;
            this.segments[0].width = 1000;
            this.segments[0].height = 1160;
          }
          break;
        case "2Div_1_1_(1000x1160)":
          {
            this.width = 1000;
            this.height = 1160;
            this.segments[0].isVisible = true;
            this.segments[0].x = 0;
            this.segments[0].y = 0;
            this.segments[0].width = 1000;
            this.segments[0].height = 570;
            this.segments[1].isVisible = true;
            this.segments[1].x = 0;
            this.segments[1].y = 590;
            this.segments[1].width = 1000;
            this.segments[1].height = 570;
          }
          break;
        case "2Div_2_1_(1000x1160)":
          {
            this.width = 1000;
            this.height = 1160;
            this.segments[0].isVisible = true;
            this.segments[0].x = 0;
            this.segments[0].y = 0;
            this.segments[0].width = 1000;
            this.segments[0].height = 700;
            this.segments[1].isVisible = true;
            this.segments[1].x = 0;
            this.segments[1].y = 720;
            this.segments[1].width = 1000;
            this.segments[1].height = 440;
          }
          break;
      }
    });
  }
}
