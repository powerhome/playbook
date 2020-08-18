

/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Card, Checkbox } from '../'

type CheckboxCardProps = {
  aria?: object,
  children?: array<React.ReactNode> | React.ReactNode,
  className?: string,
  data?: object,
  id?: string,
  text?: string,
}

const CheckboxCard = (props: CheckboxCardProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    dark = false,
    id,
    checked = false,
    text = '',
  } = props

  const [isChecked, setIsChecked] = useState(checked)
  const checkboxChanged = e => {
    e.persist()
    setIsChecked(e.target.checked)
  }

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
      <Card dark selected={isChecked}>
        <Checkbox dark checked={isChecked} onChange={checkboxChanged}/>
        {children || text}
      </Card>
    </div>
  )
}

export default CheckboxCard
