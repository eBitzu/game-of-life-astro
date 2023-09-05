import { useEffect, type FC, type MouseEvent } from "react";
import c from "classnames";
import { useGetArray, useGetGameState, useToggleState } from "../../hooks";
import { loadLifeFromStorage } from "../../../utils/storage.util";
import { ControlsContainer } from "../../containers/controls.container";
import { numberOfColumns } from "../../../constants/number.cols";

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

const sizeOfCell = 13;
const widthOfContainer = sizeOfCell * numberOfColumns + 1;
export const TableContent: FC = () => {
  const array = useGetArray();
  const [isPlaying, toggle] = useToggleState(false);
  const [life, setLife] = useGetGameState();

  useEffect(() => {
    setLife(loadLifeFromStorage());
  }, []);

  useEffect(() => {
    if (!life.size && isPlaying) {
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

  const handleDrag = (e: any) => {
  console.log('a', e);
  }

  return (
    <>
      <ControlsContainer />
      <div
        className="relative overflow-hidden"
        style={{
          width: widthOfContainer,
          height: widthOfContainer,
        }}
      >
        <table
          className="border-blue-800 border-solid border absolute"
          onDrag={handleDrag}
          style={{
            left: -widthOfContainer / 2,
            top: -widthOfContainer / 2,
          }}
        >
          <tbody>
            {array.map((row) => (
              <tr key={"row_" + row} data-row={row}>
                {array.map(colMapper.bind({ life, row, handleClick }))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
