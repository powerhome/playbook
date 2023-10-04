import React from "react";
import { Flex, Card, Title, Collapsible, Pill, Body, Icon } from "playbook-ui";

const ConnectedDevicesCard = () => {
  return (
    <div className="connected_devices component_example">
      <Flex>
        <Card
          borderNone
          borderRadius="xl"
          shadow="deepest"
          paddingY="xs"
          paddingX="md"
        >
          <Collapsible iconColor="link" padding="none">
            <Collapsible.Main padding="none">
              <Flex gap="sm" paddingRight="xl" align="center">
                <Body color="light">
                  <Icon icon="laptop-mobile" />
                </Body>
                <Flex orientation="column">
                  <Title size={4} text="3 Connected Devices" />
                  <Flex gap="xxs">
                    <Body color="error">
                      <Icon icon="exclamation-triangle" />
                    </Body>
                    <Body color="light" text="1 issue" />
                  </Flex>
                </Flex>
              </Flex>
            </Collapsible.Main>
            <Collapsible.Content padding="none">
              <Flex flexGrow={1} justify="center" gap="xs" paddingTop="xs">
                <Pill textTransform={false} variant="error" text="iPhone" />
                <Pill textTransform={false} variant="success" text="AirPods" />
                <Pill textTransform={false} variant="success" text="Laptop" />
              </Flex>
            </Collapsible.Content>
          </Collapsible>
        </Card>
      </Flex>
    </div>
  );
};

export default ConnectedDevicesCard;
