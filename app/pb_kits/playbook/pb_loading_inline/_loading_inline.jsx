/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

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
  align='left',
  className,
  dark=false,
  data,
  id
}: LoadingInlineProps) => (
  <div className={`pb_loading_inline_kit_${align}`}>
    <Body color="light">
      <Icon fixedWidth pulse icon="spinner" />&nbsp;
      {`Loading`}
    </Body>
  </div>
)

export default LoadingInline
