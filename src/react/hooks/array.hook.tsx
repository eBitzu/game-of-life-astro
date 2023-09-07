import { useStore } from "@nanostores/react";
import { useMemo } from "react";
import { numberOfColumns$ } from "../../state/atoms.state";


export const useGetArray = () => {
  const numberOfColumns = useStore(numberOfColumns$);
  return useMemo(
    () => new Array(numberOfColumns * 2).fill(0).map((_el, index) => index - numberOfColumns/2),
    [numberOfColumns]
  );
};
