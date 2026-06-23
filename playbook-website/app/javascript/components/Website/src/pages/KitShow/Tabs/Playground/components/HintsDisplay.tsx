import React from "react";
import { Body, Card, Flex, Icon } from "playbook-ui";
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
    <Card
      marginTop="md"
      highlight={{ position: "side", color: "primary" }}
      paddingY="xs"
      paddingX="sm"
      width="100%"
      background="light"
    >
      {hints.map((hint) => (
        <Flex key={hint.id} align="center" gap="xs" paddingY="xxs">
          <Body text={hint.message} />
        </Flex>
      ))}
    </Card>
  );
};
