import React, { ReactNode } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

type MultiLevelSelectProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  id?: string,
  treeData?: { [key: string]: string }[],
}

const MultiLevelSelect = (props: MultiLevelSelectProps) => {
  const {
  aria = {},
  className,
  data = {},
  id,
  treeData,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_multi_level_select'), globalProps(props), className)

  const onChange = (currentNode:ReactNode, selectedNodes:ReactNode) => {
    console.log('Current node:',currentNode, 'Selected nodes:',selectedNodes)

  }
  const onAction = (node:ReactNode, action:any) => {
    console.log('onAction:', action, node)
  }
  const onNodeToggle = (currentNode:ReactNode) => {
    console.log('ToggledNode:', currentNode)
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
    <DropdownTreeSelect 
      data={treeData} 
      id={id}
      keepTreeOnSearch
      keepChildrenOnSearch
      onChange={onChange} 
      onAction={onAction} 
      onNodeToggle={onNodeToggle} 
      texts={{ placeholder: 'Select...' }}
      mode="hierarchical"
    />
    </div>
  )
}

export default MultiLevelSelect
