/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

import { Body, Title } from '../'

type LegendProps = {
  aria?: object,
  className?: String,
  color?: | "data_1"
    | "data_2"
    | "data_3"
    | "data_4"
    | "data_5"
    | "data_6"
    | "data_7",
  data?: object,
  id?: String,
  prefixText?: String,
  text: String,
}

const Legend = (props: LegendProps) => {
  const {
    aria = {},
    className,
    color = 'data_1',
    data = {},
    id,
    prefixText,
    text,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const bodyCss = classnames(
    buildCss('pb_legend_kit', color), className,
    globalProps(props)
  )
  const bodyColor = bodyCss.includes('dark') ? 'lighter' : 'light'

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={bodyCss}
        id={id}
    >
      <Body color={bodyColor}>
        <span className="pb_legend_indicator_circle" />
        <If condition={prefixText}>
          <Title
              size={4}
              tag="span"
              text={` ${prefixText} `}
          />
        </If>
        {` ${text} `}
      </Body>
    </div>
  )
}

export default Legend
