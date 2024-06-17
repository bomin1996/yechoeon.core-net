import React, { useRef } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
interface Props {
  inputText: string;
  onChange: (inputText: string) => void;

  className?: string;
  placeholder?: string;
}
export default function SearchInput({
  inputText,
  onChange,
  className,
  placeholder,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`gap-2 flex justify-between items-center text-sm font-medium bg-white text-black/90 mr-10 h-8 w-80 px-2 py-2 rounded-md group-focus:shadow outline outline-green-500/50 group-focus:focus:outline ${className}`}
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
      {inputText && (
        <XCircleIcon
          className="h-5 w-5 hover:opacity-75 active:scale-95  "
          onClick={() => {
            onChange("");
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        />
      )}
    </div>
  );
}
