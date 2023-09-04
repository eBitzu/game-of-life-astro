import { useEffect, useRef, useState } from "react";
import type { GameStateType } from "../../types/game.types";
import { useStore } from "@nanostores/react";
import { nrOfIterations$, speedMs$ } from "../../state/atoms.state";
import { numberOfColumns } from "../../constants/number.cols";

const getNeighbors = (row: number, col: number): Array<string> => [
  `${row - 1},${col - 1}`,
  `${row - 1},${col}`,
  `${row - 1},${col + 1}`,
  `${row},${col - 1}`,
  `${row},${col + 1}`,
  `${row + 1},${col - 1}`,
  `${row + 1},${col}`,
  `${row + 1},${col + 1}`,
];

const getAliveNeighborsCount = (
  i: number,
  j: number,
  oldState: GameStateType
) => getNeighbors(i, j).filter((val) => oldState.has(val)).length;

function calculateNextState(
  oldState: GameStateType
): GameStateType {
  // calculate life;
  const newState = new Map();
  for (let i = -1; i <= numberOfColumns + 1; i++) {
    for (let j = -1; j <= numberOfColumns + 1; j++) {
      const aliveNeighborsCount = getAliveNeighborsCount(i, j, oldState);
      const key = `${i},${j}`;
      if (
        aliveNeighborsCount === 3 ||
        (oldState.has(key) && aliveNeighborsCount === 2)
      ) {
        newState.set(key, true);
      }
    }
  }

  return newState;
}

export const useGetGameState = (start: boolean) => {
  const speed = useStore(speedMs$);
  const state = useState<GameStateType>(new Map([]));
  const int = useRef<number>();
  useEffect(() => {
    const [, setState] = state;
    if (start) {
      int.current = setInterval(() => {
        setState(calculateNextState);
        nrOfIterations$.set(nrOfIterations$.get() +1);
      }, speed);
    } else {
      if (int.current !== null) {
        clearInterval(int.current);
      }
    }

    return () => {
      if (int.current !== null) {
        clearInterval(int.current);
      }
    };
  }, [start, speed]);

  return state;
};
