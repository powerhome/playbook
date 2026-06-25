import React from "react";
import { Detail, Flex, FlexItem, Pill } from "playbook-ui";

export type PlaygroundPillOption = {
  key: string;
  label: string;
};

type PlaygroundPillSelectorProps = {
  activeKey: string | null;
  label: string;
  marginTop?: "md" | "lg";
  onSelect: (key: string) => void;
  options: PlaygroundPillOption[];
};

export const PlaygroundPillSelector: React.FC<PlaygroundPillSelectorProps> = ({
  activeKey,
  label,
  marginTop = "lg",
  onSelect,
  options,
}) => {
  if (options.length === 0) return null;

  return (
    <Flex marginTop={marginTop} orientation="column" wrap>
      <FlexItem marginBottom="xs">
        <Detail text={label} />
      </FlexItem>
      <FlexItem>
        <Flex gap="xs" wrap>
          {options.map((option) => (
            <div
              key={option.key}
              onClick={() => onSelect(option.key)}
              style={{ cursor: "pointer" }}
            >
              <Pill
                text={option.label}
                textTransform="none"
                variant={activeKey === option.key ? "primary" : "neutral"}
              />
            </div>
          ))}
        </Flex>
      </FlexItem>
    </Flex>
  );
};
