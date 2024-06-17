import { makeObservable, observable, runInAction } from "mobx";
import { SceneViewModel } from "./SceneViewModel";
import { SceneSegmentViewModel } from "./SceneSegmentViewModel";
import { ISGContentLayout } from "../../../../../shares/ISGContentLayout";

export class ContentLayoutViewModel {
  id: number = 0;
  name: string = "";
  layoutType: string = "";
  category1?: string;

  sceneItems: Array<SceneViewModel> = [];

  activeScene?: SceneViewModel;

  constructor(contentLayout?: ISGContentLayout) {
    if (contentLayout) {
      this.id = contentLayout.id;
      this.name = contentLayout.name;
      this.layoutType = contentLayout.layoutType ?? "freeStyle";
      this.category1 = contentLayout.category1;

      contentLayout.sceneItems?.forEach((scene) => {
        const sceneVM = new SceneViewModel(scene);
        this.sceneItems.push(sceneVM);
      });
      this.activeScene = this.sceneItems[0];
    }
    makeObservable(this, {
      name: observable,
      layoutType: observable,
      category1: observable,
      sceneItems: observable,
      activeScene: observable,
    });
  }

  makeDummy() {
    runInAction(() => {
      const sgvm = new SceneSegmentViewModel();
      sgvm.x = 0;
      sgvm.y = 476;
      sgvm.width = 978;
      sgvm.height = 416;

      const sgvm2 = new SceneSegmentViewModel();
      sgvm2.x = 0;
      sgvm2.y = 0;
      sgvm2.width = 978;
      sgvm2.height = 416;

      const sgvm3 = new SceneSegmentViewModel();
      sgvm3.x = 0;
      sgvm3.y = 953;
      sgvm3.width = 978;
      sgvm3.height = 416;
      // const w = 489 * scaleRatio;
      // const h = 684 * scaleRatio;

      const scene = new SceneViewModel();
      scene.width = 489 * 3;
      scene.height = 684 * 2;
      scene.segments.push(sgvm2);
      scene.segments.push(sgvm);
      scene.segments.push(sgvm3);

      scene.selected = sgvm2;

      this.sceneItems.push(scene);
      this.activeScene = scene;

      this.name = "Noname01";
    });
  }

  initNew() {
    runInAction(() => {
      const sgvm = new SceneSegmentViewModel();
      const sgvm2 = new SceneSegmentViewModel();
      const sgvm3 = new SceneSegmentViewModel();
      sgvm.width = 1052;
      sgvm2.width = 1052;
      sgvm3.width = 1052;
      const scene = new SceneViewModel();
      scene.width = 1052;
      scene.height = 1425;
      scene.segments.push(sgvm);
      scene.segments.push(sgvm2);
      scene.segments.push(sgvm3);
      scene.selected = sgvm;
      scene.setSceneType("3Div");
      this.sceneItems.push(scene);
      this.activeScene = scene;
      this.name = "Noname01";
    });
  }

  testLayoutStyle(index: number) {
    runInAction(() => {
      const scene = this.activeScene!;
      switch (index) {
        case 0:
          {
            scene.segments[0].isVisible = true;
            scene.segments[1].isVisible = true;
            scene.segments[2].isVisible = true;

            scene.segments[0].y = 0;
            scene.segments[0].height = 416;
            scene.segments[1].y = 478;
            scene.segments[1].height = 416;
            scene.segments[2].y = 953;
            scene.segments[2].height = 416;
          }
          break;
        case 1:
          {
            scene.segments[0].isVisible = true;
            scene.segments[1].isVisible = true;
            scene.segments[2].isVisible = false;

            scene.segments[0].y = 0;
            scene.segments[0].height = 416;
            scene.segments[1].y = 446;
            scene.segments[1].height = 930;
          }
          break;
        case 2:
          {
            scene.segments[0].isVisible = true;
            scene.segments[1].isVisible = false;
            scene.segments[2].isVisible = false;

            scene.segments[0].y = 0;
            scene.segments[0].height = 1368;
          }
          break;
        case 3:
          {
            scene.segments[0].isVisible = true;
            scene.segments[1].isVisible = true;
            scene.segments[2].isVisible = false;

            scene.segments[0].y = 21;
            scene.segments[0].height = 565;
            scene.segments[1].y = 717;
            scene.segments[1].height = 565;
          }
          break;
      }
    });
  }

  setName(name: string) {
    runInAction(() => {
      this.name = name;
    });
  }

  setCategory1(category1: string) {
    runInAction(() => {
      this.category1 = category1;
    });
  }
}
