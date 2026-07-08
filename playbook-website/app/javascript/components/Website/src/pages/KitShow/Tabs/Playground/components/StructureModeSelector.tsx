import React, { useMemo } from "react";
import { PlaygroundPillSelector } from "./PlaygroundPillSelector";

interface StructureMode {
  key: string;
  label: string;
}

interface StructureModeSelectorProps {
  modes: StructureMode[];
  activeMode: string | null;
  onModeChange: (modeKey: string) => void;
}

export const StructureModeSelector: React.FC<StructureModeSelectorProps> = ({
  modes,
  activeMode,
  onModeChange,
}) => {
  const options = useMemo(
    () => modes.map((mode) => ({ key: mode.key, label: mode.label })),
    [modes],
  );

  return (
    <PlaygroundPillSelector
      activeKey={activeMode}
      label="Structure"
      onSelect={onModeChange}
      options={options}
    />
  );
};
