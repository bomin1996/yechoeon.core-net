import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  ISGContentLayout,
  ISGScene,
} from "../../../../shares/ISGContentLayout";

interface IMultipleLayoutData {
  curScene?: ISGScene;
  nextScene: () => void;
  onEndContent: (segmentIdx: number, contentIdx: number) => void;
  onStartContent: (segmentIdx: number, contentIdx: number) => void;
}

const MultiLayoutContext = createContext<IMultipleLayoutData | null>(null);

type MultiLayoutProviderProps = PropsWithChildren & {
  layouts: Array<ISGContentLayout>;
};
export function MultiLayoutProvider({
  layouts,
  children,
}: MultiLayoutProviderProps) {
  const [scenes, setScenes] = useState<Array<ISGScene>>();
  const [curScene, setCurScene] = useState<ISGScene>();
  const [contentKeyStack, setContentKeyStack] = useState<Array<string>>();
  useEffect(() => {
    const allScenes: Array<ISGScene> = [];
    layouts
      .filter((layout) => layout !== undefined && layout !== null)
      .forEach((lyo) => {
        lyo.sceneItems.forEach((sc) => allScenes.push(sc));
      });
    setScenes(allScenes);
    if (allScenes.length > 0) {
      setCurScene(allScenes[0]);
    }
  }, []);

  const handleNextScene = () => {
    console.log("handleNextScene");
    if (!scenes) return;
    if (!curScene) {
      setCurScene(scenes[0]);
    } else {
      const index = scenes.indexOf(curScene);
      const nextIndex = (index + 1) % scenes.length;
      setCurScene(scenes[nextIndex]);
    }
  };

  useEffect(() => {
    if (!curScene) {
      setContentKeyStack([]);
    } else {
      const keyStack: Array<string> = [];
      for (let idxSeg = 0; idxSeg < curScene.segments.length; idxSeg++) {
        const segment = curScene.segments[idxSeg];
        for (
          let idxContent = 0;
          idxContent < segment.contents.length;
          idxContent++
        ) {
          const contentKeyText = getContentKey(idxSeg, idxContent);
          keyStack.push(contentKeyText);
        }
      }
      setContentKeyStack(keyStack);
      if (keyStack.length === 0) {
        handleNextScene();
      }
    }
  }, [curScene]);

  const handleOnEndContent = (segmentIdx: number, contentIdx: number) => {
    console.log("handleOnEndContent", segmentIdx, contentIdx);
    if (!contentKeyStack || contentKeyStack.length === 0) return;
    const contentKeyText = getContentKey(segmentIdx, contentIdx);
    setContentKeyStack((pv) => {
      if (pv) {
        const index = pv.indexOf(contentKeyText);
        pv.splice(index, 1);
        if (pv.length === 0) {
          handleNextScene();
        }
        return [...pv];
      }
    });
  };

  const handleOnStartContent = (segmentIdx: number, contentIdx: number) => {};

  return (
    <MultiLayoutContext.Provider
      value={{
        curScene: curScene,
        nextScene: handleNextScene,
        onEndContent: handleOnEndContent,
        onStartContent: handleOnStartContent,
      }}>
      {children}
    </MultiLayoutContext.Provider>
  );
}

export default MultiLayoutContext;

function getContentKey(segmentIdx: number, contentIdx: number) {
  return `${segmentIdx.toString().padStart(2, "0")}-${contentIdx
    .toString()
    .padStart(2, "0")}`;
}
