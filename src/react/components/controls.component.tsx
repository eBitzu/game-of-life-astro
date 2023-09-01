import type { FC } from "react";

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
        className="rounded-lg bg-blue-300 p-3 mb-2 mr-1"
        onClick={onToggle}
      >
        {isPlaying ? "Stop" : "Start"}
      </button>
      {!isPlaying && hasLife ? (
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg bg-blue-500 p-3 mb-2"
        >
          Reset
        </button>
      ) : null}
    </>
  );
};
