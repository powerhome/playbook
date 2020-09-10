/* @flow */

import React, { Node } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Radio } from '..'

type SelectableListItemProps = {
  aria?: object,
  children: array<Node> | Node,
  checked?: boolean,
  className?: string,
  data?: object,
  id?: string,
  name?: string,
  text?: string,
  value?: string,
  onChange: (boolean)=>void,
}

const SelectableListItem = ({
  aria = {},
  className,
  children,
  data = {},
  id,
  text = '',
  name = '',
  value = '',
  onChange = () => {},
  ...props
}: SelectableListItemProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_selectable_list_item_kit'), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        htmlFor={id}
    >
      <Radio
          {...props}
          id={id}
          name={name}
          onChange={onChange}
          text={text}
          type="radio"
          value={value}
      />
      {children}
    </div>
  )
}

export default SelectableListItem
