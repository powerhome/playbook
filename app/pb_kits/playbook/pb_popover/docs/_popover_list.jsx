import React, { useState } from 'react'
import {
  Button,
  Icon,
  List,
  ListItem,
  PbReactPopover,
} from '../..'

const PopoverWithButton = () => {
  const [showPopover, setShowPopover] = useState(false)

  const handleTogglePopover = () => {
    setShowPopover(!showPopover)
  }

  const popoverReference = (
    <Button
        onClick={handleTogglePopover}
        variant="secondary"
    >
      {'Filter By'}
      <Icon
          fixedWidth
          icon="angle-down"
      />
    </Button>
  )

  return (
    <PbReactPopover
        padding="none"
        placement="bottom"
        reference={popoverReference}
        show={showPopover}
    >
      <List xpadding>
        <ListItem><a><a>{'Popularity'}</a></a></ListItem>
        <ListItem><a>{'Title'}</a></ListItem>
        <ListItem><a>{'Duration'}</a></ListItem>
        <ListItem><a>{'Date Started'}</a></ListItem>
        <ListItem><a>{'Date Ended'}</a></ListItem>
      </List>
    </PbReactPopover>
  )
}

export default PopoverWithButton
