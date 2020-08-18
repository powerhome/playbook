

/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Card, Checkbox } from '../'

type CheckboxCardProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
}

const CheckboxCard = (props: CheckboxCardProps) => {
  const {
  aria = {},
  children,
  className,
  data = {},
  id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_checkbox_card'), className, globalProps(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Card>
        <Checkbox>
          {children}
        </Checkbox>
      </Card>
    </div>
  )
}

export default CheckboxCard
