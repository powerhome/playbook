import React from "react";
import { Flex, Card, Body, Icon, Caption, Tooltip } from "playbook-ui";

const HoverCard = () => {
  return (
    <div className="ConnectedDevices">
      <Flex>
        <Tooltip
          delay={{ close: 500 }}
          placement="bottom"
          text={
            <Flex orientation="column" align="center">
              <Caption color="default" dark size="xs">
                Playbook has 200+ components in <br /> multiple development
                languages.
              </Caption>
              <Flex gap="sm">
                <Caption size="xs" dark text="Rails" />
                <Caption size="xs" dark text="React" />
                <Caption size="xs" dark text="Swift" />
              </Flex>
            </Flex>
          }
          zIndex={10}
        >
          <Card borderNone borderRadius="xl" shadow="deep" padding="sm">
            <Body color="light">
              <Flex gap="xxs" align="center">
                <Icon icon="info-circle" />
                Hover for more info
              </Flex>
            </Body>
          </Card>
        </Tooltip>
      </Flex>
    </div>
  );
};

export default HoverCard;
