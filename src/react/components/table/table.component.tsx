import { useEffect, type FC, type MouseEvent } from "react";
import { useGetArray } from "../../hooks";
import { loadLifeFromStorage } from "../../../utils/storage.util";
import { ControlsContainer } from "../../containers/controls.container";

import { useStore } from "@nanostores/react";
import { isPlaying$, life$, numberOfColumns$, togglePlaying } from "../../../state/atoms.state";
import { colMapper } from "./table.mapper";


export const GameContent: FC = () => {
  const array = useGetArray();
  const isPlaying = useStore(isPlaying$);
  const life = useStore(life$);
  const numberOfColumns = useStore(numberOfColumns$);
  const sizeOfCell = numberOfColumns < 50 ? 25 : 13;
  const widthOfContainer = sizeOfCell * numberOfColumns + 1;

  useEffect(() => {
    life$.set(loadLifeFromStorage());
  }, []);

  useEffect(() => {
    if (!life.size && isPlaying) {
      // everybody died
      togglePlaying();
    }
  }, [life]);

  const handleClick = (e: MouseEvent<HTMLTableCellElement>) => {
    if (isPlaying) {
      return;
    }
    const cell = e.currentTarget.dataset.cell ?? "";
    const newLife = new Map(life);
    if (newLife.has(cell)) {
      newLife.delete(cell);
    } else {
      newLife.set(cell, true);
    }
    life$.set(newLife);
  };

  const handleDrag = () => {
     // do something
  }

  return (
    <>
      <ControlsContainer />
      <div
        className="relative overflow-hidden mx-auto mt-2"
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
