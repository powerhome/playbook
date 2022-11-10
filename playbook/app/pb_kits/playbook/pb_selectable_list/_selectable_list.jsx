/* @flow */
import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import List from  '../pb_list/_list'
import SelectableListItem from './_item.jsx'

type SelectableListProps = {
  aria?: object,
  children?: Node,
  className?: string,
  data?: object,
  id?: string,
  variant?: 'checkbox' | 'radio',
}

const SelectableList = (props: SelectableListProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const classes = classnames(buildCss('pb_selectable_list_kit'), globalProps(props), className)
  const dataProps = buildDataProps(data)
  const isRadio = props.variant === "radio"
  const [selectedRadioValue, setSelectedRadioValue] = useState()
  
  const onChangeRadioValue = (event) => {
    setSelectedRadioValue(event.target.value)
  }

  let newChildren = children

  useEffect(() => {
    if (isRadio) {
      newChildren = children.map(({props}) => {
        return (
          <SelectableListItem
              {...props}
              className={classnames(selectedRadioValue === props.value ? "checked_item" : "", props.className)}
              key={props.value}
              onChange={(evt) => { onChangeRadioValue(evt); props?.onChange?.(evt); }}
          />
        )
      })
    }
  }, []);
  
  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <List {...props}>
        {newChildren}
      </List>
    </div>
  )
}

SelectableList.Item = SelectableListItem

export default SelectableList
