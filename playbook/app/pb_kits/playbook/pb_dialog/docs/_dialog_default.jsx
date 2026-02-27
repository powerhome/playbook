import React, { useState } from 'react'
import Button from '../../pb_button/_button'
import Dialog from '../../pb_dialog/_dialog'


const DialogDefault = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return (
    <>
      <Button onClick={open}>{'Open Dialog'}</Button>
      <Dialog
          onCancel={close}
          onClose={close}
          onConfirm={close}
          opened={isOpen}
          size="md"
          title="Header Title is the Title Prop"
      >
        <Dialog.Body>
            <Button
                aria={{ label: 'Loading' }}
                loading
                text="Button Primary"
            />
            <div style={{height: '800px', backgroundColor: 'lightgray'}} />
            <Button
                loading
                text="Loading..."
            />
          </Dialog.Body>
          <Dialog.Footer>
            <Button
                loading
                text="Send My Issue"
            />
            <Button  variant="link">
              {"Back"}
            </Button>
          </Dialog.Footer>
        </Dialog>
    </>
  )
}

export default DialogDefault
