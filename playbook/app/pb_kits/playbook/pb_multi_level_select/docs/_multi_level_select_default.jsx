import React from "react"
import MultiLevelSelect from "../_multi_level_select"
import { treeData } from "./data.ts"

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
