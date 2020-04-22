// @flow

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

import {
  Popper,
  Manager as PopperManager,
  PopperProps,
  Reference as PopperReference,
} from 'react-popper'

import {
  buildAriaProps,
  buildCss,
  noop,
} from '../utilities/props'

type PbTooltipProps = {
  className?: String,
  dark: Boolean,
  show?: Boolean,
  text: String,
} & PopperProps

const TOOLTIP_TIMEOUT = 250
let mouseenterTimeout

const Tooltip = ({
  dark=false,
  reference,
  text,
  usePortal=false,
}: PbTooltipProps) => {
  const [show, setShow] = useState(false)
  const [flipped, setFlipped] = useState(false)

  const ariaProps = buildAriaProps({role: 'tooltip'})
  const darkClass = dark ? 'dark' : ''
  const showClass = show ? 'show' : ''
  const flippedClass = flipped ? 'flipped' : ''

  const handleOnUpdate = ({flipped}) => {
    console.log(flipped)
  }

  const modifiers = {
    // Sadly, there is not an onUpdate in this version of react-popper so we must go it alone
    // https://github.com/popperjs/react-popper/issues/223#issuecomment-427856223
    onUpdate: {
      enabled: true,
      order: 1000,
      fn: (data) => {
        setFlipped(data.flipped)
      }
    }
  }

  const tooltipComponent = (
    <Popper
      modifiers={modifiers}
      placement='top'
    >
      {({ placement, ref, scheduleUpdate, style, arrowProps }) => {
        scheduleUpdate()
        return (
            <div
              className={buildCss('pb_tooltip_kit', darkClass)}
              data-placement={placement}
              ref={ref}
              style={style}
            >
              <div className={classnames('tooltip_tooltip react', showClass, flippedClass)}>
                {text}
                <div
                  className="arrow"
                  ref={arrowProps.ref}
                  style={arrowProps.style}
                />
              </div>
            </div>
          )
        }
      }
    </Popper>
  )

  if(!reference) {
    console.error('No reference element supplied. See docs for implementation details.')
    return null
  }

  const handleMouseEnter = (event) => {
    mouseenterTimeout = setTimeout(() => {
      setShow(true)
    }, TOOLTIP_TIMEOUT)
  }

  const handleMouseLeave = (event) => {
    clearTimeout(mouseenterTimeout)
    setTimeout(() => {
      setShow(false)
    }, TOOLTIP_TIMEOUT)
  }

  return (
    <PopperManager>
      <PopperReference>
        {({ ref }) => (
          <span
            className="pb_tooltip_reference_wrapper"
            ref={ref}
          >
            <reference.type
              onMouseEnter={handleMouseEnter}
              {...reference.props}
            />
          </span>
        )}
      </PopperReference>
      <If condition={usePortal}>
        {ReactDOM.createPortal(
          tooltipComponent,
          document.querySelector(portal)
        )}
        <Else />
        {tooltipComponent}
      </If>
    </PopperManager>
  )
}

export default Tooltip
