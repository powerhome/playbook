import React, { useState } from 'react'
import { Button, Dialog } from '../../'

const DialogDefault = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <Button onClick={open}>{'Open Dialog'}</Button>
      <Dialog
          cancelButton="Cancel Button"
          className="wrapper"
          confirmButton="Okay"
          loading={isLoading}
          onCancel={close}
          onClose={close}
          onConfirm={() => setIsLoading(!isLoading)}
          opened={isOpen}
          portalClassName="portal"
          size="sm"
          text="Hello Body Text, Nice to meet ya."
          title="Header Title is the Title Prop"
      />
    </>
  )
}

export default DialogDefault
