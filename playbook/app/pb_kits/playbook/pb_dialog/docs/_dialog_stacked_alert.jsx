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
      alertStyle: "single",
      text: "Text explaining why there is an alert",
      title: "Are you sure?",
      toggle: toggleSingleButtonOpen,
      visible: singleButtonOpen,
      confirmedButton:"Ok, Thanks",
    },
    {
      status: "error",
      alertStyle: "stacked",
      text: "Text explaining the error",
      title: "Error Message",
      confirmedButton:"Yes, Action",
      cancelledButton: "Ok, Cancel",
      toggle: toggleStackedButtonOpen,
      visible: stackedButtonOpen,
    },
    {
      status: "caution",
      alertStyle: "link",
      text: "This is the action you will be taking",
      title: "Are you sure?",
      toggle: toggleLinkButtonOpen,
      visible: linkButtonOpen,
      confirmedButton:"Ok, Thanks",
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
            alertStyle={dialog.alertStyle}
            key={dialog.status}
            onClose={dialog.toggle}
            opened={dialog.visible}
            size="sm"
            status={dialog.status}
            text={dialog.text}
            title={dialog.title}
        >
          <Dialog.Footer>
            <Button
                fullWidth
                onClick={dialog.toggle}
            >
              {dialog.confirmedButton}
            </Button>
          </Dialog.Footer>
          <If condition={dialog.cancelledButton}>
            <Dialog.Footer>
                <Button
                    fullWidth
                    onClick={dialog.toggle}
                    variant="secondary"
                >
                  {dialog.cancelledButton}
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
