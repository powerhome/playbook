/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */

/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import CircleIconButton from '../pb_circle_icon_button/_circle_icon_button'
import Button from '../pb_button/_button'
import Card from '../pb_card/_card'
import Flex from '../pb_flex/_flex'
import SectionSeparator from '../pb_section_separator/_section_separator'
import Title from '../pb_title/_title'

type WalkthroughProps = {
  aria?: object,
  callback?: function,
  className?: string,
  continuous?: boolean,
  data?: object,
  id?: string,
  run?: boolean,
  steps?: array,
  stepIndex?: number,
}

// type BeaconProps = {
//   locale?: string,
//   onClickorHover?: function,
//   title?: string,
// }

type TooltipProps = {
  continuous?: Boolean,
  index?: number,
  isLastStep?: Boolean,
  size?: number,
  step?: object,
  backProps?: object,
  closeProps?: object,
  primaryProps?: object,
  skipProps?: object,
  tooltipProps?: object,
}

// const Beacon = React.forwardRef((props: BeaconProps, ref) => (
//   <CircleIconButton
//       icon="pen"
//       variant="secondary"
//       {...props}
//   />
// ))
// const [state, setState] = useState({
//   stepIndex: 0,
//   continuous: false,
// })
const Tooltip = React.forwardRef((props: TooltipProps, ref) => (

  <div
      {...props.tooltipProps}
  >
    <Card
        borderNone
        className="walkthrough_tooltip"
        padding="none"
    >
      {props.step.title && <div>
        <Flex
            align="center"
            justify="between"
            padding="xs"
        >
          <Title size={4}>{props.step.title}</Title>
          <CircleIconButton
              icon="times"
              size="sm"
              variant="link"
          />
        </Flex>
        <SectionSeparator />
      </div>}

      <Flex padding="sm">{props.step.content}</Flex>
      <SectionSeparator />
      <Flex
          justify="between"
          padding="sm"
      >
        {props.index > 0 && (
          <Button
              {...props.backProps}
              id="back"
              text="Back"
          />
        )}
        {props.continuous &&  (
          <Button
              {...props.primaryProps}
              id="next"
              text="Next"
          />
        )}
        {!props.continuous && (
          <Button
              {...props.closeProps}
              id="close"
              text="Close"
          />
        )}
      </Flex>
    </Card>
  </div>
))

const Walkthrough = (props: WalkthroughProps) => {
  const {
    aria = {},
    className,
    continuous = true,
    data = {},
    id,
    run = false,
    steps,
    callback = () => null,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_walkthrough'), globalProps(props), className)
  const settings = {
    stepIndex: null,
  }
  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Joyride
          //beaconComponent={Beacon}
          callback={callback}
          continuous={continuous}
          run={run}
          steps={steps}
          tooltipComponent={Tooltip}
          {...settings}
      />
    </div>
  )
}

export default Walkthrough
