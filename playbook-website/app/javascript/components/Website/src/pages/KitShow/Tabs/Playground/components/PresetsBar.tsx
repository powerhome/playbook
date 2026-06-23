import React from "react";
import { Pill, Detail, Flex, FlexItem } from "playbook-ui";
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
    <Flex orientation="column" marginTop="md" wrap>
      <FlexItem marginBottom="xs">
        <Detail text="Presets" />
      </FlexItem>
      <FlexItem>
        <Flex gap="xs" wrap>
          {presets.map((preset, index) => (
            <div
              key={preset.name}
              onClick={() => onPresetClick(index)}
              style={{ cursor: "pointer" }}
            >
              <Pill
                text={preset.name}
                variant={activePresetIndex === index ? "primary" : "neutral"}
                textTransform="none"
              />
            </div>
          ))}
        </Flex>
      </FlexItem>
    </Flex>
  );
};
