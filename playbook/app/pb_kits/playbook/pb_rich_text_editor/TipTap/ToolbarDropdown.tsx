import React, { useState } from 'react'

import Flex from '../../pb_flex/_flex'
import PbReactPopover from '../../pb_popover/_popover'
import Button from '../../pb_button/_button'
import Icon from '../../pb_icon/_icon'
import Nav from '../../pb_nav/_nav'
import NavItem from '../../pb_nav/_item'

import { ToolbarTypes } from './EditorTypes'
import { normalizeListSelection } from './listSelection'

const ToolbarDropdown = ({editor}: any): React.ReactElement => {
  const [showPopover, setShowPopover] = useState(false)

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
        onclick: () => {
          normalizeListSelection(editor)
          editor.chain().focus().toggleBulletList().run()
        },
    },
    {
        node: "orderedList",
        icon: "list-ol",
        isActive: editor.isActive("orderedList"),
        text: "Ordered List",
        onclick: () => {
          normalizeListSelection(editor)
          editor.chain().focus().toggleOrderedList().run()
        }
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
    setShowPopover(!showPopover)
  }

  const handlePopoverClose = (shouldClosePopover: boolean) => {
    setShowPopover(!shouldClosePopover)
  }

let activeCount = 0;
const activeLabels = [];

for (const { text, isActive } of toolbarDropdownItems) {
  if (isActive) {
    activeCount++
    activeLabels.push(text);
  }
}

const triggerLabel =
  activeCount === 2 ? activeLabels[1] :
  activeCount === 1 ? activeLabels[0] :
  "Paragraph";

const popoverReference = (
  <Button className="editor-dropdown-button"
      onClick={handleTogglePopover}
      variant="secondary"
  >
    <Flex
        align="center"
        gap="xs"
    >
      <div>{triggerLabel}</div>
      <Icon
          fixedWidth
          flip={showPopover ? "vertical" : "none"}
          icon="angle-down"
      />
    </Flex>
  </Button>
);

  return (
      <PbReactPopover
          className='pb_tiptap_toolbar_dropdown_popover'
          closeOnClick='outside'
          padding='none'
          placement="bottom"
          reference={popoverReference}
          shouldClosePopover={handlePopoverClose}
          show={showPopover}
      >
        <Nav 
            paddingBottom="xs"
            paddingTop="xs" 
            variant="subtle"
        >
          {toolbarDropdownItems.map(({ text, onclick, isActive}: ToolbarTypes, index: number) => (
            <NavItem
                className={`pb_tiptap_toolbar_dropdown_list_item ${isActive ? "is-active" : ""}`}
                cursor="pointer"
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

export default ToolbarDropdown
