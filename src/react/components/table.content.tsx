import { useEffect, type FC, type MouseEvent } from "react";
import c from "classnames";
import { useGetArray, useGetGameState, useToggleState } from "../hooks";
import { Controls } from "./controls.component";
import { nrOfIterations$ } from "../../state/atoms.state";

type Context = {
  row: number;
  life: Map<string, boolean>;
  handleClick: (e: MouseEvent<HTMLTableCellElement>) => void;
};

function colMapper(this: Context, col: number) {
  const { row, life, handleClick } = this;
  const key = `cell_${row}_${col}`;
  const isActive = life.has(`${row},${col}`);
  return (
    <td
      key={key}
      role="button"
      onClick={handleClick}
      data-cell={`${row},${col}`}
      className={c("border p-1 border-gray-500 transition-colors ease-in-out delay-150", {
        "bg-black": isActive,
      })}
    />
  );
}

export const TableContent: FC = () => {
  const array = useGetArray();
  const [isPlaying, toggle] = useToggleState(false);
  const [life, setLife] = useGetGameState(isPlaying);

  useEffect(() => {
    if(!life.size && isPlaying) {
      // everybody died
      toggle();
    }
  }, [life]);

  const handleClick = (e: MouseEvent<HTMLTableCellElement>) => {
    if (isPlaying) {
      return;
    }
    const cell = e.currentTarget.dataset.cell || "";
    const newLife = new Map(life);
    if (newLife.has(cell)) {
      newLife.delete(cell);
    } else {
      newLife.set(cell, true);
    }
    setLife(newLife);
  };

  const handleToggle = () => {
    if(!isPlaying) {
      nrOfIterations$.set(0);
    }
    toggle();
  }

  const handleReset = () => {
    nrOfIterations$.set(0);
    setLife(new Map());
  };
  return (
    <>
      <Controls
        isPlaying={isPlaying}
        onReset={handleReset}
        onToggle={handleToggle}
        hasLife={!!life.size}
      />
      <table className="border-blue-800 border-solid border">
        <tbody>
          {array.map((row) => (
            <tr key={"row_" + row} data-row={row}>
              {array.map(
                colMapper.bind({ life, row, handleClick })
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
