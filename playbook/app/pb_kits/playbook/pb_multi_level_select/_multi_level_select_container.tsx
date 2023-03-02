import React, { useState } from "react"
import MultiLevelSelect from "./_multi_level_select"

type ContainerProps = {
  className?: string
  data?: { [key: string]: string }
  id?: string
  onChange?: any
  treeData?: { [key: string]: string }[]
}
const Container = (props: ContainerProps) => {
  const { treeData } = props
  const [formattedData, setFormattedData] = useState(treeData)

  const iterateIt = (item2:any)=> {
    item2.children.map((x:any) => {
      x.checked = true
      x.children ? (
        iterateIt(x)
      ):null
      return x
     })   

  }
  const onChange = (currentNode: any, selectedNodes: any) => {
    if (currentNode._children && currentNode.checked) {

      formattedData.forEach((item:any) => {
        item.children.map((item2:any) => {
          item2.id === currentNode._id && (item2.checked = true)
          item2.id === currentNode._id && item2.children ? (
            iterateIt(item2)
           ):null
           return item2
          })
          setFormattedData([item])
        })             
    }
    console.log(selectedNodes)
  }

  return <MultiLevelSelect treeData={formattedData} onChange={onChange} {...props} />
}

export default Container
