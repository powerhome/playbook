import React from "react";
import {
  Caption,
  Card,
  Dropdown,
  Flex,
  Icon,
  TextInput,
  Title,
  Tooltip,
} from "playbook-ui";

import { panelDropdownClassName } from "../KitShow/Tabs/Playground/playgroundPanelControls";
import { formatKitName } from "./kitUtils";
import type { PlaygroundKit } from "./types";

type DropdownOption = {
  id: string;
  label: string;
  value: string;
};

type PlaygroundSidebarProps = {
  activeAddTargetId: string;
  activeAddTargetOption: DropdownOption;
  addTargetOptions: DropdownOption[];
  draggedKitName: string | null;
  filteredKits: PlaygroundKit[];
  searchQuery: string;
  onAddKit: (kit: PlaygroundKit) => void;
  onAddTargetChange: (value: string) => void;
  onDragEnd: () => void;
  onKitDragStart: (
    kitName: string,
    event: React.DragEvent<HTMLButtonElement>
  ) => void;
  onSearchQueryChange: (value: string) => void;
};

export const PlaygroundSidebar = ({
  activeAddTargetId,
  activeAddTargetOption,
  addTargetOptions,
  draggedKitName,
  filteredKits,
  searchQuery,
  onAddKit,
  onAddTargetChange,
  onDragEnd,
  onKitDragStart,
  onSearchQueryChange,
}: PlaygroundSidebarProps) => (
  <Flex
      className="full-playground-sidebar"
      gap="md"
      minWidth="0"
      orientation="column"
      width="100%"
  >
    <Card
        className="playground-panel-controls"
        padding="md"
        width="100%"
    >
      <Title
          marginBottom="sm"
          size={4}
          text="Add Kits"
      />
      <Flex
          className="builder-field"
          gap="xs"
          marginBottom="sm"
          orientation="column"
      >
        <Flex
            align="center"
            gap="xs"
        >
          <Caption
              color="lighter"
              text="Where to add the kit"
          />
          <Tooltip text="Once you add a kit that accepts children, you can add more kits inside it">
            <Icon
                color="lighter"
                icon="circle-info"
                size="xs"
            />
          </Tooltip>
        </Flex>
        <Dropdown
            className={panelDropdownClassName("playground-panel", true)}
            clearable={false}
            defaultValue={activeAddTargetOption}
            id="playground-add-target-dropdown"
            key={activeAddTargetId}
            onSelect={(option: { value: string }): null => {
            onAddTargetChange(option.value);
            return null;
          }}
            options={addTargetOptions}
            placeholder="Main canvas"
            width="100%"
        />
      </Flex>
      <Flex
          className={
          searchQuery.trim() ? "playground-panel-control--filled" : undefined
        }
          orientation="column"
          width="100%"
      >
        <TextInput
            label="Search kits"
            name="playgroundKitSearch"
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
            onSearchQueryChange((event.target as HTMLInputElement).value)
          }
            placeholder="Search configured kits"
            value={searchQuery}
        />
      </Flex>
      <Flex
          className="builder-kit-list"
          gap="xs"
          maxHeight="520px"
          orientation="column"
          overflow="auto"
          paddingRight="xxs"
      >
        {filteredKits.map((kit) => (
          <button
              className={`builder-kit-button ${
              draggedKitName === kit.name ? "is-dragging" : ""
            }`}
              draggable
              key={kit.name}
              onClick={() => onAddKit(kit)}
              onDragEnd={onDragEnd}
              onDragStart={(event) => onKitDragStart(kit.name, event)}
              type="button"
          >
            <Flex
                align="center"
                gap="sm"
                width="100%"
            >
              <Icon icon="plus" />
              <Caption
                  color="lighter"
                  text={formatKitName(kit.name)}
              />
            </Flex>
          </button>
        ))}
      </Flex>
    </Card>
  </Flex>
);
