import React, { useEffect, useRef, useContext, useState } from "react";

import AdvancedTableContext from "../Context/AdvancedTableContext";
import { buildVisibilityTree } from "../Utilities/VisibilityTree";

import Card from "../../pb_card/_card";
import Caption from "../../pb_caption/_caption";
import Flex from "../../pb_flex/_flex";
import FlexItem from "../../pb_flex/_flex_item";
import Icon from "../../pb_icon/_icon";
import Checkbox from "../../pb_checkbox/_checkbox";
import SectionSeparator from "../../pb_section_separator/_section_separator";
import Tooltip from "../../pb_tooltip/_tooltip";
import PbReactPopover from "../../pb_popover/_popover";

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

interface VisibilityNode {
  id?: string | undefined;
  label?: string | undefined;
  children?: VisibilityNode[];
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
  const firstLeafId = table.getAllLeafColumns()[0]?.id;
  // Get the first leaf column ID to exclude it from the visibility tree
  // This is to avoid showing the first column in the dropdown
  // as toggling it's visibility breaks the expanded row functionality
  const tree = buildVisibilityTree(columnDefinitions, includeIds).filter(node => node.id !== firstLeafId);

  const renderLeaf = (id: string, label: string) => {
    const col   = table.getColumn(id);
    const show  = col.getIsVisible();

    const handleVisibilityChange = () => {
      col.toggleVisibility();
      if (columnVisibilityControl?.onColumnVisibilityChange) {
        const updatedVisibilityState = {
          ...table.getAllColumns().reduce((acc: { [x: string]: any; }, col: { id: string | number; getIsVisible: () => any; }) => {
            acc[col.id] = col.getIsVisible();
            return acc;
          }, {}),
        };
        columnVisibilityControl?.onColumnVisibilityChange(updatedVisibilityState);
      }
    };

    return (
      <Checkbox
          checked={show}
          key={id}
          onChange={handleVisibilityChange}
          paddingBottom="xs"
          text={label}
      />
    );
  };

  const gatherLeafIds = (node: VisibilityNode): string[] =>
    node.children && node.children.length
      ? node.children.flatMap(gatherLeafIds)
      : node.id
      ? [node.id]
      : [];

  const renderGroup = (node: VisibilityNode ) => {
     const leaves = gatherLeafIds(node);
    const visibleArray   = leaves.map((id) => table.getColumn(id).getIsVisible());
    const allOn    = visibleArray.every(Boolean);
    const someOn   = visibleArray.some(Boolean);

       const handleGroupVisibilityChange = () => {
      leaves.forEach((id) => table.getColumn(id).toggleVisibility(!allOn));
      if (columnVisibilityControl?.onColumnVisibilityChange) {
        const updatedVisibilityState = {
          ...table.getAllColumns().reduce((acc: { [x: string]: any; }, col: { id: string | number; getIsVisible: () => any; }) => {
            acc[col.id] = col.getIsVisible();
            return acc;
          }, {}),
        };
        columnVisibilityControl?.onColumnVisibilityChange(updatedVisibilityState);
      }
    };
    return (
      <>
        <Checkbox
            checked={allOn}
            indeterminate={!allOn && someOn}
            onChange={handleGroupVisibilityChange}
            paddingBottom="xs"
            text={node.label}
        />
        <Flex flexDirection="column"
            paddingLeft="lg"
        >
          {node?.children?.map((child) =>
            child.children ? renderGroup(child) : renderLeaf(child.id, child.label),
          )}
        </Flex>
      </>
    );
  };
// ------------ End of column visibility logic --------

  useEffect(() => {
    if (cardRef.current && type === "row-selection") {
      if (isVisible) {
        showActionBar(cardRef.current);
      } else {
        hideActionBar(cardRef.current);
      }
    }
  }, [isVisible, type]);

  const [showPopover, setShowPopover] = useState(false)

  const togglePopover = () => setShowPopover((prev) => !prev)
  const handleShouldClose = (shouldClose: boolean) =>
    setShowPopover(!shouldClose)

  const popoverReference = (
    <Tooltip
        placement="top"
        text="Column Configuration"
    >
      <div onClick={togglePopover}>
      <Icon
          color="primary"
          cursor="pointer"
          icon="sliders-h"
      />
      </div>
    </Tooltip>
  )

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
          <PbReactPopover
              closeOnClick="outside"
              placement="bottom-end"
              reference={popoverReference}
              shouldClosePopover={handleShouldClose}
              show={showPopover}
              zIndex={3}
          >
            <>
              <Caption
                  paddingY="sm"
                  text="Columns Config"
                  textAlign="center"
              />
              <SectionSeparator paddingBottom="xs" />
              {tree.map((node: VisibilityNode) => (
                <Flex cursor="pointer"
                    flexDirection="column"
                    key={node.id}
                    paddingX="xs"
                >
                  {node.children ? renderGroup(node) : renderLeaf(node.id, node.label)}
                </Flex>
              ))}
              </>
          </PbReactPopover>
        )}
      </Flex>
    </Card>
  );
};

export default TableActionBar;
