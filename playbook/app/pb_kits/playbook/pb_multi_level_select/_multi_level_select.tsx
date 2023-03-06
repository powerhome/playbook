import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import { findItemById, checkIt, unCheckIt } from "./helper_functions";
import MultiSelectHelper from "./_multi_select_helper";

type MultiLevelSelectProps = {
  aria?: { [key: string]: string };
  className?: string;
  data?: { [key: string]: string };
  id?: string;
  treeData?: { [key: string]: string }[];
  onChange?: any;
  selectedData?: (prop: { [key: string]: any }) => {};
};

const MultiLevelSelect = (props: MultiLevelSelectProps) => {
  const { 
    aria = {}, 
    className, 
    data = {}, 
    id, 
    treeData, 
    selectedData =()=>{}
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const classes = classnames(
    buildCss("pb_multi_level_select"),
    globalProps(props),
    className
  );

  const [formattedData, setFormattedData] = useState(treeData);
  const [selectedItems, setSelectedItems] = useState([]);

  const onChange = (currentNode: { [key: string]: any }) => {
    const updatedData = formattedData.map((item: any) => {
      if (item.id === currentNode._id) {
        if (currentNode.checked) {
          checkIt(item, selectedItems, setSelectedItems);
        } else {
          unCheckIt(item, selectedItems, setSelectedItems);
        }
      } else if (item.children) {
        const foundItem = findItemById(item.children, currentNode._id);
        if (foundItem) {
          if (currentNode.checked) {
            checkIt(foundItem, selectedItems, setSelectedItems);
          } else {
            unCheckIt(foundItem, selectedItems, setSelectedItems);
          }
        }
      }

      return item;
    });

    setFormattedData(updatedData);
  };

  useEffect(() => {
    const selected = selectedItems.filter(
      (item: { [key: string]: any }) => item.checked
    );
    //filter to remove duplicate items
    const uniqueSelected = selected.filter(
      (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
    );
    selectedData(uniqueSelected);
  }, [selectedItems]);

  return (
    <div {...ariaProps} {...dataProps} className={classes} id={id}>
      <MultiSelectHelper
        treeData={formattedData}
        id={id}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default MultiLevelSelect;
