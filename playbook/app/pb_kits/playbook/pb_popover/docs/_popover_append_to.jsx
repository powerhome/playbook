import React, { useState } from "react";
import { PbReactPopover, CircleIconButton, Body, Flex } from "playbook-ui";

const PopoverAppendTo = (props) => {
  const [showParentPopover, setShowParentPopover] = useState(false);
  const [showSelectorPopover, setShowSelectorPopover] = useState(false);

  const parentPopoverReference = (
    <CircleIconButton
        icon="info"
        onClick={() => setShowParentPopover(!showParentPopover)}
        variant="secondary"
    />
  );

  const selectorPopoverReference = (
    <CircleIconButton
        icon="info"
        onClick={() => setShowSelectorPopover(!showSelectorPopover)}
        variant="secondary"
    />
  );

  return (
    <>
      <Flex
          marginBottom="md"
          orientation="row"
          vertical="center"
          {...props}
      >
        <Body text="Click info for more details" />
        &nbsp;
        <PbReactPopover
            appendTo="parent"
            offset
            placement="top"
            reference={parentPopoverReference}
            show={showParentPopover}
            {...props}
        >
          {'I\'m a popover. I have been appended to my parent element.'}
        </PbReactPopover>
      </Flex>

      <Flex
          orientation="row"
          vertical="center"
          {...props}
      >
        <Body text="Click info for more details" />
        &nbsp;
        <PbReactPopover
            appendTo=".kit-show-wrapper"
            offset
            placement="top"
            reference={selectorPopoverReference}
            show={showSelectorPopover}
            {...props}
        >
          {'I\'m a popover. I have been appended to the .kit-show-wrapper.'}
        </PbReactPopover>
      </Flex>
    </>
  );
};

export default PopoverAppendTo;
