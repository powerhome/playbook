/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */

/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import Joyride from 'react-joyride'
import Button from '../pb_button/_button'
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
  styles?: {
    options: {
      beaconSize?: Number,
      arrowColor?: String,
      backgroundColor?: String,
      primaryColor?: String,
      overlayColor?: String,
      spotlightShadow?: String,
      width?: Number,
      zIndex?: Number,
    },
  },
}

type TooltipProps = {
    continuous?: Boolean,
    className?: String,
    index?: number,
    isLastStep?: Boolean,
    size?: number,
    step: {
      title?: String,
      content?: array<React.ReactNode> | React.ReactNode | String,
      target: String,
      disableBeacon?: Boolean,
    },
    skip?: Boolean,
    backProps?: object,
    closeProps?: object,
    primaryProps?: object,
    skipProps?: object,
    tooltipProps?: object,
  }

const Tooltip = React.forwardRef((props: TooltipProps, ref) => (
  <div
      className="pb_card_kit_border_none p_none"
      {...props.tooltipProps}
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
  </div>
))

const Walkthrough = (props: WalkthroughProps) => {
  const {
    aria = {},
    callback,
    className,
    continuous = false,
    data = {},
    disableOverlay,
    floaterProps = {
      offset: 50,
    },
    id,
    run = false,
    steps,
    styles = {
      options: {
        zIndex: 20000,
      },
    },
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
          disableOverlay={disableOverlay}
          disableScrolling
          floaterProps={floaterProps}
          run={run}
          showSkipButton={showSkipButton}
          steps={steps}
          styles={styles}
          tooltipComponent={Tooltip}
          {...props}
      />
    </div>

  )
}

export default Walkthrough
