import React from "react";
import { Body, Button, Caption, Flex, Title } from "playbook-ui";

type PlaygroundHeaderProps = {
  canRestorePreviousState: boolean;
  kitCount: number;
  onClear: () => void;
  onRestorePreviousState: () => void;
};

export const PlaygroundHeader = ({
  canRestorePreviousState,
  kitCount,
  onClear,
  onRestorePreviousState,
}: PlaygroundHeaderProps) => (
  <Flex
      align="end"
      className="full-playground-heading"
      gap="md"
      justify="between"
      width="100%"
  >
    <Flex
        gap="xs"
        orientation="column"
    >
      <Caption
          color="lighter"
          text={`${kitCount} configured playground kits`}
      />
      <Title
          size={1}
          text="Playground"
      />
      <Body
          color="light"
          text="Build a UI by adding kits to the canvas, nesting kits inside children, and editing props. Copy the produced code snippet in the Code section to save and share your work."
      />
    </Flex>
    <Flex gap="xs">
      <Button
          disabled={!canRestorePreviousState}
          icon="undo"
          onClick={onRestorePreviousState}
          text="Undo"
          variant="secondary"
      />
      <Button
          icon="trash"
          onClick={onClear}
          text="Clear"
          variant="secondary"
      />
    </Flex>
  </Flex>
);
