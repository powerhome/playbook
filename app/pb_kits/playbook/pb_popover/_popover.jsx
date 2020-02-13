// @flow

import React from 'react'
import ReactDOM from 'react-dom'

import {
  Popper,
  Manager as PopperManager,
  PopperProps,
  Reference as PopperReference,
} from 'react-popper'

import { buildCss } from '../utilities/props'
import { Card } from '../'

type PbPopoverProps = {
  className?: String,
  offset?: Boolean,
  reference: PopperReference,
  show?: Boolean,
} & PopperProps

const POPOVER_OFFSET_Y = {
  offset: {
    offset: '0, 8',
  },
}

const popoverModifiers = ({ modifiers, offset }) => {
  return offset ? { ...modifiers, ...POPOVER_OFFSET_Y } : modifiers
}

const Popover = ({
  children,
  className,
  modifiers,
  offset,
  placement,
  referenceElement,
  show,
}: PbPopoverProps) => (
  <Popper
      modifiers={popoverModifiers({ modifiers, offset })}
      placement={placement}
      referenceElement={referenceElement}
  >
    {({ placement, ref, scheduleUpdate, style }) => {
      scheduleUpdate()
      return (
        <div
            className={buildCss('pb_popover_kit', className)}
            data-placement={placement}
            ref={ref}
            style={style}
        >
          <div className={buildCss('popover_tooltip', show ? 'show' : '')}>
            <Card shadow="deeper">
              { children }
            </Card>
          </div>
        </div>
        )
      }
    }
  </Popper>
)

const PbReactPopover = ({
  className,
  children,
  modifiers = {},
  offset = false,
  placement = 'left',
  portal = 'body',
  reference,
  referenceElement,
  show = false,
  usePortal = false,
}: PbPopoverProps) => {
  const popoverComponent = (
    <Popover
        className={className}
        modifiers={modifiers}
        offset={offset}
        placement={placement}
        referenceElement={referenceElement}
        show={show}
    >
      {children}
    </Popover>
  )

  return (
    <PopperManager>
      <If condition={reference && !referenceElement}>
        <PopperReference>
          {({ ref }) => (
            <span
                className="pb_popover_reference_wrapper"
                ref={ref}
            >
              <reference.type
                  {...reference.props}
              />
            </span>
          )}
        </PopperReference>
      </If>
      <If condition={usePortal}>
        {ReactDOM.createPortal(
          popoverComponent,
          document.querySelector(portal)
        )}
        <Else />
        {popoverComponent}
      </If>
    </PopperManager>
  )
}

export default PbReactPopover
