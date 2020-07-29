/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Icon } from '../'

import { systemProps } from '../utilities/systemProps.js'

type LoadingInlineProps = {
  align?: "left" | "center" | "right",
  className?: String,
  dark?: Boolean,
  data?: String,
  id?: String,
}

const LoadingInline = (props: LoadingInlineProps) => {
  const { align = 'left' } = props
  return (
    <div
        className={classnames(`pb_loading_inline_kit_${align}`, systemProps(props))}
    >
      <Body color="light">
        <Icon
            fixedWidth
            icon="spinner"
            pulse
        />
        {' Loading'}
      </Body>
    </div>
  )
}

export default LoadingInline
