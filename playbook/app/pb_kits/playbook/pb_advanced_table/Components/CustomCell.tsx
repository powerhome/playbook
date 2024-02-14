import React, { useContext } from "react";

import Flex from "../../pb_flex/_flex";
import FlexItem from "../../pb_flex/_flex_item";
import Icon from "../../pb_icon/_icon";
import { GlobalProps } from "../../utilities/globalProps";

import { Getter, Row } from "@tanstack/react-table";
import { DataType } from "../Utilities/types";
import AdvancedTableContext from "../Context/AdvancedTableContext";

interface CustomCellProps {
  addExpandButton?: boolean;
  getValue?: Getter<string>;
  onRowToggleClick?: (arg: Row<DataType>) => void;
  row: Row<DataType>;
  value?: string;
} 

export const CustomCell = ({
  addExpandButton = true,
  getValue,
  onRowToggleClick,
  row,
  value,
}: CustomCellProps & GlobalProps) => {
  const { setExpanded, expanded } = useContext(AdvancedTableContext);

  const handleOnExpand = (row: Row<DataType>) => {
    onRowToggleClick && onRowToggleClick(row);
    setExpanded({ ...expanded, [row.id]: !row.getIsExpanded() });
  };

  return (
    <div style={{ paddingLeft: `${row.depth * 1.25}em` }}>
      <Flex alignItems="center" 
          columnGap="xs"
          orientation="row"
      >
        {addExpandButton ? (
          <button
              className="gray-icon expand-toggle-icon"
              onClick={() => handleOnExpand(row)}
          >
            {row.getIsExpanded() ? (
              <Icon cursor="pointer"
                  icon="circle-play"
                  rotation={90}
              />
            ) : (
              <Icon cursor="pointer"
                  icon="circle-play"    
               />
            )}
          </button>
        ) : null}
        <FlexItem paddingLeft={addExpandButton? "none" : "xs"}>
          {row.depth === 0 ? getValue() : value}
        </FlexItem>
      </Flex>
    </div>
  );
};
