import React, { useState } from "react";

import Body from '../../pb_body/_body'
import Button from '../../pb_button/_button'
import Dialog from '../../pb_dialog/_dialog'
import Flex from '../../pb_flex/_flex'
import Caption from '../../pb_caption/_caption'
import Textarea from "../../pb_textarea";
import Typeahead from '../../pb_typeahead/_typeahead'

const useDialog = (visible = false) => {
  const [opened, setOpened] = useState(visible);
  const toggle = () => setOpened(!opened);

  return [opened, toggle];
};

const DialogFullHeightPlacement = () => {
  const [headerSeparatorDialogOpened, toggleHeaderSeparatorDialog] =
    useDialog();
  const [footerSeparatorDialogOpened, toggleFooterSeparatorDialog] =
    useDialog();
  const [bothSeparatorsDialogOpened, toggleBothSeparatorsDialog] = useDialog();

  const dialogs = [
    {
      title: "Left Dialog",
      toggle: toggleHeaderSeparatorDialog,
      visible: headerSeparatorDialogOpened,
      placement: "left",
    },
    {
      title: "Center Dialog",
      toggle: toggleFooterSeparatorDialog,
      visible: footerSeparatorDialogOpened,
    },
    {
      title: "Right Dialog",
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
            onClick={toggleFooterSeparatorDialog}
        >
          {"Center Dialog"}
        </Button>
        <Button marginRight="xl"
            onClick={toggleBothSeparatorsDialog}
        >
          {"Right Dialog"}
        </Button>
      </Flex>
      <Flex>
        {dialogs.map(({toggle, visible, placement, title}, index) => (
          <Dialog
              fullHeight
              key={index}
              onClose={toggle}
              opened={visible}
              placement={placement}
              size={"md"}
          >
            <Dialog.Header>
              <Body>{title}</Body>
            </Dialog.Header>
            <Dialog.Body>
              <Textarea
                  id="default-example-2"
                  label="Description"
                  rows={4}
              />
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
                  variant="link"
              >
                {"Back"}
              </Button>
            </Dialog.Footer>
          </Dialog>
        ))}
      </Flex>
    </>
  );
};

export default DialogFullHeightPlacement;
