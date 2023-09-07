import { useEffect, useRef } from "react";
import type { GameStateType } from "../../types/game.types";
import { useStore } from "@nanostores/react";
import {
  isPlaying$,
  life$,
  nrOfIterations$,
  numberOfColumns$,
  speedMs$,
} from "../../state/atoms.state";

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
  cols: number,
  oldState: GameStateType
): GameStateType {
  // calculate life;
  const newState = new Map();
  for (let i = -1; i <= cols + 1; i++) {
    for (let j = -1; j <= cols + 1; j++) {
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

export const useGetGameState = () => {
  const start = useStore(isPlaying$);
  const speed = useStore(speedMs$);
  const cols = useStore(numberOfColumns$);
  const int = useRef<number>();

  useEffect(() => {
    const newCols = window.matchMedia("only screen and (max-width: 480px)")
      .matches
      ? 20
      : 50;
    numberOfColumns$.set(newCols);
  }, []);

  useEffect(() => {
    if (start) {
      int.current = setInterval(() => {
        const newState = calculateNextState(cols, life$.get());
        life$.set(newState);
        nrOfIterations$.set(nrOfIterations$.get() + 1);
      }, speed);
    } else if (int.current !== null) {
      clearInterval(int.current);
    }

    return () => {
      if (int.current !== null) {
        clearInterval(int.current);
      }
    };
  }, [start, speed]);
};
