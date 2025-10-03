/* eslint-disable react/jsx-handler-names */
import React, { useState } from "react"
import Button from '../../pb_button/_button'
import Dialog from '../../pb_dialog/_dialog'
import Flex from '../../pb_flex/_flex'

const useDialog = (visible = false) => {
  const [opened, setOpened] = useState(visible)
  const toggle = () => setOpened(!opened)
  return [opened, toggle]
}

const DialogStackedAlert = () => {
  const [defaultAlertOpened, toggleDefaultAlert] = useDialog()
  const [cautionAlertOpened, toggleCautionAlert] = useDialog()
  const [deleteAlertOpened, toggleDeleteAlert] = useDialog()

  const dialogs = [
    {
      size: "sm",
      status: "default",
      text: "Text explaining why there is an alert",
      title: "Are you sure?",
      toggle: toggleDefaultAlert,
      visible: defaultAlertOpened,
      buttonOneText:"Yes, Action",
      buttonTwoText: "No, Cancel"
    },
    {
      size: "sm",
      status: "caution",
      text: "This is the action you will be taking",
      title: "Are you sure?",
      toggle: toggleCautionAlert,
      visible: cautionAlertOpened,
      buttonOneText:"Yes, Action",
      buttonTwoText: "No, Cancel"
    },
    {
      size: "sm",
      status: "delete",
      text: "You are about to delete ...",
      title: "Delete",
      toggle: toggleDeleteAlert,
      visible: deleteAlertOpened,
      buttonOneText:"Yes, Delete",
      buttonTwoText: "No, Cancel"
    }
  ]

  return (
    <div>
    <Flex
        rowGap="xs"
        wrap
    >
      <Button
          marginRight="md"
          onClick={toggleDefaultAlert}
      >
        {"Default Status"}
      </Button>
      <Button
          marginRight="md"
          onClick={toggleCautionAlert}
      >
        {"Caution Status"}
      </Button>
      <Button
          marginRight="md"
          onClick={toggleDeleteAlert}
      >
        {"Delete Status"}
      </Button>
    </Flex>
    <Flex>
      {dialogs.map((dialog) => (
        <Dialog
            alertStyle={dialog.alertStyle}
            key={dialog.status}
            onClose={dialog.toggle}
            opened={dialog.visible}
            size={dialog.size}
            status={dialog.status}
            text={dialog.text}
            title={dialog.title}
        >
        <Dialog.Footer
            padding="sm"
            paddingBottom = "none"
            paddingX="md"
        >
          <Button
              fullWidth
              onClick={dialog.toggle}
              variant= {dialog.status == "delete" ? "danger" : "primary"}
          >
            {dialog.buttonOneText}
          </Button>
        </Dialog.Footer>
        <Dialog.Footer
            padding="sm"
            paddingBottom = "md"
            paddingX="md"
        >
          <Button
              fullWidth
              onClick={dialog.toggle}
              variant="secondary"
          >
            {dialog.buttonTwoText}
          </Button>
        </Dialog.Footer>
        </Dialog>
      ))}
    </Flex>
  </div>
  )
}

export default DialogStackedAlert
