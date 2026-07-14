import React, { useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Flex } from "playbook-ui";

import type { PropValue } from "../KitShow/Tabs/Playground";
import { PLAYGROUND_ENABLED_KITS } from "../KitShow/playgroundEnabledKits";
import { generateCode, generatePreviewCode } from "./codeGeneration";
import { applyPromptModification } from "./PromtBuilderRecipes/modifiers";
import { buildPromptPlanFromRecipes } from "./PromtBuilderRecipes";
import { compilePromptPlan, getPromptPlanMode } from "./promptCompiler";
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
import { useBuilderPropsPanel } from "./useBuilderPropsPanel";
import type { BuilderPropsPanelState } from "./useBuilderPropsPanel";
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
import { PlaygroundCanvas } from "./PlaygroundCanvas";
import { PlaygroundHeader } from "./PlaygroundHeader";
import { PlaygroundInspector } from "./PlaygroundInspector";
import { PlaygroundPromptBuilder } from "./PlaygroundPromptBuilder";
import { PlaygroundSidebar } from "./PlaygroundSidebar";
import type {
  BuilderInstance,
  PlaygroundKit,
  PlaygroundLoaderData,
} from "./types";
import { ROOT_TARGET_ID } from "./types";

import "./styles.scss";

type PlaygroundSnapshot = {
  addTargetId: string;
  instances: BuilderInstance[];
  selectedId: string | null;
};

const MAX_PLAYGROUND_HISTORY = 20;

const cloneInstances = (items: BuilderInstance[]): BuilderInstance[] =>
  items.map((instance) => ({
    ...instance,
    children: cloneInstances(instance.children),
    enabledProps: { ...instance.enabledProps },
    props: { ...instance.props },
  }));

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
  const [promptClearSignal, setPromptClearSignal] = useState(0);
  const [promptStatus, setPromptStatus] = useState<string | null>(null);
  const [promptDiagnostics, setPromptDiagnostics] = useState<string[]>([]);
  const [playgroundHistory, setPlaygroundHistory] = useState<PlaygroundSnapshot[]>([]);
  const [isPromptMinimized, setIsPromptMinimized] = useState(true);
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
  const generatedCode = useMemo(
    () => generateCode(instances, kitsByName, global_props_schema?.props),
    [global_props_schema?.props, instances, kitsByName],
  );
  const generatedPreviewCode = useMemo(
    () => generatePreviewCode(instances, kitsByName, global_props_schema?.props),
    [global_props_schema?.props, instances, kitsByName],
  );
  const instanceCount = useMemo(() => countInstances(instances), [instances]);

  const savePlaygroundSnapshot = () => {
    const snapshot = {
      addTargetId,
      instances: cloneInstances(instances),
      selectedId,
    };

    setPlaygroundHistory((current) =>
      [...current, snapshot].slice(-MAX_PLAYGROUND_HISTORY),
    );
  };

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

    savePlaygroundSnapshot();

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

    savePlaygroundSnapshot();
    setInstances((current) => moveInstanceToTarget(current, instanceId, targetId));
    setSelectedId(instanceId);
    if (acceptsChildren(movedKit)) setAddTargetId(instanceId);
  };

  const removeSelected = () => {
    if (!selectedInstance) return;

    savePlaygroundSnapshot();
    setInstances((current) =>
      removeInstanceFromTree(current, selectedInstance.id),
    );
    setSelectedId(null);
    if (addTargetId === selectedInstance.id) setAddTargetId(ROOT_TARGET_ID);
  };

  const moveSelected = (direction: -1 | 1) => {
    if (!selectedInstance) return;
    savePlaygroundSnapshot();
    setInstances((current) =>
      moveInstanceInTree(current, selectedInstance.id, direction),
    );
  };

  const handleChildrenChange = (value: string) => {
    if (!selectedInstance) return;

    savePlaygroundSnapshot();
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

    savePlaygroundSnapshot();
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

  const handlePromptSubmit = (rawPrompt: string) => {
    const prompt = rawPrompt.trim();
    if (!prompt) return;

    setPromptDiagnostics([]);

    if (instances.length > 0) {
      const modification = applyPromptModification(
        prompt,
        instances,
        kitsByName,
        global_props_schema?.props,
      );

      if (modification.handled) {
        if (modification.instances !== instances) savePlaygroundSnapshot();
        setInstances(modification.instances);
        setPromptDiagnostics(modification.diagnostics);
        setPromptStatus(
          modification.summary || "No matching local edit recipe found.",
        );
        setIsPromptMinimized(false);
        return;
      }
    }

    const recipeResult = buildPromptPlanFromRecipes(prompt, kitsByName);
    const compiledPlan = compilePromptPlan(
      recipeResult.plan,
      kitsByName,
      global_props_schema?.props,
    );
    const diagnostics = [
      ...recipeResult.diagnostics,
      ...compiledPlan.diagnostics,
    ];

    if (compiledPlan.instances.length === 0) {
      setPromptDiagnostics(diagnostics);
      setPromptStatus("No local recipe matched that prompt.");
      return;
    }

    const mode = getPromptPlanMode(recipeResult.plan);
    savePlaygroundSnapshot();
    setInstances((current) =>
      mode === "append"
        ? [...current, ...compiledPlan.instances]
        : compiledPlan.instances,
    );
    setSelectedId(compiledPlan.instances[0]?.id ?? null);
    setAddTargetId(ROOT_TARGET_ID);
    setPromptDiagnostics(diagnostics);
    setPromptStatus(
      recipeResult.plan.summary || "Built with local Playbook recipes.",
    );
    setIsPromptMinimized(false);
  };

  const handleRestorePreviousPlaygroundState = (showPromptStatus = false) => {
    const previous = playgroundHistory[playgroundHistory.length - 1];
    if (!previous) return;

    setPlaygroundHistory((current) => current.slice(0, -1));
    setInstances(cloneInstances(previous.instances));
    setSelectedId(previous.selectedId);
    setAddTargetId(previous.addTargetId);
    setPromptDiagnostics([]);
    if (showPromptStatus === true) {
      setPromptStatus("Restored previous playground state.");
      setIsPromptMinimized(false);
    }
  };

  const handleClearPromptBuilder = () => {
    setPromptClearSignal((current) => current + 1);
    setPromptStatus(null);
    setPromptDiagnostics([]);
  };

  const handleClearAll = () => {
    setInstances([]);
    setSelectedId(null);
    setAddTargetId(ROOT_TARGET_ID);
    setPlaygroundHistory([]);
    handleClearPromptBuilder();
  };

  const handleKitDragStart = (
    kitName: string,
    event: React.DragEvent<HTMLButtonElement>,
  ) => {
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("application/playbook-kit", kitName);
    event.dataTransfer.setData("text/plain", kitName);
    setDraggedKitName(kitName);
    draggingInstanceIdRef.current = null;
    setDraggingInstanceId(null);
  };

  const handleCanvasDragLeave = (event: React.DragEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      handleDragOverTarget(null);
    }
  };

  const handleCanvasDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = draggingInstanceIdRef.current
      ? "move"
      : "copy";
    handleDragOverTarget(ROOT_TARGET_ID, "Main canvas", event);
  };

  const handleCanvasDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    const plainValue = event.dataTransfer.getData("text/plain");
    const instanceId =
      event.dataTransfer.getData("application/playbook-instance") ||
      (draggingInstanceIdRef.current === plainValue
        ? draggingInstanceIdRef.current
        : "");
    const kitName =
      event.dataTransfer.getData("application/playbook-kit") ||
      (instanceId ? "" : plainValue);

    clearDragState();
    if (instanceId) handleMoveInstance(instanceId, ROOT_TARGET_ID);
    else if (kitName) handleDropKit(kitName, ROOT_TARGET_ID);
  };

  const handleDragStartInstance = (id: string) => {
    draggingInstanceIdRef.current = id;
    hoverDragTargetRef.current = null;
    hideDragTooltip();
    setDraggingInstanceId(id);
    setDraggedKitName(null);
  };

  const handleSelectedInstanceChange = (id: string | null) => {
    if (id) handleSelectInstance(id);
    else setSelectedId(null);
  };

  const handleDataPresetChange = (dataPresetKey: string | null) => {
    if (!selectedInstance || !selectedKit) return;

    savePlaygroundSnapshot();
    updateInstance(selectedInstance.id, (instance) => ({
      ...instance,
      dataPresetKey,
      props: {
        ...instance.props,
        ...getRuntimeProps(selectedKit, dataPresetKey),
      },
    }));
  };

  const handleStructureModeChange = (structureMode: string | null) => {
    if (!selectedInstance || !selectedKit) return;

    savePlaygroundSnapshot();
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
        ...getStructureModeProps(selectedKit, structureMode),
      },
    }));
  };

  return (
    <Flex
        className="full-playground-shell"
        gap="md"
        minHeight="100%"
        orientation="column"
        padding="md"
        width="100%"
    >
      <PlaygroundHeader
          canRestorePreviousState={playgroundHistory.length > 0}
          kitCount={enabledPlaygroundKits.length}
          onClear={handleClearAll}
          onRestorePreviousState={() => handleRestorePreviousPlaygroundState()}
      />

      <div className="full-playground-workbench">
        <PlaygroundSidebar
            activeAddTargetId={activeAddTargetId}
            activeAddTargetOption={activeAddTargetOption}
            addTargetOptions={addTargetOptions}
            draggedKitName={draggedKitName}
            filteredKits={filteredKits}
            onAddKit={addKit}
            onAddTargetChange={setAddTargetId}
            onDragEnd={clearDragState}
            onKitDragStart={handleKitDragStart}
            onSearchQueryChange={setSearchQuery}
            searchQuery={searchQuery}
        />

        <PlaygroundCanvas
            canDropIntoTarget={canDropIntoTarget}
            dragOverTargetId={dragOverTargetId}
            draggingInstanceId={draggingInstanceId}
            generatedCode={generatedCode}
            generatedPreviewCode={generatedPreviewCode}
            globalProps={global_props_schema?.props}
            instanceCount={instanceCount}
            instances={instances}
            kitsByName={kitsByName}
            onCanvasClick={() => setSelectedId(null)}
            onCanvasDragLeave={handleCanvasDragLeave}
            onCanvasDragOver={handleCanvasDragOver}
            onCanvasDrop={handleCanvasDrop}
            onDragEndDrag={clearDragState}
            onDragOverTarget={handleDragOverTarget}
            onDragSourceChange={handleDragSourceChange}
            onDragStartInstance={handleDragStartInstance}
            onDropKit={handleDropKit}
            onHoverDragTarget={handleHoverDragTarget}
            onLeaveDragTarget={handleLeaveDragTarget}
            onMoveInstance={handleMoveInstance}
            onSelect={handleSelectInstance}
            selectedId={selectedId}
        />

        <PlaygroundInspector
            activeDataPresetOption={activeDataPresetOption}
            activeSelectedInstanceOption={activeSelectedInstanceOption}
            activeStructureModeOption={activeStructureModeOption}
            builderPropsPanel={builderPropsPanel}
            dataPresetDropdownOptions={dataPresetDropdownOptions}
            instanceOptionsCount={instanceOptions.length}
            onAddInsideSelected={() => {
            if (selectedInstance) setAddTargetId(selectedInstance.id);
          }}
            onChildrenChange={handleChildrenChange}
            onDataPresetChange={handleDataPresetChange}
            onMoveSelected={moveSelected}
            onPropChange={handlePropChange}
            onRemoveSelected={removeSelected}
            onSelectedInstanceChange={handleSelectedInstanceChange}
            onStructureModeChange={handleStructureModeChange}
            selectedDataPresetOptionsCount={selectedDataPresetOptions.length}
            selectedId={selectedId}
            selectedInstance={selectedInstance}
            selectedInstanceOptions={selectedInstanceOptions}
            selectedKit={selectedKit}
            selectedStructureModeOptionsCount={selectedStructureModeOptions.length}
            structureModeDropdownOptions={structureModeDropdownOptions}
        />
      </div>
      <PlaygroundPromptBuilder
          clearSignal={promptClearSignal}
          diagnostics={promptDiagnostics}
          hasPreviousIteration={playgroundHistory.length > 0}
          isMinimized={isPromptMinimized}
          onClear={handleClearPromptBuilder}
          onMinimize={() => setIsPromptMinimized(true)}
          onOpen={() => setIsPromptMinimized(false)}
          onRestorePreviousIteration={() => handleRestorePreviousPlaygroundState(true)}
          onSubmit={handlePromptSubmit}
          status={promptStatus}
      />
      <div
          aria-hidden
          className="builder-drag-tooltip"
          ref={dragTooltipRef}
      />
    </Flex>
  );
}
