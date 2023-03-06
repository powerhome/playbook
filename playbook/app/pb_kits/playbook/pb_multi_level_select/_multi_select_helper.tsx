import React from "react"
import DropdownTreeSelect from "react-dropdown-tree-select"
import "react-dropdown-tree-select/dist/styles.css"

type HelperProps = {
  id?: string
  treeData?: { [key: string]: string }[]
  onChange?: () => {}

}

const MultiSelectHelper = (props: HelperProps) => {
  const { id, treeData, onChange } = props


  return (
      <DropdownTreeSelect
        data={treeData}
        id={id}
        keepOpenOnSelect
        keepTreeOnSearch
        keepChildrenOnSearch
        onChange={onChange}
        texts={{ placeholder: "Select..." }}
        mode='hierarchical'
      />
  )
}

export default MultiSelectHelper