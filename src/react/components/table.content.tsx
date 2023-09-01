import type { FC } from "react";
import { useNumberOfCols } from "../../state/cols.state";
import { useGetGameState } from "../hooks/state.hook";
import c from "classnames";

export const TableContent: FC = () => {
  const { cols } = useNumberOfCols();
  const array = new Array(cols).fill(0).map((_el, index) => index);
  const life = useGetGameState();
  console.log('life', life);
  return array.map((row) => (
    <tr key={"row_" + row} data-row={row}>
      {array.map((col) => {
        const key = `cell_${row}_${col}`;
        const isActive = life.has(`${row},${col}`);
        return (
          <td
            key={key}
            data-cell={key}
            className={c("p-2 border border-gray-500", {
              "bg-black": isActive,
            })}
          />
        );
      })}
    </tr>
  ));
};
