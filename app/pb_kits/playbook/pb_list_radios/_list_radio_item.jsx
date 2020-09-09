/* @flow */

import React, { Node } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { ListItem, Radio } from '../'

type ListRadioItemProps = {
  aria?: object,
  children: array<Node> | Node,
  checked?: boolean,
  className?: string,
  data?: object,
  id?: string,
  tabIndex?: string,
  name?: string,
  text?: string,
  value?: string,
  tabIndex?: string,
  onChange: (boolean)=>void,
}

const ListRadioItem = ({
  aria = {},
  checked = false,
  className,
  children,
  data = {},
  id,
  text = '',
  name = '',
  value = '',
  tabIndex,
  onChange = () => {},
  ...props
}: ListRadioItemProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_list_radios_kit'), globalProps(props), className)

  return (
    <div
      {...ariaProps}
      {...dataProps}
      className={classes}
      htmlFor={id}
    >
      <Radio
        {...props}
        name={name}
        text={text}
        onChange={onChange}
        value={value}
        id={id}
        type="radio"
      />
      {children}
    </div>
  )

}

export default ListRadioItem
