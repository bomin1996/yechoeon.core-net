import React, { useContext } from "react";
import { RightTitleAdaptiveLayout } from "../RightTitleLayout";
import PreviewScene from "./PreviewScene";
import KioskContext from "src/contexts/KioskContext";
import MultiLayoutContext, {
  MultiLayoutProvider,
} from "src/contexts/MultiLayoutContext";

// export default function Promotion() {
//   const kioskInfoCtx = useContext(KioskContext);
//   const scene = kioskInfoCtx?.promotion?.sceneItems[0];
//   console.log("Render Promotion!!");
//   console.log("Render secne:", JSON.stringify(scene));
//   return (
//     <RightTitleAdaptiveLayout title="홍보안내" className="">
//       {scene && (
//         <PreviewScene
//           className=" w-[1052px] h-[1425px] absolute top-[123px] left-[50%] translate-x-[-50%] "
//           scene={scene}
//         />
//       )}
//     </RightTitleAdaptiveLayout>
//   );
// }

export default function Promotion() {
  const kioskInfoCtx = useContext(KioskContext);
  const layouts =
    kioskInfoCtx?.contents ??
    (kioskInfoCtx?.promotion ? [kioskInfoCtx?.promotion] : []);

  return (
    <RightTitleAdaptiveLayout title="홍보안내" className="">
      <MultiLayoutProvider layouts={layouts}>
        <InternalPromotion />
      </MultiLayoutProvider>
    </RightTitleAdaptiveLayout>
  );
}

function InternalPromotion() {
  const multiLayoutCtx = useContext(MultiLayoutContext);
  return (
    <>
      {multiLayoutCtx?.curScene && (
        <PreviewScene
          className=" w-[1052px] h-[1425px] absolute top-[123px] left-[50%] translate-x-[-50%] "
          scene={multiLayoutCtx?.curScene}
        />
      )}
    </>
  );
}
