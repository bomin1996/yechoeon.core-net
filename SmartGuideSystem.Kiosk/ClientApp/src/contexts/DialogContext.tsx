import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";
export interface IDialogContextData {
  onClose: () => void;
  setDialog: (dialog: ReactNode) => void;
  pushDialog: (dialog: ReactNode) => void;
  popDialog: () => void;
  popAllDialogs: () => void;
}
const DialogContext = createContext<IDialogContextData | null>(null);

export default DialogContext;
interface Props extends PropsWithChildren {}

export function DialogProvider({ children }: Props) {
  const [Dialogs, setDialogs] = useState<Array<ReactNode>>([]);

  const [DialogComponent, setDialogComponent] = useState<ReactNode>();
  const handleOnClose = () => {
    setDialogComponent(undefined);
  };
  return (
    <DialogContext.Provider
      value={{
        onClose: handleOnClose,
        setDialog: setDialogComponent,
        pushDialog: (dlg) => {
          Dialogs.push(dlg);
          //captured Dialogs
          setDialogs([...Dialogs]);
        },
        popDialog: () => {
          Dialogs.pop();
          //captured Dialogs
          setDialogs([...Dialogs]);
        },
        popAllDialogs: () => {
          Dialogs.splice(0, Dialogs.length);
          setDialogs([]);
        },
      }}
    >
      <>
        {children}
        {Dialogs}
        {DialogComponent}
      </>
    </DialogContext.Provider>
  );
}
