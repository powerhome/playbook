import React, { useState } from 'react'
import { find, partial, map } from  '../../utilities/object'

import Button from '../../pb_button/_button'
import Icon from '../../pb_icon/_icon'
import List from '../../pb_list/_list'
import ListItem from '../../pb_list/_list_item'
import PbReactPopover from '../../pb_popover/_popover'

export type Direction = 'asc' | 'desc'
export type SortOptions = { [name: string]: string }
export type SortValue = { name: string, dir: Direction }
export type SortingChangeCallback = (value: SortValue[]) => void

const nextValue = (value: SortValue[], name: string): SortValue => {
  const current = find(value, { name })
  return {
    name,
    dir: current && current.dir == 'asc' ? 'desc' : 'asc',
  }
}

const directionIcon = (dir: Direction) => (
  dir == 'asc' ? 'arrow-up-short-wide' : 'arrow-down-wide-short'
)

const renderOptions = (options: SortOptions, value: SortValue[], handleChange: (arg0: SortValue) => void) => (
  map(options, (label, name) => {
    const next = nextValue(value, String(name))
    return (
      <ListItem key={`option-${next.name}-${next.dir}`}>
        <Button
            htmlType={undefined}
            onClick={partial(handleChange, next)}
            text={` ${label}`}
            variant="link"
        />
      </ListItem>
    )
  })
)

export type SortMenuProps = {
  dark?: boolean,
  onChange: SortingChangeCallback,
  options: SortOptions,
  value?: SortValue[],
}
const SortMenu = ({ dark, options, value, onChange }: SortMenuProps): React.ReactElement => {
  const [hide, updateHide] = useState(true)
  const toggle = () => updateHide(!hide)
  const handleChange = (value: SortValue) => {
    updateHide(true)
    onChange([value])
  }

  const sortButton = (
    <Button
        dark={dark}
        htmlType={undefined}
        id="sort-button"
        onClick={toggle}
        paddingRight="none"
        variant="link"
    >
      {map(value, ({ dir, name }) => (
        <span key={`current-sort-${name}-${dir}`}>
          {` ${options[name]}`}
          <Icon
              dark={dark}
              icon={directionIcon(dir)}
          />
        </span>
      ))}
    </Button>
  )

  return (
    <PbReactPopover
        className="pb_filter_sort_menu"
        closeOnClick="outside"
        padding="none"
        placement="bottom"
        reference={sortButton}
        shouldClosePopover={updateHide}
        show={!hide}
    >
      <List>
        {renderOptions(options, value, handleChange)}
      </List>
    </PbReactPopover>
  )
}

export default SortMenu
