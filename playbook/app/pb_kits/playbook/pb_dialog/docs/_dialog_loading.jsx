import React, { useState } from 'react'
import { Button, Dialog } from 'playbook-ui'

const DialogLoading = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => {
    if (!isLoading) {
      setIsOpen(false)
    }
  }
  const open = () => setIsOpen(true)
  const [isLoading, setIsLoading] = useState(false)
  const submit = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 3000))
    setIsLoading(false)
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={open}>{'Open Dialog'}</Button>
      <Dialog
          cancelButton="Cancel"
          className="wrapper"
          confirmButton="Okay"
          loading={isLoading}
          onCancel={close}
          onClose={close}
          onConfirm={submit}
          opened={isOpen}
          size="sm"
          text="Make a 3 second request?"
          title="Loading Example"
      />
    </>
  )
}

export default DialogLoading
