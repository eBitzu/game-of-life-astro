import { atom } from 'nanostores';


// atom stores
export const speedMs$ = atom(300);

export const nrOfIterations$ = atom(0);

export const isPlaying$ = atom(false);

export const life$ = atom<Map<string, boolean>>(new Map());

export const numberOfColumns$ = atom(50);

// atom helpers
export const togglePlaying = () => {
  isPlaying$.set(!isPlaying$.get());
}
