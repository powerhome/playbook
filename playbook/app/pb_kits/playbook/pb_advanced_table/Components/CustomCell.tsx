import React, { useContext } from "react";

import Flex from "../../pb_flex/_flex";
import FlexItem from "../../pb_flex/_flex_item";
import Icon from "../../pb_icon/_icon";
import { GlobalProps } from "../../utilities/globalProps";

import { Getter, Row } from "@tanstack/react-table";
import { DataType } from "../Utilities/types";
import AdvancedTableContext from "../Context/AdvancedTableContext";

interface CustomCellProps {
  row: Row<DataType>;
  getValue?: Getter<string>;
  value?: string;
  onRowToggleClick?: (arg: Row<DataType>) => void;
} 

export const CustomCell = ({
  row,
  getValue,
  value,
  onRowToggleClick,
}: CustomCellProps & GlobalProps) => {
  const { setExpanded, expanded } = useContext(AdvancedTableContext);
  const RowWithoutChildren = row.originalSubRows === undefined;

  const handleOnExpand = (row: Row<DataType>) => {
    onRowToggleClick && onRowToggleClick(row);
    setExpanded({ ...expanded, [row.id]: !row.getIsExpanded() });
  };

  return (
    <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
      <Flex alignItems="center" 
          columnGap="xs"
          orientation="row"
      >
        {!RowWithoutChildren ? (
          <button
              className="gray-icon expand-toggle-icon"
              onClick={() => handleOnExpand(row)}
          >
            {row.getIsExpanded() ? (
              <Icon icon="circle-play" 
                  rotation={90}
              />
            ) : (
              <Icon icon="circle-play" />
            )}
          </button>
        ) : null}
        <FlexItem paddingLeft={!RowWithoutChildren ? "none" : "xs"}>
          {row.depth === 0 ? getValue() : value}
        </FlexItem>
      </Flex>
    </div>
  );
};
