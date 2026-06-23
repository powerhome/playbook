import React from "react";
import { Pill, Detail, Flex, FlexItem } from "playbook-ui";

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
  if (presets.length === 0) return null;

  return (
    <Flex orientation="column" marginTop="lg" wrap>
      <FlexItem marginBottom="xs">
        <Detail text="Sample data" />
      </FlexItem>
      <FlexItem>
        <Flex gap="xs" wrap>
          {presets.map((preset) => (
            <div
              key={preset.key}
              onClick={() => onPresetChange(preset.key)}
              style={{ cursor: "pointer" }}
            >
              <Pill
                text={preset.label}
                variant={activeKey === preset.key ? "primary" : "neutral"}
                textTransform="none"
              />
            </div>
          ))}
        </Flex>
      </FlexItem>
    </Flex>
  );
};
