import React, { useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Background,
  Badge,
  Body,
  Button,
  Caption,
  Card,
  Dropdown,
  Flex,
  Icon,
  TextInput,
  Title,
  Tooltip,
} from "playbook-ui";

import { CodePanel, PropsPanel, ResponsivePreviewFrame } from "../KitShow/Tabs/Playground";
import type { PropValue } from "../KitShow/Tabs/Playground";
import { panelDropdownClassName } from "../KitShow/Tabs/Playground/playgroundPanelControls";
import { PLAYGROUND_ENABLED_KITS } from "../KitShow/playgroundEnabledKits";
import { BuilderPreviewItem } from "./BuilderPreviewItem";
import { generateCode } from "./codeGeneration";
import {
  acceptsChildren,
  createInstance,
  formatKitName,
  getConfiguredChildren,
  getDataPresetOptions,
  getRuntimeProps,
  getStructureModeOptions,
  getStructureModeProps,
  isRuntimeProp,
  shouldApplySyncValue,
} from "./kitUtils";
import { useBuilderPropsPanel, type BuilderPropsPanelState } from "./useBuilderPropsPanel";
import {
  buildInstanceOptions,
  buildTargetOptions,
  countInstances,
  findInstance,
  instanceContainsTarget,
  moveInstanceInTree,
  moveInstanceToTarget,
  removeInstanceFromTree,
  updateInstanceInTree,
} from "./treeUtils";
import type {
  BuilderInstance,
  PlaygroundKit,
  PlaygroundLoaderData,
} from "./types";
import { ROOT_TARGET_ID } from "./types";

import "./styles.scss";

export default function Playground() {
  const { global_props_schema, playground_kits = [] } =
    useLoaderData() as PlaygroundLoaderData;
  const [instances, setInstances] = useState<BuilderInstance[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [addTargetId, setAddTargetId] = useState(ROOT_TARGET_ID);
  const [dragOverTargetId, setDragOverTargetId] = useState<string | null>(null);
  const [draggedKitName, setDraggedKitName] = useState<string | null>(null);
  const [draggingInstanceId, setDraggingInstanceId] = useState<string | null>(null);
  const dragSourceElementRef = useRef<HTMLElement | null>(null);
  const dragOverTargetRef = useRef<string | null>(null);
  const dragTooltipRef = useRef<HTMLDivElement | null>(null);
  const draggingInstanceIdRef = useRef<string | null>(null);
  const hoverDragTargetRef = useRef<string | null>(null);

  const enabledPlaygroundKits = useMemo(
    () =>
      playground_kits.filter((kit) =>
        PLAYGROUND_ENABLED_KITS.includes(kit.name),
      ),
    [playground_kits],
  );

  const kitsByName = useMemo(() => {
    return enabledPlaygroundKits.reduce<Record<string, PlaygroundKit>>(
      (acc, kit) => {
        acc[kit.name] = kit;
        return acc;
      },
      {},
    );
  }, [enabledPlaygroundKits]);

  const filteredKits = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return [...enabledPlaygroundKits]
      .filter((kit) => {
        if (!query) return true;

        return [kit.name, kit.label, kit.category]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query));
      })
      .sort((a, b) =>
        formatKitName(a.name).localeCompare(formatKitName(b.name)),
      );
  }, [enabledPlaygroundKits, searchQuery]);

  const selectedInstance = findInstance(instances, selectedId);
  const selectedKit = selectedInstance
    ? kitsByName[selectedInstance.kitName]
    : undefined;
  const selectedDataPresetOptions = getDataPresetOptions(selectedKit);
  const selectedStructureModeOptions = getStructureModeOptions(selectedKit);
  const builderPropsPanel: BuilderPropsPanelState = useBuilderPropsPanel(
    selectedInstance,
    selectedKit,
    global_props_schema,
  );
  const targetOptions = useMemo(
    () => [
      { id: ROOT_TARGET_ID, label: "Main canvas" },
      ...buildTargetOptions(instances, kitsByName),
    ],
    [instances, kitsByName],
  );
  const instanceOptions = useMemo(
    () => buildInstanceOptions(instances, kitsByName),
    [instances, kitsByName],
  );
  const selectedInstanceOptions = useMemo(
    () => [
      { id: "none", label: "Choose a placed kit", value: "" },
      ...instanceOptions.map((option) => ({
        id: option.id,
        label: option.label,
        value: option.id,
      })),
    ],
    [instanceOptions],
  );
  const activeSelectedInstanceOption =
    selectedInstanceOptions.find(
      (option) => option.value === (selectedId ?? ""),
    ) ?? selectedInstanceOptions[0];
  const activeAddTargetId = targetOptions.some(
    (option) => option.id === addTargetId,
  )
    ? addTargetId
    : ROOT_TARGET_ID;
  const addTargetOptions = useMemo(
    () =>
      targetOptions.map((option) => ({
        id: option.id,
        label: option.label,
        value: option.id,
      })),
    [targetOptions],
  );
  const activeAddTargetOption =
    addTargetOptions.find((option) => option.value === activeAddTargetId) ??
    addTargetOptions[0];
  const dataPresetDropdownOptions = selectedDataPresetOptions.map((option) => ({
    id: option.key,
    label: option.label,
    value: option.key,
  }));
  const activeDataPresetOption =
    dataPresetDropdownOptions.find(
      (option) => option.value === (selectedInstance?.dataPresetKey ?? ""),
    ) ?? dataPresetDropdownOptions[0];
  const structureModeDropdownOptions = selectedStructureModeOptions.map(
    (option) => ({
      id: option.key,
      label: option.label,
      value: option.key,
    }),
  );
  const activeStructureModeOption =
    structureModeDropdownOptions.find(
      (option) => option.value === (selectedInstance?.structureMode ?? ""),
    ) ?? structureModeDropdownOptions[0];
  const generatedCode = generateCode(
    instances,
    kitsByName,
    global_props_schema?.props,
  );
  const instanceCount = countInstances(instances);

  const updateInstance = (
    id: string,
    updater: (instance: BuilderInstance) => BuilderInstance,
  ) => {
    setInstances((current) => updateInstanceInTree(current, id, updater));
  };

  const handleSelectInstance = (id: string) => {
    const instance = findInstance(instances, id);
    const kit = instance ? kitsByName[instance.kitName] : undefined;

    setSelectedId(id);
    if (acceptsChildren(kit)) {
      setAddTargetId(id);
    }
  };

  const addKit = (kit: PlaygroundKit, targetId = activeAddTargetId) => {
    const nextInstance = createInstance(kit, global_props_schema?.props);

    if (targetId === ROOT_TARGET_ID) {
      setInstances((current) => [...current, nextInstance]);
    } else {
      setInstances((current) =>
        updateInstanceInTree(current, targetId, (instance) => ({
          ...instance,
          children: [...instance.children, nextInstance],
        })),
      );
    }

    setSelectedId(nextInstance.id);
    if (acceptsChildren(kit)) {
      setAddTargetId(nextInstance.id);
    }
  };

  const handleDropKit = (kitName: string, targetId: string) => {
    const kit = kitsByName[kitName];
    if (!kit) return;

    addKit(kit, targetId);
  };

  const canDropIntoTarget = (targetId: string) => {
    const instanceId = draggingInstanceIdRef.current ?? draggingInstanceId;
    if (!instanceId) return true;

    return (
      instanceId !== targetId &&
      !instanceContainsTarget(instances, instanceId, targetId)
    );
  };

  const hideDragTooltip = () => {
    if (!dragTooltipRef.current) return;

    dragTooltipRef.current.style.display = "none";
  };

  const showDragTooltip = (
    text: string,
    event: React.DragEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
  ) => {
    if (!dragTooltipRef.current) return;

    const tooltip = dragTooltipRef.current;

    if (tooltip.textContent !== text) {
      tooltip.textContent = text;
    }

    tooltip.style.display = "block";
    tooltip.style.transform = `translate3d(${event.clientX + 12}px, ${
      event.clientY + 12
    }px, 0)`;
  };

  const clearDragState = () => {
    setDraggedKitName(null);
    setDraggingInstanceId(null);
    if (dragSourceElementRef.current) {
      dragSourceElementRef.current.draggable = false;
      dragSourceElementRef.current = null;
    }
    draggingInstanceIdRef.current = null;
    hoverDragTargetRef.current = null;

    if (dragOverTargetRef.current !== null) {
      dragOverTargetRef.current = null;
      setDragOverTargetId(null);
    }

    hideDragTooltip();
  };

  const handleDragOverTarget = (
    targetId: string | null,
    label?: string,
    event?: React.DragEvent<HTMLElement>,
  ) => {
    if (dragOverTargetRef.current !== targetId) {
      dragOverTargetRef.current = targetId;
      setDragOverTargetId(targetId);
    }

    if (!targetId || !label || !event || !dragTooltipRef.current) {
      hideDragTooltip();
      return;
    }

    showDragTooltip(`Drop into ${label}`, event);
  };

  const handleHoverDragTarget = (
    targetId: string,
    label: string,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    if (draggingInstanceIdRef.current || dragOverTargetRef.current) return;

    hoverDragTargetRef.current = targetId;
    showDragTooltip(`Drag ${label}`, event);
  };

  const handleDragSourceChange = (sourceElement: HTMLElement | null) => {
    if (dragSourceElementRef.current === sourceElement) return;

    if (dragSourceElementRef.current) {
      dragSourceElementRef.current.draggable = false;
    }

    dragSourceElementRef.current = sourceElement;
    if (sourceElement) sourceElement.draggable = true;
  };

  const handleLeaveDragTarget = (targetId: string) => {
    if (hoverDragTargetRef.current !== targetId) return;

    hoverDragTargetRef.current = null;
    if (!draggingInstanceIdRef.current && !dragOverTargetRef.current) {
      hideDragTooltip();
    }
  };

  const handleMoveInstance = (instanceId: string, targetId: string) => {
    if (targetId !== ROOT_TARGET_ID && !canDropIntoTarget(targetId)) return;

    const movedInstance = findInstance(instances, instanceId);
    const movedKit = movedInstance ? kitsByName[movedInstance.kitName] : undefined;

    setInstances((current) => moveInstanceToTarget(current, instanceId, targetId));
    setSelectedId(instanceId);
    if (acceptsChildren(movedKit)) setAddTargetId(instanceId);
  };

  const removeSelected = () => {
    if (!selectedInstance) return;

    setInstances((current) =>
      removeInstanceFromTree(current, selectedInstance.id),
    );
    setSelectedId(null);
    if (addTargetId === selectedInstance.id) setAddTargetId(ROOT_TARGET_ID);
  };

  const moveSelected = (direction: -1 | 1) => {
    if (!selectedInstance) return;
    setInstances((current) =>
      moveInstanceInTree(current, selectedInstance.id, direction),
    );
  };

  const handleChildrenChange = (value: string) => {
    if (!selectedInstance) return;

    updateInstance(selectedInstance.id, (instance) => ({
      ...instance,
      configuredChildren: value,
    }));
  };

  const handlePropChange = (name: string, value: PropValue) => {
    if (!selectedInstance || !selectedKit) return;
    const syncRule = selectedKit.playground_config?.propSyncOnEnable?.[name];
    const shouldSync =
      value.enabled && syncRule && shouldApplySyncValue(value.value);

    updateInstance(selectedInstance.id, (instance) => {
      const dataPresetKey = shouldSync
        ? (syncRule?.dataPreset ?? instance.dataPresetKey)
        : instance.dataPresetKey;
      const structureMode = shouldSync
        ? (syncRule?.structureMode ?? instance.structureMode)
        : instance.structureMode;
      const requiredProp = isRuntimeProp(selectedKit, instance, name);

      return {
        ...instance,
        dataPresetKey,
        structureMode,
        configuredChildren:
          shouldSync && syncRule?.structureMode
            ? getConfiguredChildren(selectedKit, structureMode, null)
            : instance.configuredChildren,
        props: {
          ...instance.props,
          ...(shouldSync ? getRuntimeProps(selectedKit, dataPresetKey) : {}),
          ...(shouldSync
            ? getStructureModeProps(selectedKit, structureMode)
            : {}),
          [name]: value.value,
        },
        enabledProps: {
          ...instance.enabledProps,
          [name]: requiredProp ? true : value.enabled,
        },
      };
    });
  };

  return (
    <Flex
      className="full-playground-shell"
      gap="md"
      orientation="column"
      padding="md"
      width="100%"
    >
      <Flex
        className="full-playground-heading"
        justify="between"
        align="end"
        gap="md"
      >
        <Flex orientation="column" gap="xs">
          <Caption
            color="lighter"
            text={`${enabledPlaygroundKits.length} configured playground kits`}
          />
          <Title size={1} text="Playground" />
          <Body
            color="light"
            text="Build a UI by adding kits to the canvas, nesting kits inside children, and editing props. Copy the produced code snippet in the Code section to save and share your work."
          />
        </Flex>
        <Button
          icon="trash"
          onClick={() => {
            setInstances([]);
            setSelectedId(null);
            setAddTargetId(ROOT_TARGET_ID);
          }}
          text="Clear"
          variant="secondary"
        />
      </Flex>

      <div className="full-playground-workbench">
        <Flex
          className="full-playground-sidebar"
          gap="md"
          htmlOptions={{ style: { minWidth: "0" } }}
          orientation="column"
          width="100%"
        >
          <Card className="playground-panel-controls" padding="md" width="100%">
            <Title marginBottom="sm" size={4} text="Add Kits" />
            <Flex className="builder-field" orientation="column">
              <Flex align="center" gap="xs">
                <Caption color="lighter" text="Where to add the kit" />
                <Tooltip text="Once you add a kit that accepts children, you can add more kits inside it">
                  <Icon icon="circle-info" size="xs" color="lighter" />
                </Tooltip>
              </Flex>
              <Dropdown
                className={panelDropdownClassName("playground-panel", true)}
                clearable={false}
                defaultValue={activeAddTargetOption}
                id="playground-add-target-dropdown"
                key={activeAddTargetId}
                onSelect={(option: { value: string }): null => {
                  setAddTargetId(option.value);
                  return null;
                }}
                options={addTargetOptions}
                placeholder="Main canvas"
                width="100%"
              />
            </Flex>
            <Flex
              className={
                searchQuery.trim()
                  ? "playground-panel-control--filled"
                  : undefined
              }
              orientation="column"
              width="100%"
            >
              <TextInput
                label="Search kits"
                name="playgroundKitSearch"
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setSearchQuery((event.target as HTMLInputElement).value)
                }
                placeholder="Search configured kits"
                value={searchQuery}
              />
            </Flex>
            <Flex
              className="builder-kit-list"
              gap="xs"
              htmlOptions={{ style: { maxHeight: "520px" } }}
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
                  onDragEnd={clearDragState}
                  onDragStart={(event) => {
                    event.dataTransfer.effectAllowed = "copy";
                    event.dataTransfer.setData(
                      "application/playbook-kit",
                      kit.name,
                    );
                    event.dataTransfer.setData("text/plain", kit.name);
                    setDraggedKitName(kit.name);
                    draggingInstanceIdRef.current = null;
                    setDraggingInstanceId(null);
                  }}
                  onClick={() => addKit(kit)}
                  type="button"
                >
                  <Flex align="center" gap="sm" width="100%">
                    <Icon icon="plus" />
                    <Caption color="lighter" text={formatKitName(kit.name)} />
                  </Flex>
                </button>
              ))}
            </Flex>
          </Card>
        </Flex>

        <Flex
          className="full-playground-demo"
          gap="md"
          minWidth="0"
          orientation="column"
          width="100%"
        >
          <Card
            className="playground-preview-card"
            padding="md"
            width="100%"
          >
            <Flex justify="between" align="center" marginBottom="md">
              <Title size={3} text="Demo" />
              <Badge text={`${instanceCount} kits`} variant="primary" />
            </Flex>
            <ResponsivePreviewFrame showDragHint>
              <Background
                backgroundColor="light"
                borderRadius="md"
                className={`builder-stage playground-preview-container ${
                  dragOverTargetId === ROOT_TARGET_ID ? "is-drop-target" : ""
                }`}
                display="flex"
                flexDirection="column"
                gap="sm"
                htmlOptions={{
                  onClick: () => setSelectedId(null),
                  onDragLeave: (event: React.DragEvent<HTMLElement>) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                      )
                    ) {
                      handleDragOverTarget(null);
                    }
                  },
                  onDragOver: (event: React.DragEvent<HTMLElement>) => {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = draggingInstanceIdRef.current
                      ? "move"
                      : "copy";
                    handleDragOverTarget(ROOT_TARGET_ID, "Main canvas", event);
                  },
                  onDrop: (event: React.DragEvent<HTMLElement>) => {
                    event.preventDefault();
                    const plainValue = event.dataTransfer.getData("text/plain");
                    const instanceId =
                      event.dataTransfer.getData(
                        "application/playbook-instance",
                      ) ||
                      (draggingInstanceIdRef.current === plainValue
                        ? draggingInstanceIdRef.current
                        : "");
                    const kitName =
                      event.dataTransfer.getData("application/playbook-kit") ||
                      (instanceId ? "" : plainValue);

                    clearDragState();
                    if (instanceId) handleMoveInstance(instanceId, ROOT_TARGET_ID);
                    else if (kitName) handleDropKit(kitName, ROOT_TARGET_ID);
                  },
                  style: { minWidth: "0" },
                }}
                minHeight="360px"
                padding="sm"
              >
                {instances.length === 0 ? (
                  <Flex
                    align="center"
                    className="builder-empty-canvas"
                    flex={1}
                    gap="xs"
                    justify="center"
                    minHeight="300px"
                    orientation="column"
                    padding="sm"
                    textAlign="center"
                    width="100%"
                  >
                    <Icon icon="plus" />
                    <Body color="light" text="Add a kit to start composing." />
                  </Flex>
                ) : (
                  instances.map((instance) => (
                    <BuilderPreviewItem
                      canDropIntoTarget={canDropIntoTarget}
                      dragOverTargetId={dragOverTargetId}
                      draggingInstanceId={draggingInstanceId}
                      globalProps={global_props_schema?.props}
                      instance={instance}
                      isSelected={instance.id === selectedId}
                      key={instance.id}
                      kitsByName={kitsByName}
                      onDragEndDrag={clearDragState}
                      onDragOverTarget={handleDragOverTarget}
                      onDragStartInstance={(id) => {
                        draggingInstanceIdRef.current = id;
                        hoverDragTargetRef.current = null;
                        hideDragTooltip();
                        setDraggingInstanceId(id);
                        setDraggedKitName(null);
                      }}
                      onDragSourceChange={handleDragSourceChange}
                      onHoverDragTarget={handleHoverDragTarget}
                      onLeaveDragTarget={handleLeaveDragTarget}
                      onDropKit={(kitName, targetId) => {
                        clearDragState();
                        handleDropKit(kitName, targetId);
                      }}
                      onMoveInstance={(instanceId, targetId) => {
                        clearDragState();
                        handleMoveInstance(instanceId, targetId);
                      }}
                      onSelect={handleSelectInstance}
                      selectedId={selectedId}
                    />
                  ))
                )}
              </Background>
            </ResponsivePreviewFrame>
          </Card>

          <Flex
            className="full-playground-code-panel"
            minWidth="0"
            orientation="column"
            width="100%"
          >
            <CodePanel code={generatedCode} />
          </Flex>
        </Flex>

        <Flex
          className="full-playground-inspector"
          gap="md"
          minWidth="0"
          orientation="column"
        >
          <Card className="playground-panel-controls" padding="md">
            <Title marginBottom="sm" size={4} text="Inspector" />
            {instanceOptions.length > 0 && (
              <Flex className="builder-field" orientation="column">
                <Caption text="Selected kit" />
                <Dropdown
                  className={panelDropdownClassName("playground-panel", !!selectedId)}
                  clearable={false}
                  defaultValue={activeSelectedInstanceOption}
                  id="playground-selected-kit-dropdown"
                  key={selectedId ?? "none"}
                  onSelect={(option: { value: string } | null): null => {
                    const id = option?.value ?? "";
                    if (id) handleSelectInstance(id);
                    else setSelectedId(null);
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
                  instanceOptions.length > 0
                    ? "Choose a placed kit to edit props and order."
                    : "Add a kit to start editing props and order."
                }
              />
            ) : (
              <Flex orientation="column" gap="sm" width="100%">
                <Button
                  icon="trash"
                  onClick={removeSelected}
                  text="Remove Selected Kit"
                  variant="secondary"
                  fullWidth
                />
                {acceptsChildren(selectedKit) && (
                  <Button
                    icon="plus"
                    onClick={() => setAddTargetId(selectedInstance.id)}
                    size="sm"
                    text="Add kits inside this"
                    variant="secondary"
                  />
                )}

                {selectedDataPresetOptions.length > 0 && (
                  <Flex
                    className="builder-field"
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
                        const dataPresetKey = option?.value || null;

                        updateInstance(selectedInstance.id, (instance) => ({
                          ...instance,
                          dataPresetKey,
                          props: {
                            ...instance.props,
                            ...getRuntimeProps(selectedKit, dataPresetKey),
                          },
                        }));
                        return null;
                      }}
                      options={dataPresetDropdownOptions}
                      width="100%"
                    />
                  </Flex>
                )}

                {selectedStructureModeOptions.length > 1 && (
                  <Flex
                    className="builder-field"
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
                        const structureMode = option?.value || null;

                        updateInstance(selectedInstance.id, (instance) => ({
                          ...instance,
                          structureMode,
                          configuredChildren: getConfiguredChildren(
                            selectedKit,
                            structureMode,
                            null,
                          ),
                          props: {
                            ...instance.props,
                            ...getStructureModeProps(
                              selectedKit,
                              structureMode,
                            ),
                          },
                        }));
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
                    onClick={() => moveSelected(-1)}
                    size="sm"
                    text="Up"
                    variant="secondary"
                  />
                  <Button
                    icon="arrow-down"
                    onClick={() => moveSelected(1)}
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
              children={builderPropsPanel.children}
              groupedGlobalProps={builderPropsPanel.groupedGlobalProps}
              groupedProps={builderPropsPanel.groupedProps}
              globalProps={builderPropsPanel.globalProps}
              onChildrenChange={handleChildrenChange}
              onPropChange={handlePropChange}
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
      </div>
      <div
        aria-hidden
        className="builder-drag-tooltip"
        ref={dragTooltipRef}
      />
    </Flex>
  );
}
