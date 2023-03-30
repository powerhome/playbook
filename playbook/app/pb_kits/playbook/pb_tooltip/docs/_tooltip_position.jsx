// @flow

import React from "react";

import { Body, Button, Flex, Tooltip } from "../..";

const TooltipPosition = (props) => {
  return (
    <Flex align="center">
      <Flex 
          flex="1"
          flexDirection="column"
          gap="md"
      >
        <Body 
            text="When adding a Tooltip inside of a relative positioned div with an overflow style applied to it, the Tooltip content can break or not respect its original placement. To fix that you can change the default position to fixed" 
            {...props}
        />
        <Body 
            text="Both tooltips are set to be placed on the bottom of the button." 
            {...props}
        />
        <Body 
            text="The position prop is optional and defaults to absolute. The Tooltip accepts the position values of fixed and absolute." 
            {...props}
        />
      </Flex>
      <div
          style={{
            position: "relative",
            display: "flex",
            flex: "1",
            alignItems: "center",
            justifyContent: "space-around",
            overflowY: "scroll",
            height: "100px",
          }}
      >
        <Tooltip
            placement="bottom"
            position="fixed"
            text="Fixed Tooltip"
            zIndex={10}
            {...props}
        >
          <Button text="Fixed" />
        </Tooltip>
        <Tooltip
            placement="bottom"
            text="Broken tooltip content"
            zIndex={10}
            {...props}
        >
          <Button text="Absolute" />
        </Tooltip>
      </div>
    </Flex>
  );
};

export default TooltipPosition;
