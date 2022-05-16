/* @flow */

import React, { useState } from "react"
import { Button, Dialog, Flex } from "../../"

const useDialog = (visible = false) => {
  const [opened, setOpened] = useState(visible)
  const toggle = () => setOpened(!opened)

  return [opened, toggle]
}

const DialogAlert = () => {
  const [infoAlertOpened, toggleInfoAlert] = useDialog()
  const [cautionAlertOpened, toggleCautionAlert] = useDialog()
  const [successAlertOpened, toggleSuccessAlert] = useDialog()
  const [errorAlertOpened, toggleErrorAlert] = useDialog()
  const [deleteAlertOpened, toggleDeleteAlert] = useDialog()

  const dialogs = [
    {
      sweetAlert: "default",
      status: "info",
      text: "Body on small dialog",
      title: "Header on small dialog",
      toggle: toggleInfoAlert,
      visible: infoAlertOpened,
    },
    {
      sweetAlert: "default",
      status: "caution",
      text: "Body on medium dialog",
      title: "Header on medium dialog",
      toggle: toggleCautionAlert,
      visible: cautionAlertOpened,
    },
    {
      sweetAlert: "default",
      status: "delete",
      text: "Body on large dialog",
      title: "Header on large dialog",
      toggle: toggleDeleteAlert,
      visible: deleteAlertOpened,
    },
    {
      sweetAlert: "default",
      status: "error",
      text: "Body on large dialog",
      title: "Header on large dialog",
      toggle: toggleErrorAlert,
      visible: errorAlertOpened,
    },
    {
      sweetAlert: "default",
      status: "success",
      text: "Body on large dialog",
      title: "Header on large dialog",
      toggle: toggleSuccessAlert,
      visible: successAlertOpened,
    },
  ]

  return (
    <div>
      <Flex>
        <Button id='sm'
            marginRight='xl'
            onClick={toggleCautionAlert}>
          {"Info Status"}
        </Button>
        <Button marginRight='xl'
            onClick={toggleCautionAlert}>
          {"Caution Status"}
        </Button>
        <Button marginRight='xl'
            onClick={toggleSuccessAlert}>
          {"Success Status"}
        </Button>
        <Button marginRight='xl'
            onClick={toggleErrorAlert}>
          {"Error Status"}
        </Button>
        <Button marginRight='xl'
            onClick={toggleDeleteAlert}>
          {"Delete Status"}
        </Button>
      </Flex>
      <Flex>
        {dialogs.map((dialog) => (
          <Dialog
              key={dialog.status}
              // eslint-disable-next-line react/jsx-handler-names
              onClose={dialog.toggle}
              opened={dialog.visible}
              status={dialog.status}
              sweetAlert={dialog.sweetAlert}
              text='Hello'
              title='Testing Title'
          />
        ))}
      </Flex>
    </div>
  )
}

export default DialogAlert
