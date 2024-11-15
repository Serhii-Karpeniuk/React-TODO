import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

const defaultState = {
  open: false,
  content: "",
};

interface DialogProviderContextProps {
  dialogState: DialogStateInterface;
  setDialogState: Dispatch<SetStateAction<DialogStateInterface>>;
}

interface DialogStateInterface {
  open: boolean;
  content: ReactNode;
}

export const DialogContext = createContext<DialogProviderContextProps>({
  dialogState: defaultState,
  setDialogState: () => {},
});

const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialogState, setDialogState] = useState<DialogStateInterface>({
    open: false,
    content: "",
  });
  return (
    <DialogContext.Provider value={{ dialogState, setDialogState }}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
