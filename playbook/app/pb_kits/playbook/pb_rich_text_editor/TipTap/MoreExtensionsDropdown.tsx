import React, { useState } from 'react'

import Flex from '../../pb_flex/_flex'
import PbReactPopover from '../../pb_popover/_popover'
import Icon from '../../pb_icon/_icon'
import Nav from '../../pb_nav/_nav'
import NavItem from '../../pb_nav/_item'

const MoreExtensionsDropdown = ({extensions}: any) => {
  const [showPopover, setShowPopover] = useState(false)

  const handleTogglePopover = () => {
    setShowPopover(true)
  }

  const handlePopoverClose = (shouldClosePopover: boolean) => {
    setShowPopover(!shouldClosePopover)
  }


const popoverReference = (
    <button
    className="toolbar_button"
    onClick={handleTogglePopover}
  >
    <Flex 
      align="center"
      className="toolbar_button_icon"
      justify="center"
    >
      <Icon icon="ellipsis" size="lg" />
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
          paddingTop={extensions.length > 1 ? "xs" : "none"}
          paddingBottom={extensions.length > 1 ? "xs" : "none"} 
          variant="subtle"
        >
          {extensions && extensions.map(({ icon, text, onclick, isActive}:any, index:number) => ( 
            <NavItem
              cursor="pointer"
              className={`pb_tiptap_toolbar_dropdown_list_item ${isActive ? "is-active" : ""}`}
              iconLeft={icon}
               key={`${text}_${index}`}
              margin='none'
              onClick={()=> {onclick(); setShowPopover(false)}}
              text={text}
              paddingTop='xxs'
              paddingBottom='xxs'
            />
        ))}
        </Nav>
      </PbReactPopover>
  )
}

export default MoreExtensionsDropdown