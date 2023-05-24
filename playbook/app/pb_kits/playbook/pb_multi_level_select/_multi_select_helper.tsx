import React from "react";
import Select from "../pb_select/_select"; 

type HelperProps = {
  id?: string;
  treeData?: { [key: string]: string }[];
  treeMode?: boolean;
  onChange?: any;
};

const MultiSelectHelper = (props: HelperProps) => {
  const { id, treeData, onChange, treeMode } = props;

  return (
    <Select
      options={treeData}
      id={id}
      isMulti={treeMode}
      onChange={onChange}
      placeholder="Select..."
    />
  );
};

export default MultiSelectHelper;
