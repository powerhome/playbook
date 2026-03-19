import React, { useState } from 'react'

import CircleIconButton from '../_circle_icon_button'
import Dialog from '../../pb_dialog/_dialog'
import Button from '../../pb_button/_button'

const CircleIconButtonLoading = (props) => {


  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return (
    <div>
      <CircleIconButton
          icon="plus"
          loading
          variant="primary"
          {...props}
      />

      <br />

      <CircleIconButton
          icon="pen"
          loading
          variant="secondary"
          {...props}
      />

      <br />

      <CircleIconButton
          disabled
          icon="times"
          loading
          {...props}
      />

      <br />

      <CircleIconButton
          icon="user"
          loading
          variant="link"
          {...props}
      />
          <>
        <Button marginTop="md"
            onClick={open}
        >
          {'Open Dialog to confirm PLAY-2837 fix still works for circle icon buttons'}
        </Button>
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
              <CircleIconButton
                  icon="plus"
                  loading
              />
              <div style={{height: '800px', backgroundColor: 'lightgray'}} />
              <Button
                  loading
                  text="Loading..."
              />
              <CircleIconButton
                  icon="plus"
                  loading
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                  loading
                  text="Send My Issue"
              />
              <CircleIconButton
                  icon="plus"
                  loading
              />
              <Button  variant="link">
                {"Back"}
              </Button>
            </Dialog.Footer>
          </Dialog>
      </>
    </div> 
  )
}

export default CircleIconButtonLoading
