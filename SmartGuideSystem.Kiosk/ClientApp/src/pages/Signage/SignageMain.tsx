import React, { useContext, useState } from "react";
import Promotion from "src/components/Promotion";
import PreviewScene from "src/components/Promotion/PreviewScene";
import MockupScreen from "src/components/ui/MockupScreen";
import { FirstClickProvider } from "src/contexts/FirstClickContext";
import KioskContext from "src/contexts/KioskContext";

export default function SignageMain() {
  const kioskInfoCtx = useContext(KioskContext);
  const scene = kioskInfoCtx?.promotion?.sceneItems[0];
  const [clicked, setClicked] = useState(false);

  const width = scene?.width ?? 1080;
  const height = scene?.height ?? 1920;

  return (
    <MockupScreen
      mockupWidth={width}
      mockupHeight={height}
      className="w-screen h-screen bg-slate-500"
    >
      <div className="w-full h-full bg-black">
        {/* <h1 className="absolute left-0 top-0 p-2 bg-green-400 text-black text-3xl">
          {width}x{height}
        </h1> */}
        <FirstClickProvider isClicked={clicked}>
          {scene && <PreviewScene className=" w-full h-full " scene={scene} />}
        </FirstClickProvider>
      </div>
    </MockupScreen>
  );
}
