/* @flow */

import React, { Node } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Radio } from '../'

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
  onChange: (boolean)=>void,
}

const ListRadioItem = ({
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

export default ListRadioItem
