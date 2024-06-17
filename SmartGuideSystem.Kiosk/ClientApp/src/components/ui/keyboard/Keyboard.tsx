import React, { useState } from "react";
import PropTypes from "prop-types";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

// const KeyList = [
//     {keyName:"ㄱ"},{keyName:"ㄲ"},{keyName:"ㄴ"},{keyName:"ㄷ"},{keyName:"ㄸ"},
//     {keyName:"ㄹ"},{keyName:"ㅁ"},{keyName:"ㅂ"},{keyName:"ㅃ"},{keyName:"ㅅ"},
//     {keyName:"ㅆ"},{keyName:"ㅇ"},{keyName:"ㅈ"},{keyName:"ㅉ"},{keyName:"ㅊ"},
//     {keyName:"ㅋ"},{keyName:"ㅌ"},{keyName:"ㅍ"},{keyName:"ㅎ"},{keyName:" "},
//     {keyName:"ㅏ"},{keyName:"ㅑ"},{keyName:"ㅓ"},{keyName:"ㅕ"},{keyName:"ㅗ"},
//     {keyName:"ㅛ"},{keyName:"ㅜ"},{keyName:"ㅠ"},{keyName:"ㅡ"},{keyName:"ㅣ"},
//     {keyName:"ㅐ"},{keyName:"ㅒ"},{keyName:"ㅔ"},{keyName:"ㅖ"},{keyName:" "},
// ];

const KeyList = [
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
  { keyName: " " },
];

interface KeybordItemType {
  keyName: string;
  keyValue: string | null;
}

// interface KeyboardProps {
//   inputText: string;
//   onClick: (key: string) => void | null;
// }

interface KeyboardProps {
  keyName: string;
  // inputText: string;
  onClick: (key: string) => void | null;
  onRemove: () => void;
}

const KeyItem: React.FC<KeyboardProps> = (props) => {
  console.log(props.keyName);
  return (
    <button
      onClick={() => props.onClick(props.keyName)}
      className="rounded hover:bg-white hover:text-[#1b2224] w-full h-full text-white font-bold bg-[#1b2224]"
    >
      {props.keyName}
    </button>
  );
};

const RemoveKeyItem: React.FC<KeyboardProps> = (props) => {
  console.log(props.keyName);
  return (
    <button
      onClick={() => props.onRemove()}
      className="rounded-sm hover:bg-white hover:text-[#1b2224] w-full h-full text-white font-bold bg-[#1b2224]"
    >
      {props.keyName}
    </button>
  );
};

const SpaceKeyItem: React.FC<KeyboardProps> = (props) => {
  console.log(props.keyName);
  return (
    <button
      onClick={() => props.onClick(props.keyName)}
      className="
      rounded-sm hover:bg-white hover:text-[#1b2224] w-full h-full text-white font-bold bg-[#1b2224]"
    >
      <ArrowSmallRightIcon className="w-8 h-8" />
    </button>
  );
};

const Keyboard: React.FC<KeyboardProps> = ({ keyName, onClick }) => {
  //const [searchText, SetSearchText] = useState("a");

  const handleClick = (title: string) => {
    //const strSearchText = searchText + title;
    //console.log("strSearchText : ", strSearchText);
    //SetSearchText(strSearchText);
    //props.onClick(title);
    //onClick(title);
    const finalText = keyName + title;
    onClick(finalText);
  };

  const handleRemove = () => {
    //SetSearchText("");
    const finalText = "";
    onClick(finalText);
  };

  return (
    <div className="w-[410px]">
      {/* <h1 className="flex justify-center items-center text-white rounded-xl border-2 border-white border-opacity-30 h-[66px] text-justify w-full">
        {searchText}
      </h1> */}

      <div className="grid grid-cols-3 gap-0.5 mt-2 h-[70px]">
        <div>
          <KeyItem keyName="abc123" onClick={handleClick} onRemove={() => {}} />
        </div>
        <div>
          <SpaceKeyItem
            keyName="  "
            onClick={handleClick}
            onRemove={() => {}}
          />
        </div>
        <div>
          <RemoveKeyItem
            keyName="지우기"
            onRemove={handleRemove}
            onClick={() => {
              console.log();
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-0.5 mt-2">
        {KeyList.map((i) => (
          <div className="w-[80px] h-[70px] " key={i.keyName}>
            <KeyItem
              keyName={i.keyName}
              onClick={handleClick}
              onRemove={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
