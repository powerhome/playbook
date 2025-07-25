import React from "react";
import { Tooltip, Flex, Icon, Caption } from "playbook-ui";

const HeaderWithIcon = () => {
  return (
    <Flex alignItems="center" gap="xxs">
      <Caption>Values</Caption>
      <Tooltip
        placement="top"
        text="Hover over the Values to see their specific value."
        zIndex={10}
      >
        <Icon icon="circle-info" size="lg" />
      </Tooltip>
    </Flex>
  );
};

export default HeaderWithIcon;
