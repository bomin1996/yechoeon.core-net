import React, { useContext, useEffect } from "react";
import DeviceContext from "src/contexts/DeviceContext";

export default function NoData() {
  const deviceContext = useContext(DeviceContext);
  const deviceId = deviceContext?.localDeviceId ?? "[]";

  // useEffect(() => {
  //   if (deviceId) {
  //     const tm = setInterval(() => {
  //       window.location.replace("/");
  //     }, 1000 * 30); // 30초
  //     return () => {
  //       clearInterval(tm);
  //     };
  //   }
  // }, []);

  return (
    <div className="flex w-screen h-screen  bg-[#231f20]">
      <p className="m-auto font-bold text-6xl text-white/90">
        {" "}
        장비아이디: {deviceId}
      </p>
    </div>
  );
}
