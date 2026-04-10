import React from "react";
import { Pill, Caption, Card, Flex } from "playbook-ui";

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
    <Card marginBottom="md" padding="sm" width="100%">
      <Flex alignItems="center" justifyContent="center" gap="sm" wrap>
        <Caption text="Structure:" color="lighter" />
        {modes.map((mode) => (
          <div
            key={mode.key}
            onClick={() => onModeChange(mode.key)}
            style={{ cursor: "pointer" }}
          >
            <Pill
              text={mode.label}
              variant={activeMode === mode.key ? "primary" : "neutral"}
            />
          </div>
        ))}
      </Flex>
    </Card>
  );
};
