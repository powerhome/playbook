/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Icon } from '../'

import { globalProps } from '../utilities/globalProps.js'

type LoadingInlineProps = {
  align?: "left" | "center" | "right",
  className?: string,
  dark?: Boolean,
  data?: string,
  id?: string,
}

const LoadingInline = (props: LoadingInlineProps) => {
  const { align = 'left' } = props
  return (
    <div
        className={classnames(`pb_loading_inline_kit_${align}`, globalProps(props))}
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
