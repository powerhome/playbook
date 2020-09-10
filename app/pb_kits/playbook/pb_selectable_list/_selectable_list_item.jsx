/* @flow */

import React, { Node } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Checkbox, ListItem, Radio } from '..'

type SelectableListItemProps = {
  aria?: object,
  children: array<Node> | Node,
  checked?: boolean,
  className?: string,
  data?: object,
  id?: string,
  label?: string,
  name?: string,
  value?: string,
  variant?: string,
  onChange: (boolean)=>void,
}

const SelectableListItem = ({
  aria = {},
  className,
  children,
  data = {},
  id,
  label,
  name = '',
  value = '',
  variant,
  onChange = () => {},
  ...props
}: SelectableListItemProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_selectable_list_item_kit'), globalProps(props), className)

  return (

    <ListItem {...props}>
      <div
          {...ariaProps}
          {...dataProps}
          className={classes}
          htmlFor={id}
      >
        <Choose>
          <When condition={variant == 'checkbox'}>
            <Checkbox
                id={id}
                label={label}
                name={name}
                onChange={onChange}
                type="checkbox"
                value={value}
                {...props}
            />
            {children}
          </When>
          <When condition={variant == 'radio'}>
            <Radio
                id={id}
                label={label}
                name={name}
                onChange={onChange}
                type="radio"
                value={value}
                {...props}
            />
            {children}
          </When>
          <Otherwise>{children}</Otherwise>
        </Choose>

      </div>
    </ListItem>
  )
}

export default SelectableListItem
