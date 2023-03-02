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

  console.log(formattedData)
  const onChange = (currentNode: any, selectedNodes: any) => {
    if (currentNode._children && currentNode.checked) {
      console.log(currentNode)
    }

    console.log(selectedNodes)
  }

  return <MultiLevelSelect onChange={onChange} {...props} />
}

export default Container
