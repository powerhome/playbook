import React from "react";
import { Body, Card, Flex } from "playbook-ui";
import { PlaygroundHint } from "../types";

interface HintsDisplayProps {
  hints: Array<PlaygroundHint & { id: string }>;
}

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
