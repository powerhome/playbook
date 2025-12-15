import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import Button from '../../pb_button/_button'
import Dialog from '../../pb_dialog/_dialog'
import Typeahead from '../../pb_typeahead/_typeahead'

const DialogOverflowVisible = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  const typeaheadOptions = [
    { label: "United States", value: "unitedStates", id: "us" },
    { label: "United Kingdom", value: "unitedKingdom", id: "gb" },
    { label: "Canada", value: "canada", id: "ca" },
    { label: "Australia", value: "australia", id: "au" },
    { label: "Germany", value: "germany", id: "de" },
    { label: "France", value: "france", id: "fr" },
    { label: "Japan", value: "japan", id: "jp" },
    { label: "Brazil", value: "brazil", id: "br" },
  ]

  return (
    <>
      <Button onClick={open}>{'Open Dialog with Overflow Visible'}</Button>
      <Dialog
          onClose={close}
          opened={isOpen}
          overflow="visible"
          size="md"
      >
        <Dialog.Header>
          <Body>{'Select Location'}</Body>
        </Dialog.Header>
        <Dialog.Body>
          <Typeahead
              options={typeaheadOptions}
              placeholder="Select a location..."
          />
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={close}>{'Save'}</Button>
          <Button
              onClick={close}
              variant="link"
          >
            {'Cancel'}
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export default DialogOverflowVisible

