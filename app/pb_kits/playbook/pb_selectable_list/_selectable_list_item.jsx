/* @flow */

import React, { Node, useState } from 'react'
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
  defaultChecked?: boolean,
  id?: string,
  label?: string,
  name?: string,
  text?: string,
  value?: string,
  variant?: string,
  onChange: (boolean)=>void,
}

const SelectableListItem = ({
  aria = {},
  checked = false,
  children,
  className,
  data = {},
  defaultChecked,
  id,
  label,
  name = '',
  text,
  value = '',
  variant,
  onChange = () => {},
  ...props
}: SelectableListItemProps) => {
  const [checkboxHighlight, setCheckboxHighlight] = useState(checked ? 'checked' : 'unchecked')

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_selectable_list_item_kit'),
    globalProps(props),
    className
  )

  const handleChange = (event) => {
    setCheckboxHighlight(checkboxHighlight === 'checked' ? 'unchecked' : 'checked')
    event.ugh = 'fixme'
    return onChange
  }

  return (
    <ListItem
        {...props}
        className={checkboxHighlight}
    >
      <div
          {...ariaProps}
          {...dataProps}
          className={classes}
          htmlFor={id}
      >
        <Choose>
          <When condition={variant == 'checkbox'}>
            <Checkbox
                checked={checked}
                id={id}
                name={name}
                onChange={handleChange}
                text={label || text}
                type="checkbox"
                value={value}
                {...props}
            />
            {children}
          </When>
          <When condition={variant == 'radio'}>
            <Radio
                defaultChecked={defaultChecked}
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
