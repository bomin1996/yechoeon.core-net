import React, { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
interface Props {
  inputText: string;
  onChange: (inputText: string) => void;

  className?: string;
  placeholder?: string;
}
export default function SearchInput2({
  inputText,
  onChange,
  className,
  placeholder,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const visibleClearButton = inputText?.length > 0;
  return (
    <div
      className={` ${className} space-x-2 flex justify-between items-center text-sm font-medium bg-white text-black/90  h-8 px-2 py-2 rounded-[2px] group-focus:shadow outline outline-[#00b4bf]  `}
    >
      <input
        ref={inputRef}
        className="appearance-none outline-none flex-1"
        placeholder={placeholder}
        value={inputText}
        type="text"
        onChange={(ev) => {
          onChange(ev.target.value);
        }}
      />
      {visibleClearButton && (
        <XMarkIcon
          className="h-5 w-5 p-1 hover:opacity-75 active:scale-95 rounded-full bg-slate-200 flex-shrink-0"
          onClick={() => {
            onChange("");
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        />
      )}
      {/* <MagnifyingGlassIcon
        className="h-5 w-5 hover:opacity-75 active:scale-95  "
        onClick={() => {
          onChange("");
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      /> */}
    </div>
  );
}
