import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import CircleIconButton from "../ui/buttons/CircleIconButton";
import searchIcon from "src/assets/fullrowmenu/search.svg";

interface Props {
  inputText: string;
  className?: string;
  onClickClear?: () => void;
}

export default function SearchInput({
  inputText,
  onClickClear,
  className = "",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`${className} text-accent-text text-[30px] font-bold flex flex-col justify-center`}
    >
      <div
        className={`rounded-full bg-[#f7f7f7] h-[51px] flex flex-row  justify-between items-center `}
      >
        <input
          ref={inputRef}
          type="text"
          readOnly={true}
          value={inputText}
          placeholder="초성,이름 입력"
          className="flex-1 text-center focus:outline-1 w-full ml-4 border-none bg-transparent outline-none"
        />
        {inputText !== "" && (
          <XMarkIcon
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.value = "";
              }
              if (onClickClear) {
                onClickClear();
              }
            }}
            className="stroke-accent-default  h-[42px] w-[42px] p-[8px] mr-[12px] active:scale-105 active:bg-white/5 bg-white/30 rounded-full"
          />
        )}
        <CircleIconButton
          className="bg-accent-default "
          icon={
            <img
              className="m-auto w-[35px] h-[35px]"
              width={35}
              height={35}
              src={searchIcon}
              alt=""
            />
          }
          isSelected={true}
        />
      </div>
    </div>
  );
}
