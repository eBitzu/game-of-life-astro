import { useEffect, useRef, useState } from "react";
import type { GameStateType } from "../../types/game.types";

export const useGetGameState = (start: boolean) => {
  const state = useState<GameStateType>(new Map([]));
  const int = useRef<number>();
  useEffect(() => {
    if (start) {
      int.current = setInterval(() => {
        state[1](() => {
          const map = new Map([["1,2", true]]);
          return map;
        });
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
