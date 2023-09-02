import { useStore } from "@nanostores/react";
import { numberOfCols } from "../../state/cols.state";
import { useMemo } from "react";

export const useGetArray = () => {
  const cols = useStore(numberOfCols);
  return useMemo(() => new Array(cols).fill(0).map((_el, index) => index), [cols]);
}
