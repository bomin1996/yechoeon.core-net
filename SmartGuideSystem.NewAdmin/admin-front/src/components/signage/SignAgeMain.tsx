import { useEffect, useState } from "react";
import { ManageApi } from "@/server/manageApi";

export default function SignAgeMain() {
  const [source, setSource] = useState("");
  // const [style, setStyle] = useState("");

  const querySignageInfo = async () => {
    const res = await ManageApi.signAgeInfo();
    setSource(res.src);
  };

  useEffect(() => {
    const signageSrc = sessionStorage.getItem("signage.src");
    // const signageStyle = sessionStorage.getItem('signage.style');

    if (!signageSrc) {
      querySignageInfo();
    } else {
      setSource(signageSrc);
      // setStyle(signageStyle ?? "");
    }
  }, []);

  return (
    <div className="w-full h-full">
      <iframe
        allow="fullscreen"
        src={source}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
