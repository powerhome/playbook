import React from "react";
import { Pill, Caption, Card, Flex } from "playbook-ui";
import { PlaygroundPreset } from "../types";

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
  if (!presets || presets.length === 0) return null;

  return (
    <Card marginBottom="md" padding="sm" width="100%">
      <Flex alignItems="center" justifyContent="center" gap="sm" wrap>
        <Caption text="Presets:" color="lighter" />
        {presets.map((preset, index) => (
          <div
            key={preset.name}
            onClick={() => onPresetClick(index)}
            style={{ cursor: "pointer" }}
          >
            <Pill
              text={preset.name}
              variant={activePresetIndex === index ? "primary" : "neutral"}
            />
          </div>
        ))}
      </Flex>
    </Card>
  );
};
