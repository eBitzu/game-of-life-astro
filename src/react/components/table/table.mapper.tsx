import type { MouseEvent } from "react";
import c from "classnames";

type Context = {
  row: number;
  life: Map<string, boolean>;
  handleClick: (e: MouseEvent<HTMLTableCellElement>) => void;
};

export function colMapper(this: Context, col: number) {
  const { row, life, handleClick } = this;
  const key = `cell_${row}_${col}`;
  const isActive = life.has(`${row},${col}`);
  return (
    <td
      draggable
      key={key}
      role="button"
      onClick={handleClick}
      data-cell={`${row},${col}`}
      className={c(
        "border p-1.5 border-gray-500 transition-colors ease-in-out delay-50",
        {
          "bg-black": isActive,
        }
      )}
    />
  );
}
