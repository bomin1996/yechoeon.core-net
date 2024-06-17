import { createContext, PropsWithChildren } from "react";

interface IContextData {
  isClicked: boolean;
}

const FirstClickContext = createContext<IContextData | null>(null);

interface Props extends PropsWithChildren {
  isClicked: boolean;
}

export function FirstClickProvider({ children, isClicked }: Props) {
  return (
    <FirstClickContext.Provider
      value={{
        isClicked: isClicked,
      }}
    >
      {children}
    </FirstClickContext.Provider>
  );
}

export default FirstClickContext;
