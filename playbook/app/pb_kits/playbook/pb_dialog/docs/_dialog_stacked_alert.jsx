/* eslint-disable react/jsx-handler-names */

import React, { useState } from "react"
import { Button, Dialog, Flex } from "../.."

const useDialog = (visible = false) => {
  const [opened, setOpened] = useState(visible)
  const toggle = () => setOpened(!opened)
  return [opened, toggle]
}

const DialogStackedAlert = () => {
  const [singleButtonOpen, toggleSingleButtonOpen] = useDialog()
  const [stackedButtonOpen, toggleStackedButtonOpen] = useDialog()
  const [linkButtonOpen, toggleLinkButtonOpen] = useDialog()

  const dialogs = [
    {
      status: "info",
      sweetAlert: "single",
      text: "Text explaining why there is an alert",
      title: "Are you sure?",
      toggle: toggleSingleButtonOpen,
      visible: singleButtonOpen,
      confirmButton:"Ok, Thanks",
    },
    {
      status: "error",
      sweetAlert: "stacked",
      text: "Text explaining the error",
      title: "Error Message",
      confirmButton:"Yes, Action",
      cancelButton: "Ok, Cancel",
      toggle: toggleStackedButtonOpen,
      visible: stackedButtonOpen,
    },
    {
      status: "caution",
      sweetAlert: "link",
      text: "This is the action you will be taking",
      title: "Are you sure?",
      toggle: toggleLinkButtonOpen,
      visible: linkButtonOpen,
      confirmButton:"Ok, Thanks",
    }
  ]

  return (
    <div>
    <Flex>
      <Button
          marginX="md"
          onClick={toggleSingleButtonOpen}
      >
        {"1 Button Information Status"}
      </Button>
      <Button
          marginX="md"
          onClick={toggleStackedButtonOpen}
      >
        {"2 Button Error Status"}
      </Button>
      <Button
          marginX="md"
          onClick={toggleLinkButtonOpen}
      >
        {"1 Link Button Caution"}
      </Button>
      <Button
          marginX="md"
          onClick={toggleLinkButtonOpen}
      >
        {"2 Link Button Success"}
      </Button>
    </Flex>
    <Flex>
      {dialogs.map((dialog) => (
        <Dialog
            key={dialog.status && dialog.sweetAlert}
            onClose={dialog.toggle}
            opened={dialog.visible}
            size="sm"
            status={dialog.status}
            sweetAlert={dialog.sweetAlert}
            text={dialog.text}
            title={dialog.title}
        >
          <Dialog.Footer>
            <Button
                fullWidth
                onClick={dialog.toggle}
            >
              {dialog.confirmButton}
            </Button>
          </Dialog.Footer>
          <If condition={dialog.cancelButton}>
            <Dialog.Footer>
                <Button
                    fullWidth
                    onClick={dialog.toggle}
                    variant="secondary"
                >
                  {dialog.cancelButton}
                </Button>
            </Dialog.Footer>
           </If>
        </Dialog>
      ))}
    </Flex>
  </div>
  )
}

export default DialogStackedAlert
