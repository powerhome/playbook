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
  callback?: () => void,
  className?: string,
  continuous?: boolean,
  data?: object,
  id?: string,
  run?: boolean,
  steps?: array,
  stepIndex?: number,
  debug?: Boolean,
  disableCloseOnEsc?: Boolean,
  disableOverlay?: Boolean,
  disableOverlayClose?: Boolean,
  disableScrolling?: Boolean,
  floaterProps?: object,
  hideBackButton?: Boolean,
  hideCloseButton?: Boolean,
  showProgress?: Boolean,
  showSkipButton?: Boolean,
  spotlightClicks?: Boolean,
  spotlightPadding?: number,
  styles?: object,
}

type TooltipProps = {
  continuous?: Boolean,
  className?: String,
  index?: number,
  isLastStep?: Boolean,
  size?: number,
  step?: object,
  skip?: Boolean,
  backProps?: object,
  closeProps?: object,
  primaryProps?: object,
  skipProps?: object,
  tooltipProps?: object,
}

// type BeaconProps = {
//   onClick?: () => void,
//   onMouseEnter?: () => void,
//   ref?: () => void,
//   title?: String,
//   className?: String,
// }

const Tooltip = React.forwardRef((props: TooltipProps, ref) => (
  <div
      {...props.tooltipProps}
  >
    <Card
        borderNone
        maxWidth="sm"
        padding="none"
    >
      {props.step.title && <div>
        <Flex
            align="center"
            justify="between"
            padding="xs"
        >
          <Title
              paddingLeft="xs"
              size={4}
          >
            {props.step.title}
          </Title>
          {props.skip && (<Button
              {...props.skipProps}
              id="skip"
              text="Skip Tour"
              variant="link"
                          />)}
          <Button
              {...props.skipProps}
              id="skip"
              text="Skip Tour"
              variant="link"
          />
        </Flex>
        <SectionSeparator />
        </div>}

      <Flex padding="sm">{props.step.content}</Flex>
      <SectionSeparator />
      <Flex
          justify={props.index == 0 ? 'end' : 'between'}
          padding="xs"
      >

        {props.index > 0 && (
          <Button
              {...props.backProps}
              id="back"
              text="Back"
          />
        )}
        <Choose>
          <When condition={props.continuous && !props.isLastStep}>
            <Button
                {...props.primaryProps}
                id="next"
                text="Next"
            />
          </When>
          <When condition={!props.continuous}>
            <Button
                {...props.closeProps}
                id="close"
                text="Close"
            />
          </When>
          <Otherwise>
            <Button
                {...props.closeProps}
                id="close"
                text="Close"
            />
          </Otherwise>
        </Choose>
      </Flex>
    </Card>
  </div>
))

// const Beacon = (props: BeaconProps) => (
//   <span
//       {...props}
//       className="pb_walkthrough_beacon"
//   >
//     <span className="inner" />
//     <span className="outer" />
//   </span>
// )

const Walkthrough = (props: WalkthroughProps) => {
  const {
    aria = {},
    callback,
    className,
    continuous = false,
    data = {},
    id,
    run = false,
    steps,
    showSkipButton,
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
          callback={callback}
          continuous={continuous}
          disableScrolling
          run={run}
          showSkipButton={showSkipButton}
          steps={steps}
          tooltipComponent={Tooltip}
          {...props}
      />
    </div>
  )
}

export default Walkthrough
