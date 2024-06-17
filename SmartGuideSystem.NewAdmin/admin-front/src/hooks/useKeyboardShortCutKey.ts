import { useEffect, useRef, useState } from "react";

type ParamType = {
  callBackKey: (name: string) => void;
};
export default function useKeyboardShortCutKey({ callBackKey }: ParamType) {
  const divRefKeyEvent = useRef<HTMLDivElement>(null);
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.ctrlKey && (event.key === "z" || event.key === "Z")) {
      alert("Ctrl+Z");
      callBackKey("Ctrl+Z");
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [callBackKey]);
}
