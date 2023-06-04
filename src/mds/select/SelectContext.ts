import { createContext } from "react";

interface SelectState {
  open: boolean;
  value: string;
  setOpen: (open: boolean) => void;
  setValue: (value: string) => void;
}

export const SelectStateContext = createContext<SelectState>({
  open: false,
  value: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setValue: () => {}
});
