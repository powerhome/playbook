import React from "react";
import { Pill, Caption, Card, Flex } from "playbook-ui";

export interface DataPresetOption {
  key: string;
  label: string;
}

interface DataPresetSelectorProps {
  presets: DataPresetOption[];
  activeKey: string | null;
  defaultLabel: string;
  onPresetChange: (key: string | null) => void;
}

export const DataPresetSelector: React.FC<DataPresetSelectorProps> = ({
  presets,
  activeKey,
  defaultLabel,
  onPresetChange,
}) => {
  if (presets.length === 0) return null;

  return (
    <Card marginBottom="md" padding="sm" width="100%">
      <Flex alignItems="center" justifyContent="center" gap="sm" wrap>
        <Caption text="Sample data:" color="lighter" />
        <div
          onClick={() => onPresetChange(null)}
          style={{ cursor: "pointer" }}
        >
          <Pill
            text={defaultLabel}
            variant={activeKey === null ? "primary" : "neutral"}
          />
        </div>
        {presets.map((preset) => (
          <div
            key={preset.key}
            onClick={() => onPresetChange(preset.key)}
            style={{ cursor: "pointer" }}
          >
            <Pill
              text={preset.label}
              variant={activeKey === preset.key ? "primary" : "neutral"}
            />
          </div>
        ))}
      </Flex>
    </Card>
  );
};
