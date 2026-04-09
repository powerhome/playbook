import React from "react";
import { Caption, Card, Flex, Icon } from "playbook-ui";
import { PlaygroundHint } from "../types";

interface HintsDisplayProps {
  hints: Array<PlaygroundHint & { id: string }>;
}

const getHintIcon = (type?: "info" | "warning" | "error") => {
  switch (type) {
    case "error":
      return "exclamation-circle";
    case "warning":
      return "exclamation-triangle";
    default:
      return "info-circle";
  }
};

const getHintColor = (type?: "info" | "warning" | "error") => {
  switch (type) {
    case "error":
      return "error";
    case "warning":
      return "warning";
    default:
      return "info";
  }
};

export const HintsDisplay: React.FC<HintsDisplayProps> = ({ hints }) => {
  if (hints.length === 0) return null;

  return (
    <Card marginBottom="md" padding="sm" width="100%" background="light">
      {hints.map((hint) => (
        <Flex key={hint.id} align="center" gap="xs" paddingY="xxs">
          <Icon icon={getHintIcon(hint.type)} color={getHintColor(hint.type)} size="sm" />
          <Caption text={hint.message} />
        </Flex>
      ))}
    </Card>
  );
};
