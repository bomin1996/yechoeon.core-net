import KioskMain from "src/pages/KioskMain";
import Setup from "src/pages/Setup";
import React, { useContext } from "react";
import DeviceContext from "src/contexts/DeviceContext";
import { KioskProvider } from "src/contexts/KioskContext";
import Bulletin from "./Bulletin";
export default function MainLayout() {
  const deviceContext = useContext(DeviceContext);
  const localDeviceId = deviceContext?.localDeviceId;

  return (
    <>
      {localDeviceId ? (
        <KioskProvider>
          <KioskMain />
        </KioskProvider>
      ) : (
        <Setup />
      )}

      {/* 장비디버그용 */}
      {/* <div className="fixed left-0 top-0 ml-10 mt-5  w-[400px] text-white text-lg p-4 rounded-2xl bg-black/40">
        <p>DeviceID:{localDeviceId}</p>
        <Bulletin />
      </div> */}
    </>
  );
}
