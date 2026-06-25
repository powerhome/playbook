import React, { useMemo } from "react";
import { PlaygroundPreset } from "../types";
import { PlaygroundPillSelector } from "./PlaygroundPillSelector";

interface PresetsBarProps {
  presets: PlaygroundPreset[];
  activePresetIndex: number | null;
  onPresetClick: (index: number) => void;
}

export const PresetsBar: React.FC<PresetsBarProps> = ({
  presets,
  activePresetIndex,
  onPresetClick,
}) => {
  const options = useMemo(
    () =>
      presets.map((preset, index) => ({
        key: String(index),
        label: preset.name,
      })),
    [presets],
  );

  if (!presets || presets.length === 0) return null;

  return (
    <PlaygroundPillSelector
      activeKey={activePresetIndex == null ? null : String(activePresetIndex)}
      label="Presets"
      marginTop="md"
      onSelect={(key) => onPresetClick(Number(key))}
      options={options}
    />
  );
};
