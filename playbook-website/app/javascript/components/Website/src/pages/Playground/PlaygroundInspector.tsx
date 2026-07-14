import React from "react";
import { Body, Button, Caption, Card, Dropdown, Flex, Title } from "playbook-ui";

import { PropsPanel } from "../KitShow/Tabs/Playground";
import type { PropValue } from "../KitShow/Tabs/Playground";
import { panelDropdownClassName } from "../KitShow/Tabs/Playground/playgroundPanelControls";
import { acceptsChildren } from "./kitUtils";
import type { BuilderPropsPanelState } from "./useBuilderPropsPanel";
import type { BuilderInstance, PlaygroundKit } from "./types";

type DropdownOption = {
  id: string;
  label: string;
  value: string;
};

type PlaygroundInspectorProps = {
  activeDataPresetOption: DropdownOption | undefined;
  activeSelectedInstanceOption: DropdownOption;
  activeStructureModeOption: DropdownOption | undefined;
  builderPropsPanel: BuilderPropsPanelState;
  dataPresetDropdownOptions: DropdownOption[];
  instanceOptionsCount: number;
  selectedDataPresetOptionsCount: number;
  selectedId: string | null;
  selectedInstance: BuilderInstance | null;
  selectedInstanceOptions: DropdownOption[];
  selectedKit?: PlaygroundKit;
  selectedStructureModeOptionsCount: number;
  structureModeDropdownOptions: DropdownOption[];
  onAddInsideSelected: () => void;
  onChildrenChange: (value: string) => void;
  onDataPresetChange: (value: string | null) => void;
  onMoveSelected: (direction: -1 | 1) => void;
  onPropChange: (name: string, value: PropValue) => void;
  onRemoveSelected: () => void;
  onSelectedInstanceChange: (id: string | null) => void;
  onStructureModeChange: (value: string | null) => void;
};

export const PlaygroundInspector = ({
  activeDataPresetOption,
  activeSelectedInstanceOption,
  activeStructureModeOption,
  builderPropsPanel,
  dataPresetDropdownOptions,
  instanceOptionsCount,
  selectedDataPresetOptionsCount,
  selectedId,
  selectedInstance,
  selectedInstanceOptions,
  selectedKit,
  selectedStructureModeOptionsCount,
  structureModeDropdownOptions,
  onAddInsideSelected,
  onChildrenChange,
  onDataPresetChange,
  onMoveSelected,
  onPropChange,
  onRemoveSelected,
  onSelectedInstanceChange,
  onStructureModeChange,
}: PlaygroundInspectorProps) => (
  <Flex
      alignSelf="start"
      className="full-playground-inspector"
      gap="md"
      justifySelf="stretch"
      maxWidth="500px"
      minWidth="0"
      orientation="column"
      width="auto"
  >
    <Card
        className="playground-panel-controls"
        padding="md"
    >
      <Title
          marginBottom="sm"
          size={4}
          text="Inspector"
      />
      {instanceOptionsCount > 0 && (
        <Flex
            className="builder-field"
            gap="xs"
            marginBottom="sm"
            orientation="column"
        >
          <Caption text="Selected kit" />
          <Dropdown
              className={panelDropdownClassName("playground-panel", !!selectedId)}
              clearable={false}
              defaultValue={activeSelectedInstanceOption}
              id="playground-selected-kit-dropdown"
              key={selectedId ?? "none"}
              onSelect={(option: { value: string } | null): null => {
              onSelectedInstanceChange(option?.value || null);
              return null;
            }}
              options={selectedInstanceOptions}
              placeholder="Choose a placed kit"
              width="100%"
          />
        </Flex>
      )}

      {!selectedInstance || !selectedKit ? (
        <Body
            color="light"
            text={
            instanceOptionsCount > 0
              ? "Choose a placed kit to edit props and order."
              : "Add a kit to start editing props and order."
          }
        />
      ) : (
        <Flex
            gap="sm"
            orientation="column"
            width="100%"
        >
          <Button
              fullWidth
              icon="trash"
              onClick={onRemoveSelected}
              text="Remove Selected Kit"
              variant="secondary"
          />
          {acceptsChildren(selectedKit) && (
            <Button
                icon="plus"
                onClick={onAddInsideSelected}
                size="sm"
                text="Add kits inside this"
                variant="secondary"
            />
          )}

          {selectedDataPresetOptionsCount > 0 && (
            <Flex
                className="builder-field"
                gap="xs"
                marginBottom="sm"
                orientation="column"
                width="100%"
            >
              <Caption text="Data" />
              <Dropdown
                  className={panelDropdownClassName(
                  "playground-panel",
                  !!selectedInstance.dataPresetKey,
                )}
                  clearable={false}
                  defaultValue={activeDataPresetOption}
                  id="playground-data-preset-dropdown"
                  key={`${selectedInstance.id}-data-${selectedInstance.dataPresetKey ?? ""}`}
                  onSelect={(option: { value: string } | null): null => {
                  onDataPresetChange(option?.value || null);
                  return null;
                }}
                  options={dataPresetDropdownOptions}
                  width="100%"
              />
            </Flex>
          )}

          {selectedStructureModeOptionsCount > 1 && (
            <Flex
                className="builder-field"
                gap="xs"
                marginBottom="sm"
                orientation="column"
                width="100%"
            >
              <Caption text="Structure" />
              <Dropdown
                  className={panelDropdownClassName(
                  "playground-panel",
                  !!selectedInstance.structureMode,
                )}
                  clearable={false}
                  defaultValue={activeStructureModeOption}
                  id="playground-structure-mode-dropdown"
                  key={`${selectedInstance.id}-structure-${selectedInstance.structureMode ?? ""}`}
                  onSelect={(option: { value: string } | null): null => {
                  onStructureModeChange(option?.value || null);
                  return null;
                }}
                  options={structureModeDropdownOptions}
                  width="100%"
              />
            </Flex>
          )}

          <Flex gap="xs">
            <Button
                icon="arrow-up"
                onClick={() => onMoveSelected(-1)}
                size="sm"
                text="Up"
                variant="secondary"
            />
            <Button
                icon="arrow-down"
                onClick={() => onMoveSelected(1)}
                size="sm"
                text="Down"
                variant="secondary"
            />
          </Flex>
        </Flex>
      )}
    </Card>

    {selectedInstance && selectedKit && (
      <PropsPanel
          // PropsPanel uses `children` as an editable code string prop.
          // eslint-disable-next-line react/no-children-prop
          children={builderPropsPanel.children}
          globalProps={builderPropsPanel.globalProps}
          groupedGlobalProps={builderPropsPanel.groupedGlobalProps}
          groupedProps={builderPropsPanel.groupedProps}
          onChildrenChange={onChildrenChange}
          onPropChange={onPropChange}
          playgroundConfig={builderPropsPanel.playgroundConfig}
          propDisabledState={builderPropsPanel.propDisabledState}
          propSyncHints={builderPropsPanel.propSyncHints}
          propValues={builderPropsPanel.displayPropValues}
          requiredPropNames={builderPropsPanel.requiredPropNames}
          showChildren={builderPropsPanel.showChildren}
          showGlobalProps={builderPropsPanel.showGlobalProps}
          totalProps={builderPropsPanel.totalProps}
      />
    )}
  </Flex>
);
