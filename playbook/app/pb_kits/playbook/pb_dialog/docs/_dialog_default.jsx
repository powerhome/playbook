import React, { useState } from 'react'
import { Button, Dialog } from '../../'

const DialogDefault = () => {
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
          size="sm"
          text="Hello Body Text, Nice to meet ya."
          title="Header Title is the Title Prop"
      />
    </>
  )
}

export default DialogDefault
