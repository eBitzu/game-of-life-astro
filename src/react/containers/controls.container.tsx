import { useStore } from "@nanostores/react";
import { STORAGE_KEY } from "../../constants/storage.const";
import {
  isPlaying$,
  life$,
  nrOfIterations$,
  togglePlaying,
} from "../../state/atoms.state";
import { Controls } from "../components";
import { loadLifeFromStorage } from "../../utils/storage.util";

export const ControlsContainer = () => {
  const isPlaying = useStore(isPlaying$);
  const life = useStore(life$);

  const handleToggle = () => {
    if (!isPlaying) {
      nrOfIterations$.set(0);
    }
    togglePlaying();
  };

  const handleReset = () => {
    nrOfIterations$.set(0);
    life$.set(new Map());
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, [...life.keys()].join(";"));
  };

  const handleOnLoad = () => {
    life$.set(loadLifeFromStorage());
  };
  return (
    <Controls
      isPlaying={isPlaying}
      onReset={handleReset}
      onLoad={handleOnLoad}
      onToggle={handleToggle}
      onSave={handleSave}
      hasLife={!!life.size}
    />
  );
};
