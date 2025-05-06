import React, { useEffect, useRef, useContext } from "react";

import AdvancedTableContext from "../Context/AdvancedTableContext";
import Card from "../../pb_card/_card";
import Caption from "../../pb_caption/_caption";
import Flex from "../../pb_flex/_flex";
import FlexItem from "../../pb_flex/_flex_item";
import Dropdown from "../../pb_dropdown/_dropdown";
import DropdownContainer from "../../pb_dropdown/subcomponents/DropdownContainer";
import DropdownTrigger from "../../pb_dropdown/subcomponents/DropdownTrigger";
import Icon from "../../pb_icon/_icon";
import Checkbox from "../../pb_checkbox/_checkbox";

import {
  showActionBar,
  hideActionBar,
} from "../Utilities/ActionBarAnimationHelper";

interface TableActionBarProps {
  isVisible: boolean;
  selectedCount: number;
  actions?: React.ReactNode[] | React.ReactNode;
  type?: string;
}

const TableActionBar: React.FC<TableActionBarProps> = ({
  isVisible,
  selectedCount,
  actions,
  type = "row-selection",
}) => {
  const cardRef = useRef(null);
  const { table, columnVisibilityControl, columnDefinitions } =
    useContext(AdvancedTableContext);
  const includeIds = columnVisibilityControl?.includeIds;

  const columns = table
    .getAllLeafColumns()
    .filter((col) => !includeIds?.length || includeIds.includes(col.id));
  useEffect(() => {
    if (cardRef.current) {
      if (isVisible) {
        showActionBar(cardRef.current);
      } else {
        hideActionBar(cardRef.current);
      }
    }
  }, [isVisible]);

  return (
    <Card
        borderNone={!isVisible}
        className={`${
          isVisible && "show-action-card row-selection-actions-card"
        }`}
        htmlOptions={{ ref: cardRef as any }}
        padding={`${isVisible ? "xs" : "none"}`}
    >
      <Flex
          alignItems="center"
          justify={type === "row-selection" ? "space-between" : "end"}
      >
        {type === "row-selection" ? (
          <>
            <Caption color="light" 
                paddingLeft="xs" 
                size="xs"
            >
              {selectedCount} Selected
            </Caption>
            <FlexItem>{actions}</FlexItem>
          </>
        ) : (
          <Dropdown
              className="column-visibility-dropdown-wrapper"
              options={columnDefinitions}
          >
            <DropdownTrigger>
              <Icon 
                  color="primary" 
                  cursor="pointer" 
                  icon="sliders" 
              />
            </DropdownTrigger>
            <DropdownContainer
                className="column-visibility-dropdown"
                padding="xs"
            >
              {columns.map((col) => (
                <Flex cursor="pointer" 
                    flexDirection="column" 
                    key={col.id}
                    padding="xs"
                >
                  <Checkbox
                      checked={col.getIsVisible()}
                      onChange={() => col.toggleVisibility()}
                      text={col.columnDef.header}
                  />
                </Flex>
              ))}
            </DropdownContainer>
          </Dropdown>
        )}
      </Flex>
    </Card>
  );
};

export default TableActionBar;
