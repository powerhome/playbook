/* @flow */

import React from 'react'
import classnames from 'classnames'

type FlexProps = {
  className?: String,
  horizontal?: 'left' | 'center' | 'right' | 'stretch',
  id?: String,
  inline?: Boolean,
  orientation?: 'row' | 'column',
  spacing?: 'around' | 'between' | 'evenly' | 'non',
  reverse?: Boolean,
  vertical?: 'top' | 'center' | 'bottom' | 'stretch',
  wrap?: Boolean,
}

const flexCSS = () => {
  return 'pb_flex_kit'
}

const Flex = ({
  className,
}: FlexProps) => (
  <div className={classnames(flexCSS(), className)}>
    {'kit content'}
  </div>
)

export default Flex
