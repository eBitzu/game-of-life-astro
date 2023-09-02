import { useEffect, useRef, useState } from "react";
import type { GameStateType } from "../../types/game.types";
import { useStore } from "@nanostores/react";
import { numberOfCols } from "../../state/cols.state";

const getNeighbors = (row: number, col: number): Array<string> =>
  ([
    `${row - 1},${col - 1}`,
    `${row - 1},${col}`,
    `${row - 1},${col + 1}`,
    `${row},${col - 1}`,
    `${row},${col + 1}`,
    `${row + 1},${col - 1}`,
    `${row + 1},${col}`,
    `${row + 1},${col + 1}`,
  ])

const getAliveNeighborsCount = (
  i: number,
  j: number,
  oldState: GameStateType
) => getNeighbors(i, j).filter((val) => oldState.has(val)).length;

function calculateNextState(
  this: number,
  oldState: GameStateType
): GameStateType {
  // calculate life;
  const cols = this;
  const newState = new Map();
  for (let i = 0; i < cols + 1; i++) {
    for (let j = 0; j < cols + 1; j++) {
      const aliveNeighborsCount = getAliveNeighborsCount(i, j, oldState);
      const key =`${i},${j}`;
      if(oldState.has(key)) {
        if(aliveNeighborsCount === 2 || aliveNeighborsCount === 3) {
          newState.set(key, true)
        }
      } else {
        if(aliveNeighborsCount === 3) {
          newState.set(key, true);
        }
      }
    }
  }

  return newState;
}

export const useGetGameState = (start: boolean) => {
  const cols = useStore(numberOfCols);
  const state = useState<GameStateType>(new Map([]));
  const int = useRef<number>();
  useEffect(() => {
    const [, setState] = state;
    if (start) {
      int.current = setInterval(() => {
        setState(calculateNextState.bind(cols));
      }, 500);
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
  }, [start]);

  return state;
};
