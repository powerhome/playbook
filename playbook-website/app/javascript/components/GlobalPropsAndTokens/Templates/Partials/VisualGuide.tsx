import React from "react";
import { Flex, Caption, Card } from "playbook-ui";

type VisualGuideTypes = {
  children: React.ReactNode;
};

const VisualGuide = ({ children }: VisualGuideTypes) => {
  return (
    <Card width="100%" backgroundColor="white">
      <Flex flexDirection="column">
        <Caption paddingBottom="md">Visual Guide</Caption>
        {children}
      </Flex>
    </Card>
  );
};

export default VisualGuide;
