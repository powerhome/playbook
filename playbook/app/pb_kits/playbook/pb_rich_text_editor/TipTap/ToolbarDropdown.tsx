import React, { useState } from 'react'

import Flex from '../../pb_flex/_flex'
import PbReactPopover from '../../pb_popover/_popover'
import Button from '../../pb_button/_button'
import Icon from '../../pb_icon/_icon'
import Nav from '../../pb_nav/_nav'
import NavItem from '../../pb_nav/_item'

import { ToolbarTypes } from './EditorTypes'

const ToolbarDropdown = ({editor}: any) => {
  const [showPopover, setShowPopover] = useState(false)
  const [activeItem, setActiveItem] = useState({text: "Paragraph", icon: "paragraph"})

const toolbarDropdownItems = [
    {
        node: "paragraph",
        icon: "paragraph",
        isActive: editor.isActive("paragraph"),
        text: "Paragraph",
        onclick: () => editor.chain().focus().setParagraph().run(),
    },
    {
        node: "heading-1",
        icon: "h1",
        isActive: editor.isActive("heading", {level: 1}),
        text: "Heading 1",
        onclick: () => editor.chain().focus().toggleHeading({level:1}).run(),
    },
    {
        node: "heading-2",
        icon: "h2",
        isActive: editor.isActive("heading", {level: 2}),
        text: "Heading 2",
        onclick: () => editor.chain().focus().toggleHeading({level:2}).run(),
    },
    {
        node: "heading-3",
        icon: "h3",
        isActive: editor.isActive("heading", {level: 3}),
        text: "Heading 3",
        onclick: () => editor.chain().focus().toggleHeading({level:3}).run(),
    },
    {
        node: "bulletList",
        icon: "list",
        isActive: editor.isActive("bulletList"),
        text: "Bullet List",
        onclick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
        node: "orderedList",
        icon: "list-ol",
        isActive: editor.isActive("orderedList"),
        text: "Ordered List",
        onclick: () =>   editor.chain().focus().toggleOrderedList().run()
        ,
    },
    {
        node: "blockquote",
        icon: "block-quote",
        isActive: editor.isActive("blockquote"),
        text: "Block Quote",
        onclick: () => editor.chain().focus().toggleBlockquote().run(),
    },
]


  const handleTogglePopover = () => {
    setShowPopover(true)
  }

  const handlePopoverClose = (shouldClosePopover: boolean) => {
    setShowPopover(!shouldClosePopover)
  }

  const popoverReference = (
    <Button className="editor-dropdown-button"
        onClick={handleTogglePopover}
        variant="secondary"
    >
      <Flex align="center"
            key={activeItem ? activeItem.icon : toolbarDropdownItems[0].icon}
            gap="xs"
      >
        <Icon icon={activeItem ? activeItem.icon : toolbarDropdownItems[0].icon} size='lg'/>
        {activeItem.text}
        <Flex
            className={showPopover ? "fa-flip-vertical" : ""}
            display="inline_flex"
        >
          <Icon 
              fixedWidth 
              icon="angle-down" 
              margin-left="xs" 
          />
        </Flex>
      </Flex>
    </Button>
  )

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
          paddingTop="xs"
          paddingBottom="xs" 
          variant="subtle"
        >
          {toolbarDropdownItems.map(({ icon, text, onclick, isActive}:ToolbarTypes, index:number) => (
            <NavItem
              cursor="pointer"
              className={`pb_tiptap_toolbar_dropdown_list_item ${isActive ? "is-active" : ""}`}
              iconLeft={icon}
              key={`${text}_${index}`}
              margin='none'
              onClick={()=> {onclick(); setShowPopover(false); setActiveItem({text:text, icon:icon})}}
              text={text}
              paddingTop='xxs'
              paddingBottom='xxs'
            />
          ))}
        </Nav>
      </PbReactPopover>
  )
}

export default ToolbarDropdown