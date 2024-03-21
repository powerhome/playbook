import React, { useState } from 'react'
import {
  Button,
  Caption,
  Dialog,
  RichTextEditor,
} from '../..'

const DialogButtonTypes = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  const formRef = React.createRef()

  const confirmButton = <Button htmlType="submit">{'Yes, Send Now!'}</Button>
  const cancelButton = (
    <Button
        htmlType="button"
        onClick={close}
        variant="link"
    >
      {'No, I am scared..'}
    </Button>
  )

  return (
    <form action="./react"
        id="dialog-button-form"
        method="get"
        ref={formRef}
    >
      <Caption marginBottom="xs">{'How did we do?'}</Caption>
      <RichTextEditor marginBottom="md"
          placeholder='Tell us what you think'
      />

      <Button onClick={open}>{'Send Feedback'}</Button>

      <Dialog
          cancelButton={cancelButton}
          confirmButton={confirmButton}
          onClose={close}
          opened={isOpen}
          parentSelector={() => document.querySelector('#dialog-button-form')}
          size="md"
          text="Are you sure you want to send?"
          title="Feedback Submission"
      />
    </form>
  )
}

export default DialogButtonTypes
