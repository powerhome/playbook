/* eslint-disable react/no-multi-comp */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
// import Joyride, { TooltipRenderProps } from 'react-joyride'
import Button from '../pb_button/_button'
import Flex from '../pb_flex/_flex'
import SectionSeparator from '../pb_section_separator/_section_separator'
import Title from '../pb_title/_title'

type WalkthroughProps = {
  aria?: { [key: string]: string },
  callback?: () => void,
  className?: string,
  continuous?: boolean,
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  run?: boolean,
  steps?: [],
  stepIndex?: number,
  debug?: boolean,
  disableCloseOnEsc?: boolean,
  disableOverlay?: boolean,
  disableOverlayClose?: boolean,
  disableScrolling?: boolean,
  floaterProps?: Record<string, unknown>,
  hideBackButton?: boolean,
  hideCloseButton?: boolean,
  showProgress?: boolean,
  showSkipButton?: boolean,
  spotlightClicks?: boolean,
  spotlightPadding?: number,
  styles?: {
    options: {
      beaconSize?: number,
      arrowColor?: string,
      backgroundColor?: string,
      primaryColor?: string,
      overlayColor?: string,
      spotlightShadow?: string,
      width?: number,
      zIndex?: number,
    },
  },
}

type TooltipProps = {
  continuous?: boolean,
  className?: string,
  index?: number,
  isLastStep?: boolean,
  size?: number,
  step: {
    title?: string,
    content?: React.ReactNode[] | React.ReactNode | string,
    target: string,
    disableBeacon?: boolean,
  },
  skip?: boolean,
  backProps?: Record<string, unknown>,
  closeProps?: Record<string, unknown>,
  primaryProps?: Record<string, unknown>,
  skipProps?: Record<string, unknown>,
  tooltipProps?: Record<string, unknown>,
}

// eslint-disable-next-line react/display-name
const Tooltip = React.forwardRef((props: TooltipProps) => (
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
      {props.skip && (
      <Button
          {...props.skipProps}
          id="skip"
          text="Skip Tour"
          variant="link"
      />
      )}
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

  {props.continuous && !props.isLastStep &&
      <Button
          {...props.primaryProps}
          id="next"
          text="Next"
      />
  }

  {!props.continuous &&
      <Button
          {...props.closeProps}
          id="close"
          text="Close"
      />
  }

  {!((props.continuous && !props.isLastStep) || (!props.continuous)) &&
      <Button
          {...props.closeProps}
          id="close"
          text="Close"
      />
  }
  </Flex>
</div>
)) as unknown as React.ForwardRefRenderFunction<HTMLDivElement, TooltipRenderProps>

const Walkthrough = (props: WalkthroughProps): React.ReactElement => {
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
    htmlOptions = {},
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
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss('pb_walkthrough'), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {/* <Joyride
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
      /> */}
    </div>

  )
}

export default Walkthrough
