/* eslint-disable react/display-name */

/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import Joyride from 'react-joyride'
// import CircleIconButton from '../pb_circle_icon_button/_circle_icon_button'
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

const Tooltip = React.forwardRef((props: TooltipProps, ref) => (
// const {
//   continuous,
//   index,
//   step,
//   backProps,
//   closeProps,
//   primaryProps,
//   tooltipProps,
// } = props
// return (

  <div
      {...props.tooltipProps}
      ref={ref}
  >
    <Card
        borderNone
        className="walkthrough_tooltip"
        padding="none"
    >
      {props.step.title && <div>
        <Flex padding="sm">
          <Title size={4}>{props.step.title}</Title>
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
        <Button {...props.backProps}>
          <div id="back">{'Back'}</div>
        </Button>
    )}
        {props.continuous && (
        <Button {...props.primaryProps}>
          <div id="next">{'Next'}</div>
        </Button>
    )}
        {!props.continuous && (
        <Button {...props.closeProps}>
          <div id="close">{'Close'}</div>
        </Button>
    )}
      </Flex>
    </Card>
  </div>

// )
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
      />
    </div>
  )
}

export default Walkthrough
