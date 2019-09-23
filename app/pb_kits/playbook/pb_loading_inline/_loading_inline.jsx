/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type LoadingInlineProps = {
  align?: String,
  className?: String,
  dark?: Boolean,
  data?: String,
  id?: String,
  
}

const LoadingInline = ({ align, className, dark, data, id }: LoadingInlineProps) => (
  <div>
    {`kit content`}
  </div>
)

export default LoadingInline
