import React, { useState } from "react";
import {
  Button,
  Dialog,
  Flex,
} from "playbook-ui";

const useDialog = (visible = false) => {
  const [opened, setOpened] = useState(visible);
  const toggle = () => setOpened(!opened);

  return [opened, toggle];
};

const DialogFullHeightPlacement = () => {
  const [headerSeparatorDialogOpened, toggleHeaderSeparatorDialog] =
    useDialog();
  const [bothSeparatorsDialogOpened, toggleBothSeparatorsDialog] = useDialog();

  const dialogs = [
    {
      toggle: toggleHeaderSeparatorDialog,
      visible: headerSeparatorDialogOpened,
      placement: "left",
    },
    {
      toggle: toggleBothSeparatorsDialog,
      visible: bothSeparatorsDialogOpened,
      placement: "right",
    },
  ];

  return (
    <>
      <Flex wrap>
        <Button id="sm"
            marginRight="md"
            onClick={toggleHeaderSeparatorDialog}
        >
          {"Left Dialog"}
        </Button>
        <Button marginRight="xl"
            onClick={toggleBothSeparatorsDialog}
        >
          {"Right Dialog"}
        </Button>
      </Flex>
      <Flex>
        {dialogs.map(({toggle, visible, placement }, index) => (
          <Dialog
              fullHeight
              key={index}
              onClose={toggle}
              opened={visible}
              placement={placement}
              size={"sm"}
          />
        ))}
      </Flex>
    </>
  );
};

export default DialogFullHeightPlacement;
