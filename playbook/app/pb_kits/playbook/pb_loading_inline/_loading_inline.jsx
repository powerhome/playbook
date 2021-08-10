/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Icon from '../pb_icon/_icon'
type LoadingInlineProps = {
  align?: "left" | "center" | "right",
  className?: string,
  dark?: boolean,
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
            aria={{ label: 'loading icon' }}
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
