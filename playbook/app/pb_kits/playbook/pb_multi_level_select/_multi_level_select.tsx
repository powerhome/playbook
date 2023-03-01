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

// console.log(treeData)
  // const prepareData = (treeData:any) => {

  //   // insert special select all node
  //   treeData.splice(0, 0, {
  //     label: "Select All",
  //     value: "selectAll",
  //     className: "select-all"
  //   });

  //   return treeData;
  // };

  // const [customData, setCustomData]= useState(treeData)

  // const toggleAll = (checked:any) => {
  //   for (var i = 1; i < customData.length; i++) {
  //     customData[i].checked = checked;
  //   }
  //   setCustomData(customData);
  // };

  // const handleChange = ({ value, checked }:any) => {
  //   if (value === "selectAll") toggleAll(checked);
  //   console.log(customData)
  // };
  const onChange = (currentNode:any, selectedNodes:ReactNode) => {
    console.log('onChange:', currentNode, selectedNodes)

    // currentNode.checked && currentNode._children && (
    //   console.log(currentNode._children)
      
    // )
  }
  const onAction = (node:ReactNode, action:any) => {
    console.log('onAction:', action, node)
  }
  const onNodeToggle = (currentNode:ReactNode) => {
    console.log('onNodeToggle:', currentNode)
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
