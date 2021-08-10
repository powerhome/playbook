/* @flow */

import React, { useState } from 'react'
import { Button, Dialog, Flex } from '../../'

const useDialog = (visible = false) => {
  const [opened, setOpened] = useState(visible)
  const toggle = () => setOpened(!opened)

  return [opened, toggle]
}

const DialogSizes = () => {
  const [smDialogOpened, toggleSmDialog] = useDialog()
  const [mdDialogOpened, toggleMdDialog] = useDialog()
  const [lgDialogOpened, toggleLgDialog] = useDialog()

  /* eslint-disable react/jsx-handler-names */

  const dialogs = [
    {
      size: 'sm',
      text: 'Body on small dialog',
      title: 'Header on small dialog',
      toggle: toggleSmDialog,
      visible: smDialogOpened,
    },
    {
      size: 'md',
      text: 'Body on medium dialog',
      title: 'Header on medium dialog',
      toggle: toggleMdDialog,
      visible: mdDialogOpened,
    },
    {
      size: 'lg',
      text: 'Body on large dialog',
      title: 'Header on large dialog',
      toggle: toggleLgDialog,
      visible: lgDialogOpened,
    },
  ]

  return (
    <div>
      <Flex>
        <Button
            id="sm"
            marginRight="xl"
            onClick={toggleSmDialog}
        >
          {'Small Dialog'}
        </Button>
        <Button
            marginRight="xl"
            onClick={toggleMdDialog}
        >
          {'Medium Dialog'}
        </Button>
        <Button
            marginRight="xl"
            onClick={toggleLgDialog}
        >
          {'Large Dialog'}
        </Button>
      </Flex>
      <Flex>
        {dialogs.map((dialog) => (
          <Dialog
              key={dialog.size}
              onClose={dialog.toggle}
              opened={dialog.visible}
              size={dialog.size}
          >
            <Dialog.Header>{dialog.title}</Dialog.Header>
            <Dialog.Body>{dialog.text}</Dialog.Body>
            <Dialog.Footer>
              <Button onClick={dialog.toggle}>{'Okay'}</Button>
              <Button
                  onClick={dialog.toggle}
                  variant="link"
              >
                {'Cancel'}
              </Button>
            </Dialog.Footer>
          </Dialog>
        ))}
      </Flex>
    </div>
  )
}

export default DialogSizes
