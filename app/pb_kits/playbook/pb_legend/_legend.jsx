/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

import { Body, Title } from '../'

type LegendProps = {
  color?: | "data_1"
    | "data_2"
    | "data_3"
    | "data_4"
    | "data_5"
    | "data_6"
    | "data_7",
  dark?: Boolean,
  prefixText?: String,
  text: String,
}

const Legend = (props: LegendProps) => {
  const { color = 'data_1', dark = false, prefixText, text } = props
  const darkClass = dark ? 'dark' : 'light'
  const bodyCSS = classnames(
    buildCss('pb_legend_kit', color, darkClass),
    spacing(props)
  )

  return (
    <div className={bodyCSS}>
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
