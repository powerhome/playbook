import React from "react";
import { Title, Flex, Icon, Card, Body } from "playbook-ui";

const CardHeader = () => {
  return (
    <Card width="100%" highlight={{ position: "side", color: "primary" }}>
      <Flex alignItems="start" gap="xs">
        <Icon icon="circle-info" size="1x" color="primary" />
        <Flex flexDirection="column" gap="xxs">
          <Title size={4}>Global Props</Title>
          <Body>
            Available to apply on every component. They are added at a global
            level to provide the most flexibility when developing.
          </Body>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CardHeader;
