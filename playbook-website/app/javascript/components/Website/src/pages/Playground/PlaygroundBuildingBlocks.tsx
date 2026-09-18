import React, { type KeyboardEvent } from "react";
import { Caption, Card, Flex, FlexItem, Title } from "playbook-ui";

import {
  PLAYGROUND_BUILDING_BLOCKS,
  type BuildingBlock,
} from "./buildingBlocks";

type PlaygroundBuildingBlocksProps = {
  activeBuildingBlockId: string | null;
  onSelect: (block: BuildingBlock) => void;
};

export const PlaygroundBuildingBlocks = ({
  activeBuildingBlockId,
  onSelect,
}: PlaygroundBuildingBlocksProps) => {
  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    block: BuildingBlock,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(block);
    }
  };

  return (
    <Flex
        className="full-playground-building-blocks"
        gap="sm"
        orientation="column"
        width="100%"
    >
      <Caption
          color="lighter"
          text="Building blocks"
      />
      <Flex
          gap="sm"
          orientation="row"
          width="100%"
      >
        {PLAYGROUND_BUILDING_BLOCKS.map((block) => {
          const isActive = block.id === activeBuildingBlockId;

          return (
            <FlexItem
                flex={1}
                key={block.id}
                minWidth="0"
            >
              <Card
                  className={`full-playground-building-blocks__card${
                    isActive ? " is-active" : ""
                  }`}
                  cursor="pointer"
                  htmlOptions={{
                    "aria-label": `Load ${block.name} as a playground starting point`,
                    "aria-pressed": isActive,
                    onClick: () => onSelect(block),
                    onKeyDown: (event: KeyboardEvent<HTMLElement>) =>
                      handleCardKeyDown(event, block),
                    role: "button",
                    tabIndex: 0,
                  }}
                  padding="md"
                  selected={isActive}
                  width="100%"
              >
                <Flex
                    align="center"
                    justify="between"
                >
                  <Title
                      size={4}
                      text={block.name}
                      variant="link"
                  />
                </Flex>
              </Card>
            </FlexItem>
          );
        })}
      </Flex>
    </Flex>
  );
};
