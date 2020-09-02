
/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Checkbox, SelectableCard } from '../'
import { noop } from '../utilities/props'

type CheckboxCardProps = {
  aria?: object,
  children?: array<React.ReactNode> | React.ReactNode,
  className?: string,
  disabled?: Boolean,
  data?: object,
  id?: string,
  text?: string,
  checked?: boolean,
  children?: array<React.ReactChild>,
  onChange: InputCallback<HTMLInputElement>
}

const CheckboxCard = (props: CheckboxCardProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    checked = false,
    disabled = false,
    children = [],
    onChange = noop,
    text = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_checkbox_card'), className, globalProps(props))

  // console.log(children)
  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <SelectableCard
          disabled={disabled}
          onChange={onChange}
          selected={checked}
      >
        <Checkbox
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            text={text}
        />

        { children}

      </SelectableCard>
    </div>

  // <div
  //     {...ariaProps}
  //     {...dataProps}
  //     className={classes}
  //     id={id}
  // >
  //   <Card {...props} selected={isChecked}>
  //     <Checkbox {...props} checked={isChecked} onChange={checkboxChanged}/>
  //   </Card>
  // </div>
  )
}

export default CheckboxCard
