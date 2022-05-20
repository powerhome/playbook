import React, { useState } from "react"
import { Button, Dialog, Flex } from "../.."

const DialogStackedAlert = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  const dialogs = [
    {
      sweetAlert: "default",
      status: "info",
      text: "Text explaining why there is an alert",
      title: "Are you sure?",
      confirmButton: "Ok, Thanks"
    },
    {
      sweetAlert: "default",
      status: "error",
      text: "Text explaining why there is an alert",
      title: "Are you sure?",
    }
  ]

  return (
    <div>
    <Flex justify="between">
      <Button  onClick={open}>{"1 Button Alert Status"}</Button>
      <Button  onClick={open}>{"2 Button Alert Status"}</Button>
    </Flex>
    <Flex>
      {dialogs.map((dialog) => (
        <Dialog
            key={dialog.status}
            onClose={close}
            opened={isOpen}
            status={dialog.status}
            sweetAlert={dialog.sweetAlert}
            text={dialog.text}
            title={dialog.title}
        >
          <Dialog.Footer>
            <Button
                fullWidth
                onClick={close}
            >
              {"Yes, Action"}
            </Button>
          </Dialog.Footer>
        </Dialog>
      ))}
    </Flex>
  </div>
  )
}

export default DialogStackedAlert
