import React, { useEffect, useRef } from "react";
import Card from "../../pb_card/_card";
import Caption from "../../pb_caption/_caption";
import Flex from "../../pb_flex/_flex";
import FlexItem from "../../pb_flex/_flex_item";
import { showActionBar, hideActionBar } from "../Utilities/ActionBarAnimationHelper";

interface TableActionBarProps {
  isVisible: boolean;
  selectedCount: number;
  actions?: React.ReactNode[] | React.ReactNode;
}

const TableActionBar: React.FC<TableActionBarProps> = ({
  isVisible,
  selectedCount,
  actions
}) => {
  const cardRef = useRef(null);

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
        className={`${isVisible && "show-action-card row-selection-actions-card"}`}
        htmlOptions={{ ref: cardRef as any }}
        padding={`${isVisible ? "xs" : "none"}`}
    >
      <Flex
          alignItems="center"
          justify="between"
      >
        <Caption
            color="light"
            paddingLeft="xs"
            size="xs"
        >
          {selectedCount} Selected
        </Caption>
        <FlexItem>{actions}</FlexItem>
      </Flex>
    </Card>
  );
};

export default TableActionBar;
