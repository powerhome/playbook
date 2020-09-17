/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

import { Body, Title } from '../'

type LegendProps = {
  aria?: object,
  className?: string,
  color?: | "data_1"
    | "data_2"
    | "data_3"
    | "data_4"
    | "data_5"
    | "data_6"
    | "data_7",
  dark?: boolean,
  data?: object,
  id?: string,
  prefixText?: string,
  text: string,
}

const Legend = (props: LegendProps) => {
  const {
    aria = {},
    className,
    color = 'data_1',
    dark = false,
    data = {},
    id,
    prefixText,
    text,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const bodyCss = classnames(
    buildCss('pb_legend_kit', color),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={bodyCss}
        id={id}
    >
      <Body color={dark ? 'lighter' : 'light'}>
        <span className="pb_legend_indicator_circle" />
        <If condition={prefixText}>
          <Title
              dark={dark}
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
