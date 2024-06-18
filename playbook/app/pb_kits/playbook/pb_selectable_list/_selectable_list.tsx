import React, { useState } from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import { SelectableListItemProps } from './_item.js'

import List from  '../pb_list/_list'
import SelectableListItem from './_item'
import { GenericObject } from '../types'

type SelectableListProps = {
  aria?: {[key: string]: string },
  children?: React.ReactElement[],
  className?: string,
  data?: GenericObject,
  enableDrag?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  variant?: 'checkbox' | 'radio',
}

const SelectableList = (props: SelectableListProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    enableDrag = false,
    htmlOptions = {},
    id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const classes = classnames(buildCss('pb_selectable_list_kit'), globalProps(props), className)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const isRadio = props.variant === "radio"
  const defaultCheckedRadioValue = children.filter((item: {props:SelectableListItemProps} ) => item.props.defaultChecked)[0]?.props?.value

  const [selectedRadioValue, setSelectedRadioValue] = useState(defaultCheckedRadioValue)
  
  const onChangeRadioValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioValue(target.value)
  }

  let selectableListItems = children

  if (isRadio) {
    selectableListItems = children.map(( {props}: {props:SelectableListItemProps} ) => {
      return (
        <SelectableListItem
            {...props}
            className={classnames(selectedRadioValue === props.value ? "checked_item" : "", props.className)}
            key={props.value}
            onChange={evt => { onChangeRadioValue(evt); props?.onChange?.(evt); }}
        />
      )
    })
  }

  
  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <List enableDrag={enableDrag}
          variant={props.variant}
      >
        {selectableListItems}
      </List>
    </div>
  )
}
 
SelectableList.Item = SelectableListItem

export default SelectableList
