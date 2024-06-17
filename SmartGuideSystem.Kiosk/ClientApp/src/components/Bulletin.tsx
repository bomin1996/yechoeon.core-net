import React, { useEffect, useState } from "react";
import * as signalr from "@microsoft/signalr";

interface INotification {
  notification: string;
  content: string;
}

export default function Bulletin() {
  const [connection, setConnection] = useState<signalr.HubConnection | null>(
    null
  );
  const [notification, setNotification] = useState<INotification | null>({
    notification: "-",
    content: "-",
  });

  useEffect(() => {
    const connection = new signalr.HubConnectionBuilder()
      //.withUrl(`${process.env.REACT_APP_SIGNALR_URL}`)
      .withUrl(`${"DeviceNotificationHub"}`)
      .withAutomaticReconnect([0, 0, 10000])
      .build();

    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected!");
          setConnection(connection);
          connection.on("ReceiveNotification", (notification, content) => {
            //console.log("ReceiveNotification:", notification);
            //console.log("ReceiveNotificationContent:", content);

            setNotification({ notification: notification, content: content });
          });
        })
        .catch((exc) => {
          console.log("reason:", exc);
        });
    }
  }, []);

  return (
    <div>
      Kiosk {connection ? "connected!" : "not connected!"} <br />
      Noti:{notification?.notification} <br />
      {notification?.content} <br />
    </div>
  );
}
