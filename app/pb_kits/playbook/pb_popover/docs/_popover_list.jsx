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
        <ListItem>{'Popularity'}</ListItem>
        <ListItem>{'Title'}</ListItem>
        <ListItem>{'Duration'}</ListItem>
        <ListItem>{'Date Started'}</ListItem>
        <ListItem>{'Date Ended'}</ListItem>
      </List>
    </PbReactPopover>
  )
}

export default PopoverWithButton
