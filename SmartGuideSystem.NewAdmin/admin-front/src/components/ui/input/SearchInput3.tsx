import React, { useRef } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
interface Props {
  inputText: string;
  onChange: (inputText: string) => void;

  className?: string;
  placeholder?: string;
}
export default function SearchInput3({
  inputText,
  onChange,
  className,
  placeholder,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const visibleClearButton = inputText?.length > 0;
  return (
    <div
      className={` ${className} pl-[8px] pr-[32px] text-[13px] font-[500] bg-[#716969] text-white h-[34px] py-2 rounded-[3px] group-focus:shadow  `}
    >
      <input
        ref={inputRef}
        className="appearance-none outline-none w-full bg-transparent"
        placeholder={placeholder}
        value={inputText}
        type="text"
        onChange={(ev) => {
          onChange(ev.target.value);
        }}
      />
      {visibleClearButton && (
        <XMarkIcon
          className="h-5 w-5 p-1 hover:opacity-75 active:scale-95 rounded-full bg-white/25 absolute top-[50%] translate-y-[-50%] right-[32px]"
          onClick={() => {
            onChange("");
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        />
      )}
      <MagnifyingGlassIcon
        className="h-6 w-6 p-1 hover:opacity-75 active:scale-95 absolute top-[50%] translate-y-[-50%] right-[4px]"
        onClick={() => {
          onChange("");
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      />
    </div>
  );
}
