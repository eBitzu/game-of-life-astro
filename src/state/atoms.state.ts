import { atom } from 'nanostores';

export const speedMs$ = atom(300);

export const nrOfIterations$ = atom(0);

export const isPlaying$ = atom(false);

export const togglePlaying = () => {
  isPlaying$.set(!isPlaying$.get());
}

export const life$ = atom<Map<string, boolean>>(new Map());
