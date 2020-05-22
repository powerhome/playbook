/* @flow */

import React, { useState } from 'react'
import { find, map, partial } from 'lodash'
import { Button, Icon, List, ListItem, PbReactPopover } from '../../'

export type Direction = 'asc' | 'desc'
export type SortOptions = { [name: string]: string }
export type SortValue = { name: string, dir: Direction }
export type SortingChangeCallback = (SortValue[]) => void

const nextValue = (value: SortValue[], name: string): Direction => {
  const current = find(value, { name })
  return {
    name,
    dir: current && current.dir == 'asc' ? 'desc' : 'asc',
  }
}

const directionIcon = (dir: Direction) => (
  dir == 'asc' ? 'sort-amount-up' : 'sort-amount-down'
)

const renderOptions = (options: SortOptions, value: SortValue[], handleChange: (SortValue) => void) => (
  map(options, (label, name) => {
    const next = nextValue(value, name)
    return (
      <ListItem key={`option-${next.name}-${next.dir}`}>
        <Button
            icon={directionIcon(next.dir)}
            onClick={partial(handleChange, next)}
            text={` ${label}`}
            variant="link"
        />
      </ListItem>
    )
  })
)

export type SortMenuProps = {
  value?: SortValue[],
  options: SortOptions,
  onChange: SortingChangeCallback,
}
const SortMenu = ({ options, value, onChange }: SortMenuProps) => {
  const [hide, updateHide] = useState(true)
  const toggle = () => updateHide(!hide)
  const handleChange = (value: SortValue) => {
    updateHide(true)
    onChange([value])
  }

  const sortButton = (
    <Button
        id="sort-button"
        onClick={toggle}
        variant="link"
    >
      {map(value, ({ dir, name }) => (
        <span key={`current-sort-${name}-${dir}`}>
          <Icon icon={directionIcon(dir)} />
          {` ${options[name]}`}
        </span>
      ))}
    </Button>
  )

  return (
    <PbReactPopover
        className="pb_filter_sort_menu"
        closeOnClick="outside"
        offset
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
