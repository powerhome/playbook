import React, { useState } from 'react'

import Flex from '../../pb_flex/_flex'
import PbReactPopover from '../../pb_popover/_popover'
import Icon from '../../pb_icon/_icon'
import Nav from '../../pb_nav/_nav'
import NavItem from '../../pb_nav/_item'

const MoreExtensionsDropdown = ({extensions}: any) => {
  const [showPopover, setShowPopover] = useState(false)

  const handleTogglePopover = () => {
    setShowPopover(!showPopover)
  }

  const handlePopoverClose = (shouldClosePopover: boolean) => {
    setShowPopover(!shouldClosePopover)
  }


const popoverReference = (
    <button
        className="toolbar_button"
        onClick={handleTogglePopover}
        role="button"
        type="button"
    >
    <Flex 
        align="center"
        className="toolbar_button_icon"
        justify="center"
    >
      <Icon icon="ellipsis"
          size="lg"
      />
    </Flex>
  </button>

);

  return (
      <PbReactPopover
          closeOnClick='outside'
          padding='none'
          placement="bottom"
          reference={popoverReference}
          shouldClosePopover={handlePopoverClose}
          show={showPopover}
      >
        <Nav 
            paddingBottom={extensions.length > 1 ? "xs" : "none"}
            paddingTop={extensions.length > 1 ? "xs" : "none"} 
            variant="subtle"
        >
          {extensions && extensions.map(({ icon, text, onclick, isActive}: any, index: number) => ( 
            <NavItem
                className={`pb_tiptap_toolbar_dropdown_list_item ${isActive ? "is-active" : ""}`}
                cursor="pointer"
                iconLeft={icon}
                key={`${text}_${index}`}
                margin='none'
                onClick={()=> {onclick(); setShowPopover(false)}}
                paddingBottom='xxs'
                paddingTop='xxs'
                text={text}
            />
          ))}
        </Nav>
      </PbReactPopover>
  )
}

export default MoreExtensionsDropdown