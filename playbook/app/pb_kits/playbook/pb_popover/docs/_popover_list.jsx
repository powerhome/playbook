import React, { useState } from 'react'
import {
  Button,
  Icon,
  List,
  ListItem,
  PbReactPopover,
  Flex,
} from '../..'

const PopoverWithButton = (props) => {
  const [showPopover, setShowPopover] = useState(false)

  const handleTogglePopover = () => {
    setShowPopover(!showPopover)
  }

  const popoverReference = (
    <Button
        onClick={handleTogglePopover}
        variant="secondary"
    >
      <Flex align="center">
        {"Filter By"}
        <Flex
            className={showPopover ? "fa-flip-vertical" : ""}
            display="inline_flex"
        >
          <Icon 
              fixedWidth 
              icon="angle-down" 
              margin-left="xxs" 
          />
        </Flex>
      </Flex>
    </Button>
  )

  return (
    <PbReactPopover
        padding="none"
        placement="bottom"
        reference={popoverReference}
        show={showPopover}
        {...props}
    >
      <List xpadding>
        <ListItem><a>{'Popularity'}</a></ListItem>
        <ListItem><a>{'Title'}</a></ListItem>
        <ListItem><a>{'Duration'}</a></ListItem>
        <ListItem><a>{'Date Started'}</a></ListItem>
        <ListItem><a>{'Date Ended'}</a></ListItem>
      </List>
    </PbReactPopover>
  )
}

export default PopoverWithButton
