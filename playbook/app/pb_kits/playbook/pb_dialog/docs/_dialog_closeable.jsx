import React, { useState } from 'react'
import Button from '../../pb_button/_button'
import Dialog from '../../pb_dialog/_dialog'


const DialogCloseable = () => {
  // Simple example 
  const [isOpenSimple, setIsOpenSimple] = useState(false)
  const closeSimple = () => setIsOpenSimple(false)
  const openSimple = () => setIsOpenSimple(true)

    // Complex example
  const [isOpenComplex, setIsOpenComplex] = useState(false)
  const closeComplex = () => setIsOpenComplex(false)
  const openComplex = () => setIsOpenComplex(true)

  return (
    <>
      <Button 
          marginRight='md'
          onClick={openSimple}
      >
        {'Open Simple Dialog'}
      </Button>
      <Button onClick={openComplex}>{'Open Complex Dialog'}</Button>

      <Dialog
          cancelButton="Cancel Button"
          closeable={false}
          confirmButton="Okay"
          onCancel={closeSimple}
          onClose={closeSimple}
          onConfirm={closeSimple}
          opened={isOpenSimple}
          size="sm"
          text="Hello Body Text, Nice to meet ya."
          title="Header Title is the Title Prop"
      />
      <Dialog
          onClose={closeComplex}
          opened={isOpenComplex}
          size="sm"
      >
        <Dialog.Header closeable={false}>{'Header Title inside Dialog.Header'}</Dialog.Header>
        <Dialog.Body>{'Hello Body Text, Nice to meet ya.'}</Dialog.Body>
        <Dialog.Footer>
          <Button onClick={closeComplex}>{'Okay'}</Button>
          <Button
              onClick={closeComplex}
              variant="link"
          >
            {'Cancel Button'}
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export default DialogCloseable