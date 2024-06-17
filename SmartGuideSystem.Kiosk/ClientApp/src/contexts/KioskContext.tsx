import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import DeviceContext from "./DeviceContext";
import { ISGKioskInfo } from "@shares/.";

///////////////////////////////
import * as signalr from "@microsoft/signalr";
import { KioskApi } from "src/server/kioskApi";
import { refreshAndApp } from "src/nativeBridge";

/////////////////////////////////

// declare const AndApp: {
//   refreshDevice: () => void;
// };

const KioskContext = createContext<ISGKioskInfo | null>(null);

export function KioskProvider({ children }: PropsWithChildren) {
  const [kioskInfo, setKioskInfo] = useState<ISGKioskInfo | null>(null);
  const deviceContext = useContext(DeviceContext);
  const deviceId = deviceContext?.localDeviceId;
  const [connection, setConnection] = useState<signalr.HubConnection | null>(
    null
  );

  // const [recvCommand, setRecvCommand] = useState("");

  const queryKioskInfo = async () => {
    if (deviceContext?.localDeviceId) {
      const data = await KioskApi.fetchKioskInfo(deviceContext.localDeviceId);
      console.log("fetchKioskInfoData:", data);
      if (!data) {
        setKioskInfo(null);
      } else if (data.error) {
        setKioskInfo(null);
      } else {
        console.log("server data:", data);
        setKioskInfo(data);
      }
    } else {
      setKioskInfo(null);
    }
  };

  const queryKioskInfoNoReset = async () => {
    if (deviceContext?.localDeviceId) {
      const data = await KioskApi.fetchKioskInfo(deviceContext.localDeviceId);
      console.log("fetchKioskInfoData:", data);
      if (data && !data.console.error) {
        console.log("Update kiosk data");
        setKioskInfo(data);
      } else {
        console.log("Can not update kiosk data!");
      }
    }
  };

  useEffect(() => {
    console.log("fetchquery KioskInfoData:", deviceContext);
    queryKioskInfo();
  }, []);

  useEffect(() => {
    const connection = new signalr.HubConnectionBuilder()
      .withUrl(`DeviceNotificationHub?userId=${deviceId}`)
      //.withAutomaticReconnect([0, 0, 10000])
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => 30000,
      })
      .build();

    // const tm = setInterval(() => {
    //   if (connection) {
    //     connection.invoke(
    //       "HeartBeat",
    //       kioskInfo?.deviceInfo?.deviceId,
    //       kioskInfo?.deviceInfo?.kioskType
    //     );
    //   }
    // }, 5000);

    let tm: any;

    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected!");
          setConnection(connection);

          tm = setInterval(() => {
            if (connection) {
              connection.invoke(
                "HeartBeat",
                kioskInfo?.deviceInfo?.deviceId,
                kioskInfo?.deviceInfo?.kioskType
              );
            }
          }, 1000 * 60);

          connection.on("ReceiveNotification", (notification, content) => {
            if (notification === "update") {
              queryKioskInfo();
            }

            // setRecvCommand(notification);
          });
          connection.on("RefreshDevice", (content) => {
            console.log("SigR [RefreshDevice]", content);
            //window.location.reload();
            //await queryKioskInfo();
            // window.location.replace("/"); // 현재 장비 환경에서 의미없음 이상하게 안됨 다시 돌려놈
            //window.location.reload();
            //document.location.reload();
            window.location.replace("/");
            try {
              //AndApp.refreshDevice();
              refreshAndApp();
            } catch (exc) {
              // setRecvCommand("AndApp.refreshDevice:" + exc);
            }

            // setRecvCommand("RefreshDevice:" + content);
          });

          connection.on("UpdateDevice", async (content) => {
            console.log("Updated by updateDevice content:", content);

            await queryKioskInfo();

            // setRecvCommand("UpdateDevice:" + content);
          });

          if (deviceId && kioskInfo?.deviceInfo?.kioskType) {
            console.log("RegisterKioskType by updateDevice");
            connection.invoke(
              "RegisterKioskType",
              kioskInfo?.deviceInfo?.deviceId,
              kioskInfo?.deviceInfo?.kioskType
            );

            connection.invoke(
              "HeartBeat",
              kioskInfo?.deviceInfo?.deviceId,
              kioskInfo?.deviceInfo?.kioskType
            );
          }

          // if (deviceId) {
          //   connection.invoke(
          //     "RegisterDevice",
          //     connection.connectionId,
          //     deviceId
          //   );
          // }
        })
        .catch((exc) => {
          console.log("reason:", exc);
        });
    }

    return () => {
      if (connection) {
        connection
          .stop()
          .then(() => console.log("connection stop!"))
          .catch((r) => console.log(r));
        setConnection(null);
      }
      if (tm) {
        clearInterval(tm);
      }
    };
  }, [kioskInfo?.deviceInfo?.kioskType]);

  useEffect(() => {
    if (kioskInfo) {
      // const autoUpdateMS =
      //   kioskInfo.deviceInfo?.extraSettings?.autoUpdateMS ?? 0;
      //const autoUpdateMS = 15 * 1000;
      //const autoUpdateMS = 0;
      const autoUpdateMS = 30 * 60 * 1000; // 15mins

      if (autoUpdateMS === 0) {
        return;
      }

      // 최솟값이 있어야 한다.

      console.log("start update data timer:", autoUpdateMS);

      const timer = setInterval(() => {
        queryKioskInfoNoReset();
        //window.location.reload();
        //window.location.replace("/");
        console.log("Dispatch auto kioskData update!!");
      }, Math.max(autoUpdateMS, 60000)); // 최소 1분보다 커야 한다
      return () => clearInterval(timer);
    }
  }, [kioskInfo?.deviceInfo?.extraSettings?.autoUpdateMS]);

  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState<Date>();
  const handleClick = () => {
    if (clickCount > 5) {
      if (lastClickTime) {
        setLastClickTime(undefined);
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      } else {
        setClickCount(0);
      }
    } else {
      const now = new Date();
      if (!lastClickTime || now.getTime() - lastClickTime.getTime() > 1000) {
        setClickCount(0);
        setLastClickTime(now);
      } else {
        setClickCount((prev) => prev + 1);
        setLastClickTime(now);
      }
    }
  };

  return (
    <KioskContext.Provider value={kioskInfo}>
      <>
        {children}
        <div
          onClick={handleClick}
          className={`${
            clickCount > 5 ? "opacity-0" : "opacity-0"
          } fixed right-[0px] z-50 bottom-[20px] w-[100px] h-[80px] bg-purple-600 text-white/90 flex flex-col p-1 `}
        >
          {connection?.state}
          {deviceContext?.localDeviceId}
        </div>
        {/* <div className="absolute z-50 left-4 bottom-8 w-[300px] h-[100px] text-lg text-red-600 font-bold">
          {recvCommand}
        </div> */}
      </>
    </KioskContext.Provider>
  );
}

export default KioskContext;
