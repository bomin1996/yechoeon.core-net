import { DeviceInfo } from "src/types/DeviceInfo";
import { createContext, PropsWithChildren, useState } from "react";
import { Consts } from "src/types/Consts";

const DeviceContext = createContext<DeviceInfo | null>(null);
const CLICK_COUNT = 5;

export function DeviceProvider({ children }: PropsWithChildren) {
  const [deviceId, setDeviceId] = useState<string | null>(
    localStorage.getItem(Consts.LOCAL_SAVE_DEVICE_KEY)
  );
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState<Date>();
  const handleClick = () => {
    if (clickCount > CLICK_COUNT) {
      localStorage.removeItem(Consts.LOCAL_SAVE_DEVICE_KEY);
      setClickCount(0);
      setLastClickTime(undefined);
      window.location.replace("/");
    } else {
      const now = new Date();
      if (!lastClickTime || now.getTime() - lastClickTime.getTime() > 1000) {
        setClickCount(1);
        setLastClickTime(now);
      } else {
        setClickCount(clickCount + 1);
        setLastClickTime(now);
      }
    }
  };

  return (
    <DeviceContext.Provider
      value={{
        localDeviceId: deviceId,
        setDeviceId: (did) => {
          localStorage.setItem(Consts.LOCAL_SAVE_DEVICE_KEY, did);
          setDeviceId(did);
        },
      }}>
      <>
        {children}
        <div
          style={{
            zIndex: 30000,
          }}
          onMouseDown={handleClick}
          // className="fixed h-[80px] w-[100px] left-[30px] bottom-[20px] bg-white/60 "
          className="fixed h-[100px] w-[100px] right-[100px] bottom-[40px] bg-white/0 "></div>
      </>
    </DeviceContext.Provider>
  );
}

export default DeviceContext;
