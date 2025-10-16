import React, { useState } from 'react'

import { getAllIcons } from "../../utilities/icons/allicons"

import Flex from '../../pb_flex/_flex'
import PbReactPopover from '../../pb_popover/_popover'
import Button from '../../pb_button/_button'
import Icon from '../../pb_icon/_icon'
import Nav from '../../pb_nav/_nav'
import NavItem from '../../pb_nav/_item'

import { ToolbarTypes } from './EditorTypes'

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

  const angleDown = getAllIcons()["angleDown"].icon as unknown as { [key: string]: SVGElement }

  const handleTogglePopover = () => {
    setShowPopover(!showPopover)
  }

  const handlePopoverClose = (shouldClosePopover: boolean) => {
    setShowPopover(!shouldClosePopover)
  }

let activeCount = 0;
const activeItems = [];

for (const { text, isActive, icon } of toolbarDropdownItems) {
  if (isActive) {
    activeCount ++
    activeItems.push(
      <Flex align="center"
          gap="xs"
          key={icon}
      >
        <Icon icon={icon}
            size="lg"
        />
        <div>{text}</div>
        <Flex className={showPopover ? "fa-flip-vertical" : ""}
            display="inline_flex"
        >
          <Icon 
              className="svg-inline--fa"
              customIcon={angleDown}
              fixedWidth
              margin-left="xs"
          />
        </Flex>
      </Flex>
    );
  }
}

const popoverReference = (
  <Button className="editor-dropdown-button"
      onClick={handleTogglePopover}
      variant="secondary"
  >
    {
       activeCount === 2 ? (
        activeItems[1]
       ) : (
        activeCount === 1 ? (
        activeItems[0] || null
        ) : (
          <Flex align="center"
              gap="xs"
              key="paragraph"
          >
            <Icon icon="paragraph"
                size="lg"
            />
            <div>Paragraph</div>
            <Flex className={showPopover ? "fa-flip-vertical" : ""}
                display="inline_flex"
            >
              <Icon 
                  className="svg-inline--fa"
                  customIcon={angleDown}
                  fixedWidth
                  margin-left="xs"
              />
            </Flex>
          </Flex>
        )
       )
    }
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
          {toolbarDropdownItems.map(({ icon, text, onclick, isActive}: ToolbarTypes, index: number) => (
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

export default ToolbarDropdown
