/* @flow */

import React, { type Node } from 'react'
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

const ListRadioItem = (props: ListRadioItemProps) => {
  const {
    aria = {},
    checked = false,
    className,
    text = '',
    name = '',
    value = '',
    tabIndex,
    onChange = () => {},
  } = props

  return (
    <div>
        <ListItem>
          <Radio
            {...props}
            checked={checked}
            onChange={onChange}
            />
        </ListItem>
    </div>
  )
}

export default ListRadioItem