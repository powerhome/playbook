/* eslint-disable flowtype/no-types-missing-file-annotation */
// React Pure component - do not use state!

// This template is specifically for props section of the Spacing example.
// All other examples use PropsValues.tsx
// This template does not have a Visual Guide section.

import React from "react";
import {
  Caption,
  Card,
  Flex,
  FlexItem,
  Pill,
  SectionSeparator,
} from "playbook-ui";

type Props = {
  propValues: string[];
  propNames: string[];
};

const SpacingProps = ({ propNames, propValues }: Props): React.ReactElement => {
  return (
    <Flex
      inline="flex-container"
      justifyContent="center"
      orientation="row"
      vertical="stretch"
    >
      <FlexItem flex={1}>
        <Card.Body>
          <Caption marginBottom="sm" text="Props" />
          {propNames.map((prop) => (
            <Pill
              key={prop}
              text={prop}
              marginRight="xs"
              textTransform="none"
            />
          ))}
        </Card.Body>
      </FlexItem>
      <SectionSeparator
        marginBottom="md"
        marginTop="md"
        orientation="vertical"
        variant="card"
      />

      <FlexItem flex={1}>
        <Card.Body>
          <Caption marginBottom="sm" text="Values" />
          {propValues.map((value) => (
            <Pill
              key={value}
              text={value}
              marginRight="xs"
              textTransform="none"
              variant="warning"
            />
          ))}
        </Card.Body>
      </FlexItem>
    </Flex>
  );
};

export default SpacingProps;
