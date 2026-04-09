import React, { useState } from 'react'

import Button from '../../pb_button/_button'
import Flex from '../../pb_flex/_flex'
import PbReactPopover from '../../pb_popover/_popover'

const ROWS = [
  [
    { placement: 'top', label: 'Top' },
    { placement: 'top-start', label: 'Top start' },
    { placement: 'top-end', label: 'Top end' },
  ],
  [
    { placement: 'bottom', label: 'Bottom' },
    { placement: 'bottom-start', label: 'Bottom start' },
    { placement: 'bottom-end', label: 'Bottom end' },
  ],
  [
    { placement: 'left', label: 'Left' },
    { placement: 'left-start', label: 'Left start' },
    { placement: 'left-end', label: 'Left end' },
  ],
  [
    { placement: 'right', label: 'Right' },
    { placement: 'right-start', label: 'Right start' },
    { placement: 'right-end', label: 'Right end' },
  ],
]

const PopoverPlacement = (props) => {
  const [open, setOpen] = useState({})

  const isOpen = (placement) => open[placement] === true
  const setOpenFor = (placement) => (value) => setOpen((prev) => ({ ...prev, [placement]: value }))
  const toggle = (placement) => setOpenFor(placement)(!isOpen(placement))
  const handleShouldClose = (placement) => (shouldClose) => {
    if (shouldClose) setOpenFor(placement)(false)
  }

  return (
    <>
      {ROWS.map((placements, rowIndex) => (
        <Flex
            justify="around"
            key={placements[0].placement}
            marginBottom={rowIndex < ROWS.length - 1 ? 'sm' : undefined}
            orientation="row"
            wrap
            {...props}
        >
          {placements.map(({ placement, label }) => {
            const trigger = (
              <Button
                  key={placement}
                  onClick={() => toggle(placement)}
                  text={label}
                  variant="secondary"
              />
            )
            return (
              <PbReactPopover
                  closeOnClick="outside"
                  key={placement}
                  offset
                  placement={placement}
                  reference={trigger}
                  shouldClosePopover={handleShouldClose(placement)}
                  show={isOpen(placement)}
                  {...props}
              >
                {`Popover: ${label.toLowerCase()}`}
              </PbReactPopover>
            )
          })}
        </Flex>
      ))}
    </>
  )
}

export default PopoverPlacement
