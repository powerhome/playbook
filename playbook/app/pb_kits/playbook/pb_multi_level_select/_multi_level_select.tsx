import React, { useState, useEffect, useMemo } from "react";
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
  returnAllSelected?: boolean;
  treeData?: { [key: string]: string }[];
  onSelect?: (prop: { [key: string]: any }) => void;
};

const MultiLevelSelect = (props: MultiLevelSelectProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    returnAllSelected = false,
    treeData,
    onSelect = () => {},
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
  const [checkedData, setCheckedData] = useState([]);

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
    if (returnAllSelected) {
      const selected = selectedItems.filter(
        (item: { [key: string]: any }) => item.checked
      );
      //filter to remove duplicate items
      const uniqueSelected = selected.filter(
        (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
      );
      setCheckedData(uniqueSelected);
    }
  }, [selectedItems]);

  useEffect(() => {
    let el = document.getElementById(`pb_data_wrapper_${id}`);
    if (el) {
      el.setAttribute("data-tree", JSON.stringify(checkedData));
    }
    if (returnAllSelected) {
      onSelect(checkedData);
    }
  }, [checkedData]);

  const DropDownSelectComponent = useMemo(() => {
    return (
      <MultiSelectHelper
        treeData={formattedData}
        onChange={(
          // @ts-ignore
          selectedNodes: { [key: string]: any }[],
          currentNode: { [key: string]: any }[]
        ) => {
          setCheckedData(currentNode);
          onSelect(currentNode);
        }}
        id={id}
        {...props}
      />
    );
  }, [formattedData])

  return (
    <div {...ariaProps} {...dataProps} className={classes} id={id}>
      {returnAllSelected ? (
        <MultiSelectHelper
          treeData={formattedData}
          treeMode={returnAllSelected}
          id={id}
          onChange={onChange}
          {...props}
        />
      ) : (
        <>{DropDownSelectComponent}</>
      )}
    </div>
  );
};

export default MultiLevelSelect;
