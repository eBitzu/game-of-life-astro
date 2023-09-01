import { type FC, type MouseEvent } from "react";
import { useStore } from "@nanostores/react";
import { useGetGameState } from "../hooks/state.hook";
import c from "classnames";
import { numberOfCols } from "../../state/cols.state";
import { useToggleState } from "../hooks/toggle.hook";
import { Controls } from "./controls.component";

type Context = {
  row: number;
  life: Map<string, boolean>;
  cols: number;
  handleClick: (e: MouseEvent<HTMLTableCellElement>) => void;
};

function colMapper(this: Context, col: number) {
  const { row, life, cols, handleClick } = this;
  const key = `cell_${row}_${col}`;
  const isActive = life.has(`${row},${col}`);
  return (
    <td
      key={key}
      role="button"
      onClick={handleClick}
      data-cell={`${row},${col}`}
      className={c("border border-gray-500", {
        "bg-black": isActive,
        "p-1": cols > 25,
        "p-3": cols <= 25,
      })}
    />
  );
}

export const TableContent: FC = () => {
  const cols = useStore(numberOfCols);
  const array = new Array(cols).fill(0).map((_el, index) => index);
  const [isPlaying, toggle] = useToggleState(false);
  const [life, setLife] = useGetGameState(isPlaying);

  const handleClick = (e: MouseEvent<HTMLTableCellElement>) => {
    const cell = e.currentTarget.dataset.cell || "";
    const newLife = new Map(life);
    if (newLife.has(cell)) {
      newLife.delete(cell);
    } else {
      newLife.set(cell, true);
    }
    setLife(newLife);
  };

  const handleReset = () => {
    setLife(new Map());
  };
  return (
    <>
      <Controls
        isPlaying={isPlaying}
        onReset={handleReset}
        onToggle={toggle}
        hasLife={!!life.size}
      />
      <table className="border-blue-800 border-solid border">
        <tbody>
          {array.map((row) => (
            <tr key={"row_" + row} data-row={row}>
              {array.map(colMapper.bind({ life, row, cols, handleClick }))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
