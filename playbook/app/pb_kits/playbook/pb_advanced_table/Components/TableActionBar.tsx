import React, { useEffect, useRef, useContext } from "react";

import AdvancedTableContext from "../Context/AdvancedTableContext";
import { buildVisibilityTree } from "../Utilities/VisibilityTree";

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
import { GenericObject } from "../../types";

interface TableActionBarProps {
  isVisible: boolean | GenericObject | undefined;
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

  // ----------- Column visibility logic -----------
  const includeIds = columnVisibilityControl?.includeIds;
  const tree = buildVisibilityTree(columnDefinitions, includeIds);
  const renderLeaf = (id: string, label: string) => {
    const col   = table.getColumn(id);
    const show  = col.getIsVisible();

    return (
      <Checkbox
          checked={show}
          key={id}
          onChange={() => col.toggleVisibility()}
          paddingBottom="xs"
          text={label}
      />
    );
  };

  const renderGroup = (node) => {
    const leaves   = node.children.map((c) => (c.children ? [] : c.id)).flat();
    const visibleArray   = leaves.map((id) => table.getColumn(id).getIsVisible());
    const allOn    = visibleArray.every(Boolean);
    const someOn   = visibleArray.some(Boolean);

    return (
      <>
        <Checkbox
            checked={allOn}
            indeterminate={!allOn && someOn}
            onChange={() =>
              leaves.forEach((id) =>
                table.getColumn(id).toggleVisibility(!allOn),
              )
            }
            paddingBottom="xs"
            text={node.label}
        />
        <Flex flexDirection="column" 
            paddingLeft="xs"
        >
          {node.children.map((child) =>
            child.children ? renderGroup(child) : renderLeaf(child.id, child.label),
          )}
        </Flex>
      </>
    );
  };
// ------------ End of column visibility logic --------

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
          justify={type === "row-selection" ? "between" : "end"}
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
              {tree.map((node) => (
                <Flex cursor="pointer" 
                    flexDirection="column" 
                    key={node.id}
                >
                  {node.children ? renderGroup(node) : renderLeaf(node.id, node.label)}
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
