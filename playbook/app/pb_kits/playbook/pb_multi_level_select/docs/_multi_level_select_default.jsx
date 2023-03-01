import React from "react"
import { MultiLevelSelect } from "../../"
import { treeData } from "./data"

const MultiLevelSelectDefault = (props) => {
  return (
    <div>
      <MultiLevelSelect
          id='multiselect-default'
          treeData={treeData}
          {...props}
      />
    </div>
  )
}

export default MultiLevelSelectDefault
