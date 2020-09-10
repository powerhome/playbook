/* @flow */

import React from 'react'
import { Card } from '..'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type CollapsibleCardProps = {
  children: React.ChildrenArray<React.Element<typeof Main | Content>>,
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  dark?: Boolean
}

const CollapsibleCard = (props: CollapsibleCardProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    dark = false,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_collapsible_card'), className, globalProps(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {className}
      <Card dark={dark}>
        {'Card'}
      </Card>
    </div>
  )
}

export default CollapsibleCard
