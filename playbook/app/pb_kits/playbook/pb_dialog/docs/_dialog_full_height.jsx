import React, { useState } from "react";
import {
  Body,
  Button,
  Caption,
  Dialog,
  Flex,
  RichTextEditor,
  Typeahead,
} from "../..";

const useDialog = (visible = false) => {
  const [opened, setOpened] = useState(visible);
  const toggle = () => setOpened(!opened);

  return [opened, toggle];
};

const DialogFullHeight = () => {
  const [headerSeparatorDialogOpened, toggleHeaderSeparatorDialog] =
    useDialog();
  const [footerSeparatorDialogOpened, toggleFooterSeparatorDialog] =
    useDialog();
  const [bothSeparatorsDialogOpened, toggleBothSeparatorsDialog] = useDialog();

  const dialogs = [
    {
      size: "sm",
      title: "Small Dialog",
      toggle: toggleHeaderSeparatorDialog,
      visible: headerSeparatorDialogOpened,
    },
    {
      size: "md",
      title: "Medium Dialog",
      toggle: toggleFooterSeparatorDialog,
      visible: footerSeparatorDialogOpened,
    },
    {
      size: "lg",
      title: "Large Dialog",
      toggle: toggleBothSeparatorsDialog,
      visible: bothSeparatorsDialogOpened,
    },
  ];

  return (
    <>
      <Flex wrap>
        <Button id="sm"
            marginRight="xl"
            onClick={toggleHeaderSeparatorDialog}>
          {"Small Dialog"}
        </Button>
        <Button marginRight="xl"
            onClick={toggleFooterSeparatorDialog}>
          {"Medium Dialog"}
        </Button>
        <Button marginRight="xl"
            onClick={toggleBothSeparatorsDialog}>
          {"Large Dialog"}
        </Button>
      </Flex>
      <Flex>
        {dialogs.map(({toggle, visible, placement, size, title}, index) => (
          <Dialog
              fullHeight
              key={index}
              onClose={toggle}
              opened={visible}
              placement={placement}
              size={size}
          >
            <Dialog.Header>
              <Body>{title}</Body>
            </Dialog.Header>
            <Dialog.Body>
              <Caption marginBottom="xs">{"Description"}</Caption>
              <RichTextEditor />
              <br />
              <Caption>
                {
                  "Type in a word or term too help find tickets later. ex. training,"
                }
                {"phone setup, hr"}
              </Caption>
              <Typeahead placeholder="Tags.." />
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={toggle}>{"Send My Issue"}</Button>
              <Button onClick={toggle}
                  variant="link">
                {"Back"}
              </Button>
            </Dialog.Footer>
          </Dialog>
        ))}
      </Flex>
    </>
  );
};

export default DialogFullHeight;
