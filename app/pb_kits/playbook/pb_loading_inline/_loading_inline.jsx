/* @flow */

import React from 'react'

import {
  Body,
  Icon,
} from '../'

type LoadingInlineProps = {
  align?: 'left' | 'center' | 'right',
  className?: String,
  dark?: Boolean,
  data?: String,
  id?: String,
}

const LoadingInline = ({
  align = 'left',
}: LoadingInlineProps) => (
  <div className={`pb_loading_inline_kit_${align}`}>
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

export default LoadingInline
