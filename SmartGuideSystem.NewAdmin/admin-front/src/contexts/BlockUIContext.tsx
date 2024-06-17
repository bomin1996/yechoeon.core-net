import React, { createContext, PropsWithChildren, useState } from "react";

export interface IBlockUIContextData {
  isBlock: boolean;
  setBlock: (isBlock: boolean) => void;
  runWithBlock: (action: () => void) => void;
}
const BlockUIContext = createContext<IBlockUIContextData | null>(null);

export default BlockUIContext;
interface Props extends PropsWithChildren {}

export function BlockUIProvider({ children }: Props) {
  const [isBlock, setIsBlock] = useState<boolean>(false);

  const handleRunWithBlock = (action: () => void) => {
    try {
      setIsBlock(true);
      action();
    } finally {
      setIsBlock(false);
    }
  };

  return (
    <BlockUIContext.Provider
      value={{
        isBlock: isBlock,
        setBlock: setIsBlock,
        runWithBlock: handleRunWithBlock,
      }}
    >
      <>
        {/* {isBlock && <BlockUI />} */}
        <BlockUI
          className={`transition-opacity pointer-events-none ${
            isBlock ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* <BlockUI
          className={`${isBlock ? "" : "opacity-0 pointer-events-none"}`}
        /> */}
        {children}

        {/* <div
          className={`flex fixed z-50 left-0 top-0 w-screen h-screen duration-300 bg-black/25 transition-opacity ${
            visibleSpinner ? "" : "opacity-0 pointer-events-none"
          }`}
        >
          <Spinner
            className="m-auto"
            size="huge"
            label="응답을 기다리는 중입니다..."
          />
        </div> */}
      </>
    </BlockUIContext.Provider>
  );
}

function BlockUI({ className }: { className?: string }) {
  return (
    <div
      style={{
        zIndex: 50000,
      }}
      className={`${className} fixed w-screen h-screen bg-black/50 select-none flex`}
    >
      <svg
        className="animate-spin m-auto h-10 w-10 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}
