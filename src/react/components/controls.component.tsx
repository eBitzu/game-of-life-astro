import type { FC } from "react";
import c from 'classnames';

type ControlsProps = {
  isPlaying: boolean;
  hasLife: boolean;
  onReset: () => void;
  onToggle: () => void;
};

export const Controls: FC<ControlsProps> = ({
  isPlaying,
  hasLife,
  onReset,
  onToggle,
}) => {
  return (
    <>
      <button
        type="button"
        className={c('rounded-lg bg-blue-300 p-3 mb-2 mr-1',{
          'bg-gray-400': !hasLife
        })}
        onClick={onToggle}
        disabled={!hasLife}
      >
        {isPlaying ? "Stop Simulation" : "Start Simulation"}
      </button>
      {!isPlaying && hasLife ? (
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg bg-blue-500 p-3 mb-2"
        >
          Reset Board
        </button>
      ) : null}
    </>
  );
};
