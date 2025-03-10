import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import Button from '../../pb_button/_button'
import Caption from '../../pb_caption/_caption'
import Dialog from '../../pb_dialog/_dialog'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import Typeahead from '../../pb_typeahead/_typeahead'

const DialogCompound = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return (
    <>
      <Button onClick={open}>{'Open a Complex Dialog'}</Button>
      <Dialog
          fullHeight
          onClose={close}
          opened={isOpen}
          size="lg"
      >
        <Dialog.Header>
          <Body>{'What do you need us to take care of?'}</Body>
        </Dialog.Header>
        <Dialog.Body>
          <Caption marginBottom="xs">{'Description'}</Caption>
          <RichTextEditor />
          <br />
          <Caption>
            {
              'Type in a word or term too help find tickets later. ex. training,'
            }
            {'phone setup, hr'}
          </Caption>
          <Typeahead placeholder="Tags.." />
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={close}>{'Send My Issue'}</Button>
          <Button
              onClick={close}
              variant="link"
          >
            {'Back'}
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export default DialogCompound
