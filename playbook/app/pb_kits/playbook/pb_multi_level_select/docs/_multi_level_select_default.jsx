import React from "react"
import Container from "../_multi_level_select_container"
import { treeData } from "./data.ts"

const MultiLevelSelectDefault = (props) => {
  return (
    <div>
      <Container
          id='multiselect-default'
          treeData={treeData}
          {...props}
      />
    </div>
  )
}

export default MultiLevelSelectDefault
