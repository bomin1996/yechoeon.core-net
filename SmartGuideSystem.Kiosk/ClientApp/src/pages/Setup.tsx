import DeviceContext from "src/contexts/DeviceContext";
import React, { useContext, useRef, useState } from "react";
import logo from "src/assets/jin_logo.svg";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import Hex from "crypto-js/enc-hex";

const engineerKey =
  "6A65669F1798A040FAA06A07D2031EC9BAA300C0EB8FED58BDEF12A7BA98DAFC"; // jinju
const engineerKey2 =
  "A5DCAD79575C9CB0B8472CB72B4A32744C5EEE8D068C3B29C75E6AF28C04E3C4"; // swoom
export default function Setup() {
  const deviceContext = useContext(DeviceContext);

  const handleSetDeviceId = () => {
    if (ref.current) {
      deviceContext?.setDeviceId(ref.current.value);
    }
  };

  const ref = useRef<HTMLInputElement>(null);

  const [inputDeviceId, setInputDeviceId] = useState("");
  const [inputEngineerCode, setInputEngineerCode] = useState("");
  const [errorText, setErrorText] = useState("");

  return (
    <div className="flex h-screen w-screen bg-[#231f20]">
      <div className="h-full m-auto  w-80 flex flex-col justify-center space-y-3 ">
        <div className="mb-1 flex items-center">
          <div className="flex flex-col ml-1 gap-2">
            <p className="text-2xl font-bold text-white">장비등록</p>
          </div>
        </div>

        <input
          value={inputDeviceId}
          onChange={(ev) => setInputDeviceId(ev.target.value)}
          className="h-8 rounded-md px-2 text-sm font-semibold"
          placeholder="장비아이디"
          type="text"
        />
        <input
          value={inputEngineerCode}
          onChange={(ev) => setInputEngineerCode(ev.target.value)}
          className="h-8 rounded-md px-2 text-sm font-semibold"
          placeholder="엔지니어코드"
          type="password"
        />

        <button
          className="btn-normal2 font-bold disabled:text-white/20"
          disabled={!inputDeviceId || !inputEngineerCode}
          onClick={() => {
            const input = Hex.stringify(
              sha256(inputEngineerCode)
            ).toUpperCase();
            console.log("engineer code:", input);
            if (input === engineerKey || input === engineerKey2) {
              deviceContext?.setDeviceId(inputDeviceId);
              window.location.replace("/");
            } else {
              setErrorText("EngineerCode is invalid");
            }
          }}
        >
          장비등록
        </button>

        <p className="h-[30px] text-red-500">{errorText}</p>

        <a
          className="absolute right-4 top-4 text-xl bg-blue-600 text-white px-6 py-3 rounded-lg"
          href="/api/kioskinfo/testdownload"
          download={true}
        >
          키오스크앱 다운받기(시험테스트중)
        </a>
      </div>
    </div>
  );
}
