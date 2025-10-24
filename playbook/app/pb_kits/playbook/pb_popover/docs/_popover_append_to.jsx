import React, { useState } from "react";
import { Button, PbReactPopover, CircleIconButton, Body, Flex, SectionSeparator } from "playbook-ui";

const PopoverAppendTo = (props) => {
  const [showParentPopover, setShowParentPopover] = useState(false);
  const [showSelectorPopover, setShowSelectorPopover] = useState(false);
  const [showButtonsPopover, setShowButtonsPopover] = useState(false);

  const handleTogglePaymentPopover = () => {
    setShowButtonsPopover(!showButtonsPopover);
  };

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

  const buttonsPopoverReference = (
    <Button
        aria={{ label: "Button with Buttons" }}
        icon={showButtonsPopover ? "chevron-up" : "chevron-down"}
        iconRight
        key={showButtonsPopover ? "chevron-up" : "chevron-down"}
        marginTop="sm"
        onClick={handleTogglePaymentPopover}
        text={`Button with Buttons`}
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

      {/* Example 3: Button with Buttons Popover with appendTo="parent"*/}
      <Body marginTop="md"
          text={`Button with Buttons Popover with appendTo="parent" - this example would be in a CSB for the real PR not a doc example but including here in the POC`} 
      />
      <PbReactPopover
          appendTo="parent"
          padding="none"
          placement="bottom"
          reference={buttonsPopoverReference}
          show={showButtonsPopover}
          {...props}
       >
        <Button
            aria={{ label: "Button 1" }}
            fullWidth
            onClick={() => alert("Button 1 clicked!")}
            paddingY="sm"
            text="Button 1"
            variant="link"
        />
        <SectionSeparator />
        <Button
            aria={{ label: "Button 2" }}
            fullWidth
            onClick={() => alert("Button 2 clicked!")}
            paddingY="sm"
            text="Button 2"
            variant="link"
        />
      </PbReactPopover>
    </>
  );
};

export default PopoverAppendTo;
