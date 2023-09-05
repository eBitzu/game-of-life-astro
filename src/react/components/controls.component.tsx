import { createElement, type FC } from "react";
import c from "classnames";
import { Button } from "./button/button.component";
import { loadLifeFromStorage } from "../../utils/storage.util";

type ControlsProps = {
  isPlaying: boolean;
  hasLife: boolean;
  onReset: () => void;
  onLoad: () => void;
  onSave: () => void;
  onToggle: () => void;
};

const ControlsInternal: FC<Omit<ControlsProps, "isPlaying" | "onToggle">> = ({
  hasLife,
  onReset,
  onSave,
  onLoad,
}) => {
  const hasStorage = loadLifeFromStorage().size > 1;
  return hasLife ? (
    <>
      <Button onClick={onReset}>Reset Board</Button>
      <Button onClick={onSave}>Save to storage</Button>
    </>
  ) : (
    hasStorage && <Button onClick={onLoad}>Load from storage</Button>
  );
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
    <Button
      className={c({
        "bg-gray-400": !hasLife,
      })}
      onClick={onToggle}
      disabled={!hasLife}
    >
      {isPlaying ? "Stop Simulation" : "Start Simulation"}
    </Button>
    {isPlaying
      ? null
      : createElement(ControlsInternal, { onSave, onReset, onLoad, hasLife })}
  </div>
);
