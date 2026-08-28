import React, { useState } from "react";
import { Body, Button, Caption, Card, Dropdown, Flex, Title, Icon, Tooltip } from "playbook-ui";

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
  isSelectMode: boolean;
  multiSelectedCount: number;
  selectedDataPresetOptionsCount: number;
  selectedId: string | null;
  selectedInstance: BuilderInstance | null;
  selectedInstanceOptions: DropdownOption[];
  selectedKit?: PlaygroundKit;
  selectedStructureModeOptionsCount: number;
  structureModeDropdownOptions: DropdownOption[];
  wrapDiagnostic: string | null;
  wrappableKitOptions: DropdownOption[];
  onAddInsideSelected: () => void;
  onChildrenChange: (value: string) => void;
  onClearMultiSelect: () => void;
  onDataPresetChange: (value: string | null) => void;
  onMoveSelected: (direction: -1 | 1) => void;
  onPropChange: (name: string, value: PropValue) => void;
  onRemoveSelected: () => void;
  onSelectedInstanceChange: (id: string | null) => void;
  onStructureModeChange: (value: string | null) => void;
  onWrap: (wrapperKitName: string) => void;
};

export const PlaygroundInspector = ({
  activeDataPresetOption,
  activeSelectedInstanceOption,
  activeStructureModeOption,
  builderPropsPanel,
  dataPresetDropdownOptions,
  instanceOptionsCount,
  isSelectMode,
  multiSelectedCount,
  selectedDataPresetOptionsCount,
  selectedId,
  selectedInstance,
  selectedInstanceOptions,
  selectedKit,
  selectedStructureModeOptionsCount,
  structureModeDropdownOptions,
  wrapDiagnostic,
  wrappableKitOptions,
  onAddInsideSelected,
  onChildrenChange,
  onClearMultiSelect,
  onDataPresetChange,
  onMoveSelected,
  onPropChange,
  onRemoveSelected,
  onSelectedInstanceChange,
  onStructureModeChange,
  onWrap,
}: PlaygroundInspectorProps) => {
  const [wrapTargetKitName, setWrapTargetKitName] = useState<string | null>(null);
  const activeWrapTargetOption =
    wrappableKitOptions.find((option) => option.value === wrapTargetKitName) ??
    undefined;

  const handleWrapClick = () => {
    if (wrapTargetKitName) onWrap(wrapTargetKitName);
  };

  const wrapControls = (
    <Flex
        className="builder-field"
        gap="xs"
        orientation="column"
        width="100%"
    >
      <Flex align="center" gap="xs"><Caption text="Wrap Selected Kits" /> 
      <Tooltip text="Toggle the 'Select Kits to Wrap' control to wrap selected kits within a new kit">
      <Icon icon="circle-info" />
      </Tooltip>
      </Flex>
      <Flex gap="xs" width="100%">
        <Dropdown
            className={panelDropdownClassName("playground-panel", !!wrapTargetKitName)}
            clearable={false}
            defaultValue={activeWrapTargetOption}
            id="playground-wrap-target-dropdown"
            onSelect={(option: { value: string } | null): null => {
            setWrapTargetKitName(option?.value || null);
            return null;
          }}
            options={wrappableKitOptions}
            placeholder="Choose a wrapper kit"
            width="100%"
        />
        <Button
            disabled={!wrapTargetKitName || (isSelectMode && multiSelectedCount === 0)}
            icon="layer-group"
            onClick={handleWrapClick}
            text="Wrap"
            variant="secondary"
            size="sm"
        />
      </Flex>
      {wrapDiagnostic && (
        <Caption
            color="error"
            text={wrapDiagnostic}
        />
      )}
    </Flex>
  );

  return (
    <Flex
        alignSelf="start"
        className="full-playground-inspector"
        gap="md"
        justifySelf="stretch"
        maxWidth="sm"
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
        {isSelectMode ? (
          <Flex
              gap="sm"
              orientation="column"
              width="100%"
          >
            <Caption
                color="lighter"
                text={
                multiSelectedCount > 0
                  ? `${multiSelectedCount} kit${multiSelectedCount === 1 ? "" : "s"} selected`
                  : "Click kits on the canvas to select them"
              }
            />
            {wrapControls}
            <Button
                disabled={multiSelectedCount === 0}
                fullWidth
                icon="times"
                onClick={onClearMultiSelect}
                size="sm"
                text="Clear Selection"
                variant="secondary"
            />
          </Flex>
        ) : (
          <>
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
                    ? "Choose a placed kit to edit props and order. Turn on \"Select kits to wrap\" above the canvas to select several and wrap them together."
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
                      fullWidth
                      icon="plus"
                      onClick={onAddInsideSelected}
                      size="sm"
                      text="Add Kits inside Selected Kit"
                      variant="secondary"
                  />
                )}

                <Flex
                    gap="xs"
                    width="100%"
                >
                  <Button
                      icon="arrow-up"
                      onClick={() => onMoveSelected(-1)}
                      size="sm"
                      text="Move Kit Up"
                      variant="secondary"
                      width="100%"
                  />
                  <Button
                      icon="arrow-down"
                      onClick={() => onMoveSelected(1)}
                      size="sm"
                      text="Move Kit Down"
                      variant="secondary"
                      width="100%"
                  />
                </Flex>

                {wrapControls}

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
              </Flex>
            )}
          </>
        )}
      </Card>

      {!isSelectMode && selectedInstance && selectedKit && (
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
};
