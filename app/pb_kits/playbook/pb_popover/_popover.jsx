// @flow

import React from 'react'
import ReactDOM from 'react-dom'

import {
  Popper,
  Manager as PopperManager,
  PopperProps,
  Reference as PopperReference,
} from 'react-popper'

import {
  buildCss,
  noop,
} from '../utilities/props'

import { Card } from '../'

type PbPopoverProps = {
  className?: String,
  closeOnClick?: 'outside' | 'inside',
  offset?: Boolean,
  reference: PopperReference,
  show?: Boolean,
  shouldClosePopover?: () => Boolean,
} & PopperProps

// Prop enabled default modifiers here
// https://popper.js.org/docs/v2/modifiers

const POPOVER_MODIFIERS = {
  offset: { //https://popper.js.org/docs/v2/modifiers/offset/
    enabled: true,
    name: 'offset',
    options: {
      offset: [0, 8],
    },
    phase: 'main',
  },
}

const popoverModifiers = ({ modifiers, offset }) => {
  return offset ? modifiers.concat([POPOVER_MODIFIERS.offset]) : modifiers
}

const Popover = ({
  children,
  className,
  modifiers,
  offset,
  placement,
  referenceElement,
}: PbPopoverProps) => (
  <Popper
      modifiers={popoverModifiers({ modifiers, offset })}
      placement={placement}
      referenceElement={referenceElement}
  >
    {({ placement, ref, style }) => {
      return (
        <div
            className={`${buildCss('pb_popover_kit')} ${className}`}
            data-placement={placement}
            ref={ref}
            style={style}
        >
          <div className={buildCss('popover_tooltip', 'show')}>
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

export default class PbReactPopover extends React.Component<PbPopoverProps> {
  static defaultProps = {
    modifiers: [],
    offset: false,
    placement: 'left',
    portal: 'body',
    show: false,
    shouldClosePopover: noop,
    usePortal: true,
  }

  componentDidMount() {
    const { closeOnClick, shouldClosePopover } = this.props

    if (!closeOnClick) return

    document.body.addEventListener('click', ({ target }) => {
      const targetIsPopover = target.closest('[class^=popover_tooltip]') !== null
      const targetIsReference = target.closest('.pb_popover_reference_wrapper') !== null

      if (targetIsReference) return

      switch (closeOnClick) {
      case 'outside':
        if (!targetIsPopover) {
          shouldClosePopover(true)
        }
        break
      case 'inside':
        if (targetIsPopover) {
          shouldClosePopover(true)
        }
        break
      case 'any':
        shouldClosePopover(true)
        break
      }
    })
  }

  props: PbPopoverProps

  render() {
    const {
      className,
      children,
      modifiers,
      offset,
      placement,
      portal,
      reference,
      referenceElement,
      show,
      usePortal,
    } = this.props

    const popoverComponent = (
      <Popover
          className={className}
          modifiers={modifiers}
          offset={offset}
          placement={placement}
          referenceElement={referenceElement}
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
        <If condition={show}>
          <If condition={usePortal}>
            {ReactDOM.createPortal(
              popoverComponent,
              document.querySelector(portal)
            )}
            <Else />
            {popoverComponent}
          </If>
        </If>
      </PopperManager>
    )
  }
}
