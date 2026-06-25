import React, { useMemo } from "react";
import { PlaygroundPillSelector } from "./PlaygroundPillSelector";

export interface DataPresetOption {
  key: string;
  label: string;
}

interface DataPresetSelectorProps {
  presets: DataPresetOption[];
  activeKey: string | null;
  onPresetChange: (key: string | null) => void;
}

export const DataPresetSelector: React.FC<DataPresetSelectorProps> = ({
  presets,
  activeKey,
  onPresetChange,
}) => {
  const options = useMemo(
    () => presets.map((preset) => ({ key: preset.key, label: preset.label })),
    [presets],
  );

  return (
    <PlaygroundPillSelector
      activeKey={activeKey}
      label="Sample data"
      onSelect={onPresetChange}
      options={options}
    />
  );
};
