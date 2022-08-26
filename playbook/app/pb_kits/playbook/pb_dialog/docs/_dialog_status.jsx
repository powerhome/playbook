/* eslint-disable react/jsx-handler-names */
/* @flow */

import React, { useState } from "react"
import { Button, Dialog, Flex } from "../.."

const useDialog = (visible = false) => {
  const [opened, setOpened] = useState(visible)
  const toggle = () => setOpened(!opened)
  return [opened, toggle]

}

const DialogStatus = () => {
  const [infoAlertOpened, toggleInfoAlert] = useDialog()
  const [cautionAlertOpened, toggleCautionAlert] = useDialog()
  const [successAlertOpened, toggleSuccessAlert] = useDialog()
  const [errorAlertOpened, toggleErrorAlert] = useDialog()
  const [deleteAlertOpened, toggleDeleteAlert] = useDialog()

  const dialogs = [
    {
      status: "info",
      text: "Text explaining why there is an alert",
      title: "Are you Sure?",
      toggle: toggleInfoAlert,
      visible: infoAlertOpened,
      buttonOneText:"Yes, Action",
      buttonTwoText: "No, Cancel"
    },
    {
      status: "caution",
      text: "This is the action you will be taking",
      title: "Are you Sure?",
      toggle: toggleCautionAlert,
      visible: cautionAlertOpened,
      buttonOneText:"Yes, Action",
      buttonTwoText: "No, Cancel"
    },
    {
      status: "delete",
      text: "You are about to delete ...",
      title: "Delete",
      toggle: toggleDeleteAlert,
      visible: deleteAlertOpened,
      buttonOneText:"Yes, Delete",
      buttonTwoText: "No, Cancel"
    },
    {
      status: "error",
      text: "Text explaining the error",
      title: "Error Message",
      toggle: toggleErrorAlert,
      visible: errorAlertOpened,
      buttonOneText:"Ok, Thanks",
      buttonTwoText: "No, Cancel"
    },
    {
      status: "success",
      text: "Text explaining what is successful",
      title: "Success!",
      toggle: toggleSuccessAlert,
      visible: successAlertOpened,
      buttonOneText: "Ok, Thanks",
      buttonTwoText:"No, Cancel"
    },
  ]

  return (
    <div>
      <Flex>
        <Button
            marginRight="md"
            onClick={toggleInfoAlert}
        >
          {"Information Status"}
        </Button>
        <Button
            marginRight="md"
            onClick={toggleCautionAlert}
        >
          {"Caution Status"}
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
              key={dialog.status}
              onClose={dialog.toggle}
              opened={dialog.visible}
              status={dialog.status}
              text={dialog.text}
              title={dialog.title}
          >
          <Dialog.Footer
              padding="md"
          >
            <Button
                onClick={dialog.toggle}
            >
            {dialog.buttonOneText}
            </Button>
            <Button
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

export default DialogStatus
