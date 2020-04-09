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

type PbTooltipProps = {
  className?: String,
  closeOnClick?: 'outside' | 'inside',
  dark: boolean,
  offset?: Boolean,
  reference: PopperReference,
  show?: Boolean,
  shouldClosePopover?: () => Boolean,
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
  dark = false,
  modifiers,
  offset,
  placement,
  referenceElement,
  show,
}: PbTooltipProps) => (
  <Popper
      modifiers={popoverModifiers({ modifiers, offset })}
      placement={placement}
      referenceElement={referenceElement}
  >
    {({ placement, ref, scheduleUpdate, style }) => {
      scheduleUpdate()
      return (
        <div
            className={buildCss('pb_tooltip_kit' + (dark === true ? '_dark ' : ' ') + className)}
            data-placement={placement}
            ref={ref}
            style={style}

        >
          <div className={(`tooltip_tooltip ${show ? 'show' : ''}`)}>
            { children }
          </div>
        </div>
        )
      }
    }
  </Popper>
)

export default class PbReactTooltip extends React.Component<PbTooltipProps> {
  static defaultProps = {
    modifiers: {},
    offset: false,
    placement: 'top',
    portal: 'body',
    show: false,
    shouldClosePopover: noop,
    usePortal: false,
  }

  componentDidMount() {
    const { closeOnClick, shouldClosePopover } = this.props

    if (!closeOnClick) return

    document.body.addEventListener('click', ({ target }) => {
      const targetIsPopover = target.closest('[class^=tooltip_tooltip]') !== null
      const targetIsReference = target.closest('.pb_tooltip_reference_wrapper') !== null

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

  props: PbTooltipProps

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
                  className="pb_tooltip_reference_wrapper"
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
}
