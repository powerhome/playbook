

/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import {List, Radio} from  '../'

type ListRadiosProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  children?:Node,
}

const ListRadios = (props: ListRadiosProps) => {
  const {
  aria = {},
  className,
  data = {},
  id,
  children,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_list_radios'), className, globalProps(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
    <List>
      {children}
    </List>
    </div>
  )
}

export default ListRadios
