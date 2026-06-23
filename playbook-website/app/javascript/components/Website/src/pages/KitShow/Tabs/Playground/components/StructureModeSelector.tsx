import React from "react";
import { Pill, Detail, Flex, FlexItem } from "playbook-ui";

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
  if (modes.length === 0) return null;

  return (
    <Flex orientation="column" marginTop="lg" wrap>
      <FlexItem marginBottom="xs">
        <Detail text="Structure" />
      </FlexItem>
      <FlexItem>
        <Flex gap="xs" wrap>
          {modes.map((mode) => (
            <div
              key={mode.key}
              onClick={() => onModeChange(mode.key)}
              style={{ cursor: "pointer" }}
            >
              <Pill
                text={mode.label}
                variant={activeMode === mode.key ? "primary" : "neutral"}
                textTransform="none"
              />
            </div>
          ))}
        </Flex>
      </FlexItem>
    </Flex>
  );
};
