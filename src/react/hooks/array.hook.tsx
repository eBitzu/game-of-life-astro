import { useMemo } from "react";
import { numberOfColumns } from "../../constants/number.cols";

export const useGetArray = () => {
  return useMemo(
    () => new Array(numberOfColumns * 2).fill(0).map((_el, index) => index - numberOfColumns/2),
    []
  );
};
