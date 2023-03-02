import React, { useState } from "react"
import MultiLevelSelect from "./_multi_level_select"

type ContainerProps = {
  className?: string
  data?: { [key: string]: string }
  id?: string
  onChange?: () => {}
  treeData?: { [key: string]: string }[]
}

const Container = (props: ContainerProps) => {
  const { treeData, onChange } = props
  const [formattedData, setFormattedData] = useState(treeData)

  const handleChange = (currentNode: any, selectedNodes: ReactNode) => {
    if (currentNode._children && currentNode.checked) {
      console.log(currentNode)
    }

    console.log(selectedNodes)
  }

  return <MultiLevelSelect onChange={handleChange} {...props} />
}
