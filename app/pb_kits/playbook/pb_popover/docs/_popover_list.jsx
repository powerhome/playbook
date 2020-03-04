import React, { useState } from 'react'
import {
  Button,
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
        text="Button Secondary"
        variant="secondary"
    />
  )

  return (
    <div style={{ height: '400px', textAlign: 'center' }}>
      <PbReactPopover
          offset
          placement="bottom"
          reference={popoverReference}
          show={showPopover}
      >
        <List>
          <ListItem>{'Popularity'}</ListItem>
          <ListItem>{'Title'}</ListItem>
          <ListItem>{'Duration'}</ListItem>
          <ListItem>{'Date Started'}</ListItem>
          <ListItem>{'Date Ended'}</ListItem>
        </List>
      </PbReactPopover>
    </div>
  )
}

export default PopoverWithButton
