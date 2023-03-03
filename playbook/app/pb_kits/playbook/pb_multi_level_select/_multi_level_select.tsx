import React, {useState} from "react"
import classnames from "classnames"
import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props"
import { globalProps } from "../utilities/globalProps"
import { findItemById, checkIt, unCheckIt } from "./helper_functions"
import MultiSelectHelper from "./_multi_select_helper"

type MultiLevelSelectProps = {
  aria?: { [key: string]: string }
  className?: string
  data?: { [key: string]: string }
  id?: string
  treeData?: { [key: string]: string }[]
  onChange?: any
  onSelect?: (SelectedNodes:{[key: string]: any;})=>void
}

const MultiLevelSelect = (props: MultiLevelSelectProps) => {
  const { aria = {}, className, data = {}, id, treeData, onSelect } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss("pb_multi_level_select"),
    globalProps(props),
    className
  )

  const [formattedData, setFormattedData] = useState(treeData)
  const [selectedItems, setSelectedItems] =useState()

  const onChange = (currentNode: { [key: string]: any }, selectedNodes: any) => {
    const updatedData = formattedData.map((item: { [key: string]: any }) => {
      if (item.id === currentNode._id) {
        if (currentNode.checked) {
          item.checked = true
          checkIt(item)
        } else {
          item.checked = false
          unCheckIt(item)
        }
        
      } else if (item.children) {
        const foundItem = findItemById(item.children, currentNode._id)
        if (foundItem && currentNode.checked) {
          foundItem.checked = true
          checkIt(foundItem)
        } else if ( foundItem && !currentNode.checked) {
          foundItem.checked = false
          unCheckIt(foundItem)
        }
      }
      return item
    })
    setFormattedData(updatedData)
    setSelectedItems(selectedNodes)
    onSelect(selectedItems)
  }

  return (
    <div {...ariaProps} {...dataProps} className={classes} id={id}>
      <MultiSelectHelper
        treeData={formattedData}
        id={id}
        onChange={onChange}
        onSelect={onSelect}
        {...props}
      />
    </div>
  )
}

export default MultiLevelSelect
