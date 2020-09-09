/* @flow */
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { List } from  '../'

type ListRadiosProps = {
  aria?: object,
  children?: Node,
  className?: string,
  data?: object,
  id?: string,
}

const ListRadios = (props: ListRadiosProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const classes = classnames(buildCss('pb_list_radios'), className, globalProps(props))
  const dataProps = buildDataProps(data)

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
