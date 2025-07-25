import React from "react";
import { Body, Caption, Flex, Card } from "playbook-ui";

type ResponsivenessSectionTypes = {
  exampleSection?: React.ReactNode;
  children?: React.ReactNode;
};
const ResponsivenessSection = ({
  exampleSection,
  children,
}: ResponsivenessSectionTypes) => {
  return (
    <Card gap="sm">
      <Caption text="Responsiveness" />
      <Body>
        This global support responsive values using a breakpoint-based syntax
        that allows you to define different property values at different screen
        sizes. This makes it easy to create adaptive layouts without writing
        custom media queries.
      </Body>
      <Body>
        Responsive values are defined using an object with screen size keys and
        corresponding property values. You can optionally include a default
        value that acts as a fallback when no breakpoint-specific value is
        matched. It looks like this:
      </Body>
      <Flex flexDirection="column" gap="sm" wrap>
        {exampleSection}
      </Flex>
      {children}
    </Card>
  );
};

export default ResponsivenessSection;
