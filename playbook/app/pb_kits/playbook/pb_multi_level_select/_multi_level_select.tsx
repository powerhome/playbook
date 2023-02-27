import React, {useState} from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import { TreeSelect } from "antd";

type MultiLevelSelectProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  id?: string,
  treeData?: any[]
}

const { SHOW_PARENT } = TreeSelect;


const MultiLevelSelect = (props: MultiLevelSelectProps) => {
  const {
    aria = {},
  className,
  data = {},
  id,
  treeData
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_multi_level_select'), globalProps(props), className)

  const [value, setValue] = useState([]);

  const onChange = (newValue: string[]) => {
    console.log("onChange ", value);
    setValue(newValue);
  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%"
    }
  };
  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <TreeSelect {...tProps} />
    </div>
  )
}

export default MultiLevelSelect
