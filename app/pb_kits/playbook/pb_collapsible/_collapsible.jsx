import React from 'react'
import { Card } from '../'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type CollapsibleProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
}

const Collapsible = (props: CollapsibleProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_collapsible'), className, globalProps(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {className}
      <Card>{'Card content'}</Card>
    </div>
  )
}

export default Collapsible
