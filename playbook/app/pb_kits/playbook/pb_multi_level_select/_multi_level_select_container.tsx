import React, { useState } from "react"
import MultiLevelSelect from "./_multi_level_select"

type ContainerProps = {
  className?: string
  data?: { [key: string]: string }
  id?: string
  onChange?: any
  treeData?: { [key: string]: string }[]
}
const findItemById = (items: { [key: string]: any }[], id: string) :any => {
  for (const item of items) {
    if (item.id === id) {
      return item
    }
    if (item.children) {
      const found = findItemById(item.children, id)
      if (found) {
        return found
      }
    }
  }
  return null
}

const Container = (props: ContainerProps) => {
  const { treeData } = props
  const [formattedData, setFormattedData] = useState(treeData)

  const checkIt = (foundItem: { [key: string]: any }) => {
    foundItem.children.map((x: { [key: string]: any }) => {
      x.checked = true
    if (x.children) {
      checkIt(x)
    }
      return x
    })
  }

  const unCheckIt = (foundItem: { [key: string]: any }) => {
    foundItem.children.map((x: any) => {
      x.checked = false
    if (x.children) {
      unCheckIt(x)
    }
      return x
    })
  }


  const onChange = (currentNode: { [key: string]: any }, selectedNodes: { [key: string]: any }) => {
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
    console.log(selectedNodes)
  }

  return (
    <MultiLevelSelect treeData={formattedData} onChange={onChange} {...props} />
  )
}

export default Container
