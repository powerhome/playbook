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

const DialogStatus = () => {
  const [defaultAlertOpened, toggleDefaultAlert] = useDialog()
  const [cautionAlertOpened, toggleCautionAlert] = useDialog()
  const [deleteAlertOpened, toggleDeleteAlert] = useDialog()
  const [infoAlertOpened, toggleInfoAlert] = useDialog()
  const [successAlertOpened, toggleSuccessAlert] = useDialog()
  const [errorAlertOpened, toggleErrorAlert] = useDialog()

  const dialogs = [
    {
      size: "status_size",
      status: "default",
      text: "Text explaining why there is an alert",
      title: "Are you sure?",
      toggle: toggleDefaultAlert,
      visible: defaultAlertOpened,
      buttonOneText:"Yes, Action",
      buttonTwoText: "No, Cancel"
    },
    {
      size: "status_size",
      status: "caution",
      text: "This is the action you will be taking",
      title: "Are you sure?",
      toggle: toggleCautionAlert,
      visible: cautionAlertOpened,
      buttonOneText:"Yes, Action",
      buttonTwoText: "No, Cancel"
    },
    {
      size: "status_size",
      status: "delete",
      text: "You are about to delete ...",
      title: "Delete",
      toggle: toggleDeleteAlert,
      visible: deleteAlertOpened,
      buttonOneText:"Yes, Delete",
      buttonTwoText: "No, Cancel"
    },
    {
      size: "sm",
      status: "info",
      text: "Text explaining why there is an alert",
      title: "Information",
      toggle: toggleInfoAlert,
      visible: infoAlertOpened,
      buttonOneText:"Ok, Thanks!",
    },
    {
      size: "sm",
      status: "success",
      text: "Text explaining what is successful",
      title: "Success!",
      toggle: toggleSuccessAlert,
      visible: successAlertOpened,
      buttonOneText: "Great!",
    },
    {
      size: "sm",
      status: "error",
      text: "Text explaining the error",
      title: "Error Message",
      toggle: toggleErrorAlert,
      visible: errorAlertOpened,
      buttonOneText:"Oh no!",
    },
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
        <Button
            marginRight="md"
            onClick={toggleInfoAlert}
        >
          {"Information Status"}
        </Button>
        <Button
            marginRight="md"
            onClick={toggleSuccessAlert}
        >
          {"Success Status"}
        </Button>
        <Button
            marginRight="md"
            onClick={toggleErrorAlert}
        >
          {"Error Status"}
        </Button>
      </Flex>
      <Flex>
        {dialogs.map((dialog) => (
          <Dialog
              key={dialog.status}
              onClose={dialog.toggle}
              opened={dialog.visible}
              size={dialog.size}
              status={dialog.status}
              text={dialog.text}
              title={dialog.title}
          >
            <Dialog.Footer
                paddingBottom="md"
                paddingX="md"
            >
              {!dialog.buttonTwoText && (
                <Button
                    fullWidth
                    onClick={dialog.toggle}
                >
                {dialog.buttonOneText}
                </Button>
              )}
              {dialog.buttonTwoText && (
                <React.Fragment>
                  <Button
                      onClick={dialog.toggle}
                      paddingRight="xl"
                      variant={dialog.status == "delete" ? "danger" : "primary"}
                  >
                  {dialog.buttonOneText}
                  </Button>
                  <Button
                      onClick={dialog.toggle}
                      variant="secondary"
                  >
                  {dialog.buttonTwoText}
                  </Button>
                </React.Fragment>
              )}
            </Dialog.Footer>
          </Dialog>
        ))}
      </Flex>
    </div>
  )
}

export default DialogStatus
