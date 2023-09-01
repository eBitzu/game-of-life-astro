import { useReducer } from "react";

export const useToggleState = (initValue: boolean) =>
  useReducer((old) => !old, initValue);
