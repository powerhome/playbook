import React, { useState } from 'react'
import Button from '../../pb_button/_button'
import Dialog from '../../pb_dialog/_dialog'
import Flex from '../../pb_flex/_flex'

const useDialog = (visible = false) => {
  const [opened, setOpened] = useState(visible)
  const toggle = () => setOpened(!opened)

  return [opened, toggle]
}

const DialogSeparators = () => {
  const [headerSeparatorDialogOpened, toggleHeaderSeparatorDialog] = useDialog()
  const [footerSeparatorDialogOpened, toggleFooterSeparatorDialog] = useDialog()
  const [bothSeparatorsDialogOpened, toggleBothSeparatorsDialog] = useDialog()
  const [
    neitherSeparatorsDialogOpened,
    toggleNeitherSeparatorsDialog,
  ] = useDialog()

  /* eslint-disable react/jsx-handler-names */

  const dialogs = [
    {
      size: 'md',
      text: 'Header Separator',
      title: 'Header Separator ',
      toggle: toggleHeaderSeparatorDialog,
      visible: headerSeparatorDialogOpened,
      header: true,
      footer: false,
    },
    {
      size: 'md',
      text: 'Footer Separator',
      title: 'Footer Separator',
      toggle: toggleFooterSeparatorDialog,
      visible: footerSeparatorDialogOpened,
      header: false,
      footer: true,
    },
    {
      size: 'md',
      text: 'Both Separators',
      title: 'Both Separators',
      toggle: toggleBothSeparatorsDialog,
      visible: bothSeparatorsDialogOpened,
      header: true,
      footer: true,
    },
    {
      size: 'md',
      text: 'No Separators',
      title: 'No Separators',
      toggle: toggleNeitherSeparatorsDialog,
      visible: neitherSeparatorsDialogOpened,
      header: false,
      footer: false,
    },
  ]

  return (
    <div>
      <Flex>
        <Button
            id="sm"
            marginRight="xl"
            onClick={toggleHeaderSeparatorDialog}
        >
          {'Default'}
        </Button>
        <Button
            marginRight="xl"
            onClick={toggleFooterSeparatorDialog}
        >
          {'Footer Separator'}
        </Button>
        <Button
            marginRight="xl"
            onClick={toggleBothSeparatorsDialog}
        >
          {'Both Separators'}
        </Button>
        <Button
            marginRight="xl"
            onClick={toggleNeitherSeparatorsDialog}
        >
          {'No Separators'}
        </Button>
      </Flex>
      <Flex>
        {dialogs.map((dialog) => (
          <Dialog
              key={dialog.size}
              opened={dialog.visible}
              size={dialog.size}
          >
            <Dialog.Header separator={dialog.header}>
              {dialog.title}
            </Dialog.Header>
            <Dialog.Body>{dialog.text}</Dialog.Body>
            <Dialog.Footer separator={dialog.footer}>
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

export default DialogSeparators
