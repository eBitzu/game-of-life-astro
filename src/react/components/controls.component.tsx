import type { FC } from "react";
import c from "classnames";

type ControlsProps = {
  isPlaying: boolean;
  hasLife: boolean;
  onReset: () => void;
  onLoad: () => void;
  onSave: () => void;
  onToggle: () => void;
};

export const Controls: FC<ControlsProps> = ({
  isPlaying,
  hasLife,
  onReset,
  onLoad,
  onSave,
  onToggle,
}) => (
  <div className="gap-2 flex">
    <button
      type="button"
      className={c("rounded-lg bg-blue-300 p-3 mb-2", {
        "bg-gray-400": !hasLife,
      })}
      onClick={onToggle}
      disabled={!hasLife}
    >
      {isPlaying ? "Stop Simulation" : "Start Simulation"}
    </button>
    {!isPlaying ? (
      hasLife ? (
        <>
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg bg-blue-500 p-3 mb-2"
          >
            Reset Board
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-blue-500 p-3 mb-2"
          >
            Save to storage
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={onLoad}
            className="rounded-lg bg-blue-500 p-3 mb-2"
          >
            Load from storage
          </button>
        </>
      )
    ) : null}
  </div>
);
