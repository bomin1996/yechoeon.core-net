import React, { ReactNode, useEffect, useState } from "react";
import * as Hangul from "hangul-js";

const HanguleList = [
  { keyName: "ㄱ" },
  { keyName: "ㄲ" },
  { keyName: "ㄴ" },
  { keyName: "ㄷ" },
  { keyName: "ㄸ" },
  { keyName: "ㄹ" },
  { keyName: "ㅁ" },
  { keyName: "ㅂ" },
  { keyName: "ㅃ" },
  { keyName: "ㅅ" },
  { keyName: "ㅆ" },
  { keyName: "ㅇ" },
  { keyName: "ㅈ" },
  { keyName: "ㅉ" },
  { keyName: "ㅊ" },
  { keyName: "ㅋ" },
  { keyName: "ㅌ" },
  { keyName: "ㅍ" },
  { keyName: "ㅎ" },
  { keyName: " " },
  { keyName: "ㅏ" },
  { keyName: "ㅑ" },
  { keyName: "ㅓ" },
  { keyName: "ㅕ" },
  { keyName: "ㅗ" },
  { keyName: "ㅛ" },
  { keyName: "ㅜ" },
  { keyName: "ㅠ" },
  { keyName: "ㅡ" },
  { keyName: "ㅣ" },
  { keyName: "ㅐ" },
  { keyName: "ㅒ" },
  { keyName: "ㅔ" },
  { keyName: "ㅖ" },
];

const EngNumberList = [
  // { keyName: "0" },
  { keyName: "a" },
  { keyName: "b" },
  { keyName: "c" },
  { keyName: "d" },
  { keyName: "e" },
  { keyName: "f" },
  { keyName: "g" },
  { keyName: "h" },
  { keyName: "i" },
  { keyName: "j" },
  { keyName: "k" },
  { keyName: "l" },
  { keyName: "m" },
  { keyName: "n" },
  { keyName: "o" },
  { keyName: "p" },
  { keyName: "q" },
  { keyName: "r" },
  { keyName: "s" },
  { keyName: "t" },
  { keyName: "u" },
  { keyName: "v" },
  { keyName: "w" },
  { keyName: "x" },
  { keyName: "y" },
  { keyName: "z" },
  { keyName: "1" },
  { keyName: "2" },
  { keyName: "3" },
  { keyName: "4" },
  { keyName: "5" },
  { keyName: "6" },
  { keyName: "7" },
  { keyName: "8" },
  { keyName: "9" },
];

interface Props {
  className?: string;
  inputText: string;
  onChangedInputText: (input: string) => void;
}

export default function SquareKeyboard({
  className,
  inputText,
  onChangedInputText,
}: Props) {
  const [inputChars, setInputChars] = useState<string[]>([]);
  const [keys, setKeys] = useState(HanguleList);
  const [keyMode, setKeyMode] = useState("korean");

  useEffect(() => {
    const initChars = Hangul.disassemble(inputText);
    setInputChars(initChars);
  }, [inputText]);

  const handleClickKeypad = (keyValue: string) => {
    if (keyValue === "X") {
      setInputChars([]);
      onChangedInputText("");
    } else {
      const newInputs = [...inputChars];
      let choTemp = "";
      if (keyValue === "<") {
        newInputs.pop();
      } else {
        newInputs.push(keyValue);
      }

      for (let i = newInputs.length - 2; i >= 0; i--) {
        const kv0 = newInputs[i];
        const kv1 = newInputs[i + 1];
        if (Hangul.isCho(kv0) && Hangul.isCho(kv1)) {
          choTemp = kv1 + choTemp;
          newInputs.pop();
        } else {
          break;
        }
      }

      setInputChars(newInputs);
      const text = Hangul.assemble(newInputs);
      //className = "h-[70px] rounded-[15px] text-[30px]";
      onChangedInputText(text + choTemp);
    }
  };

  const engNumberList = EngNumberList.map((it) => {
    return { keyName: it.keyName.toLowerCase() };
  });

  const handleToggleMode = () => {
    // if (keyMode === "korean") {
    //   setKeyMode("english");
    //   setKeys(engNumberList);
    // } else if (keyMode === "english") {
    //   setKeyMode("English");
    //   setKeys(EngNumberList);
    // } else if (keyMode === "English") {
    //   setKeyMode("korean");
    //   setKeys(HanguleList);
    // }

    if (keyMode === "korean") {
      setKeyMode("english");
      setKeys(engNumberList);
    } else {
      setKeyMode("korean");
      setKeys(HanguleList);
    }
  };

  let switchKeyLabel = "abc123";
  if (keyMode === "korean") {
    switchKeyLabel = "abc123";
  } else if (keyMode === "english") {
    switchKeyLabel = "ABC123";
  } else if (keyMode === "English") {
    switchKeyLabel = "한글";
  }

  return (
    <div className={`${className} flex flex-col gap-[6px] `}>
      <div className={` grid grid-cols-5 gap-[9px] justify-items-stretch`}>
        <div className="grid grid-cols-3 col-span-5 gap-[11px]  justify-items-stretch">
          <KeyPadItem
            className="h-[70px] w-full rounded-[15px] text-[30px] px-[20px] "
            keyValue="abc123"
            onClickItem={() => handleToggleMode()}
          />

          <KeyPadItem
            keyValue=""
            icon={
              <svg
                className="fill-accent-text active:fill-white h-[96px] w-[48px]"
                height="40"
                viewBox="0 96 960 960"
                width="40"
              >
                <path d="M160 696V456h66.666v173.334h506.668V456H800v240H160Z" />
              </svg>
            }
            className="h-[70px] w-full col-span-1 rounded-[15px] text-[30px]"
            onClickItem={() => handleClickKeypad(" ")}
          />

          <KeyPadItem
            keyValue=""
            className="h-[70px] w-full col-span-1 rounded-[15px] text-[30px]  px-[20px]"
            onClickItem={() => handleClickKeypad("<")}
            icon={
              <svg
                className="fill-accent-text active:fill-white h-[48px] w-[48px]"
                height="24"
                viewBox="0 96 960 960"
                width="24"
              >
                <path d="m456 736 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56ZM120 576l174-246q11-16 28.5-25t37.5-9h400q33 0 56.5 23.5T840 376v400q0 33-23.5 56.5T760 856H360q-20 0-37.5-9T294 822L120 576Zm98 0 142 200h400V376H360L218 576Zm542 0V376v400-200Z" />
              </svg>
            }
          />
        </div>

        {keys.map((keyItem) => (
          <KeyPadItem
            onClickItem={handleClickKeypad}
            key={keyItem.keyName}
            keyValue={keyItem.keyName}
          />
        ))}
      </div>
    </div>
  );
}

interface PadProps {
  keyValue: string;
  onClickItem: (keyValue: string) => void;
  className?: string;
  icon?: ReactNode;
}
const KeyPadItem: React.FC<PadProps> = ({
  keyValue,
  onClickItem,
  className = "w-[80px] h-[70px]",
  icon,
}) => (
  <div
    onClick={() => onClickItem(keyValue)}
    className={`${className} bg-accent-second active:bg-accent-default text-accent-text active:text-white  cursor-pointer rounded-[15px] flex justify-center items-center font-bold active:selected  text-[30px] `}
  >
    {icon !== undefined ? icon : <span className="m-auto">{keyValue}</span>}
  </div>

  // <SecondaryNormalButton
  //   className=" w-[80px] h-[70px] rounded-[15px] text-[30px] "
  //   title={keyValue}
  //   onClick={() => onClickItem(keyValue)}
  // />
);
