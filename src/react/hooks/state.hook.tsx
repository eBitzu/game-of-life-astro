import { useEffect, useState } from 'react';
import type { GameStateType } from '../../types/game.types';

export const useGetGameState = () => {
  const [state, setState] = useState<GameStateType>(new Map([]));

  useEffect(() => {
    const int = setInterval(() => {
      setState(() => {
        const map = new Map([['1,2', true]]);
        return map;
      });
    }, 500)

    return () => {
      if(int !== null) {
        clearInterval(int);
      }
    }
  }, [])

  return state;
}
