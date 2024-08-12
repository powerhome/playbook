import React, { useState } from 'react'
import { Button, Dialog } from 'playbook-ui'

const DialogShouldCloseOnOverlay = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return (
    <>
      <Button onClick={open}>{'Open Dialog'}</Button>
      <Dialog
          cancelButton="Cancel"
          confirmButton="Okay"
          onCancel={close}
          onClose={close}
          onConfirm={close}
          opened={isOpen}
          shouldCloseOnOverlayClick={false}
          size="sm"
          text="Click on the overlay all day. I will stay open."
          title="Neat Header"
      />
    </>
  )
}

export default DialogShouldCloseOnOverlay
