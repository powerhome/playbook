import React, { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Badge,
  Body,
  Button,
  Caption,
  Card,
  Detail,
  Flex,
  Icon,
  TextInput,
  Title,
} from "playbook-ui";

import { PageContainer } from "../../components/PageContainer";
import {
  CodePanel,
  PropControl,
} from "../KitShow/Tabs/Playground";
import type { PropValue } from "../KitShow/Tabs/Playground";
import { PLAYGROUND_ENABLED_KITS } from "../KitShow/playgroundEnabledKits";
import { BuilderPreviewItem } from "./BuilderPreviewItem";
import { generateCode } from "./codeGeneration";
import {
  acceptsChildren,
  createInstance,
  formatKitName,
  getConfiguredChildren,
  getDataPresetOptions,
  getGlobalProps,
  getGroupedEditableProps,
  getPropValue,
  getRequiredPropNames,
  getRuntimeProps,
  getStructureModeOptions,
  getStructureModeProps,
  isRuntimeProp,
  shouldApplySyncValue,
} from "./kitUtils";
import {
  buildInstanceOptions,
  buildTargetOptions,
  countInstances,
  findInstance,
  moveInstanceInTree,
  removeInstanceFromTree,
  updateInstanceInTree,
} from "./treeUtils";
import type {
  BuilderInstance,
  PlaygroundKit,
  PlaygroundLoaderData,
} from "./types";
import {
  ROOT_TARGET_ID,
} from "./types";

import "./styles.scss";

export default function Playground() {
  const {
    global_props_schema,
    playground_kits = [],
  } = useLoaderData() as PlaygroundLoaderData;
  const [instances, setInstances] = useState<BuilderInstance[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [addTargetId, setAddTargetId] = useState(ROOT_TARGET_ID);

  const enabledPlaygroundKits = useMemo(
    () => playground_kits.filter((kit) => PLAYGROUND_ENABLED_KITS.includes(kit.name)),
    [playground_kits]
  );

  const kitsByName = useMemo(() => {
    return enabledPlaygroundKits.reduce<Record<string, PlaygroundKit>>((acc, kit) => {
      acc[kit.name] = kit;
      return acc;
    }, {});
  }, [enabledPlaygroundKits]);

  const filteredKits = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return enabledPlaygroundKits;

    return enabledPlaygroundKits.filter((kit) =>
      [kit.name, kit.label, kit.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [enabledPlaygroundKits, searchQuery]);

  const kitsByCategory = useMemo(() => {
    return filteredKits.reduce<Record<string, PlaygroundKit[]>>((acc, kit) => {
      if (!acc[kit.category]) acc[kit.category] = [];
      acc[kit.category].push(kit);
      return acc;
    }, {});
  }, [filteredKits]);

  const selectedInstance = findInstance(instances, selectedId);
  const selectedKit = selectedInstance ? kitsByName[selectedInstance.kitName] : undefined;
  const selectedDataPresetOptions = getDataPresetOptions(selectedKit);
  const selectedStructureModeOptions = getStructureModeOptions(selectedKit);
  const selectedGlobalProps = getGlobalProps(selectedKit, global_props_schema?.props);
  const selectedRequiredPropNames = getRequiredPropNames(selectedKit, selectedInstance);
  const targetOptions = useMemo(
    () => [
      { id: ROOT_TARGET_ID, label: "Main canvas" },
      ...buildTargetOptions(instances, kitsByName),
    ],
    [instances, kitsByName]
  );
  const instanceOptions = useMemo(
    () => buildInstanceOptions(instances, kitsByName),
    [instances, kitsByName]
  );
  const activeAddTargetId = targetOptions.some((option) => option.id === addTargetId)
    ? addTargetId
    : ROOT_TARGET_ID;
  const generatedCode = generateCode(instances, kitsByName, global_props_schema?.props);
  const instanceCount = countInstances(instances);

  const updateInstance = (id: string, updater: (instance: BuilderInstance) => BuilderInstance) => {
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

  const addKit = (kit: PlaygroundKit) => {
    const nextInstance = createInstance(kit, global_props_schema?.props);

    if (activeAddTargetId === ROOT_TARGET_ID) {
      setInstances((current) => [...current, nextInstance]);
    } else {
      setInstances((current) =>
        updateInstanceInTree(current, activeAddTargetId, (instance) => ({
          ...instance,
          children: [...instance.children, nextInstance],
        }))
      );
    }

    setSelectedId(nextInstance.id);
    if (acceptsChildren(kit)) {
      setAddTargetId(nextInstance.id);
    }
  };

  const removeSelected = () => {
    if (!selectedInstance) return;

    setInstances((current) => removeInstanceFromTree(current, selectedInstance.id));
    setSelectedId(null);
    if (addTargetId === selectedInstance.id) setAddTargetId(ROOT_TARGET_ID);
  };

  const moveSelected = (direction: -1 | 1) => {
    if (!selectedInstance) return;
    setInstances((current) => moveInstanceInTree(current, selectedInstance.id, direction));
  };

  const handlePropChange = (name: string, value: PropValue) => {
    if (!selectedInstance || !selectedKit) return;
    const syncRule = selectedKit.playground_config?.propSyncOnEnable?.[name];
    const shouldSync = value.enabled && syncRule && shouldApplySyncValue(value.value);

    updateInstance(selectedInstance.id, (instance) => {
      const dataPresetKey = shouldSync
        ? syncRule?.dataPreset ?? instance.dataPresetKey
        : instance.dataPresetKey;
      const structureMode = shouldSync
        ? syncRule?.structureMode ?? instance.structureMode
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
          ...(shouldSync ? getStructureModeProps(selectedKit, structureMode) : {}),
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
    <PageContainer marginTop="md">
      <Flex className="full-playground" orientation="column" width="100%">
        <Flex className="full-playground-heading" justify="between" align="end" gap="md">
          <Flex orientation="column" gap="xs">
            <Caption color="lighter" text={`${enabledPlaygroundKits.length} configured playground kits`} />
            <Title size={1} text="Playground" />
            <Body
              color="light"
              text="Build a UI by adding kits to the canvas, nesting kits inside children, and editing props."
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
          <div className="full-playground-left">
            <Card padding="md">
              <Title marginBottom="sm" size={4} text="Add Kits" />
              <label className="builder-field">
                <span>Add to</span>
                <select
                  onChange={(event) => setAddTargetId(event.target.value)}
                  value={activeAddTargetId}
                >
                  {targetOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <TextInput
                label="Search kits"
                name="playgroundKitSearch"
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setSearchQuery((event.target as HTMLInputElement).value)
                }
                placeholder="Search configured kits"
                value={searchQuery}
              />
              <div className="builder-kit-list">
                {Object.entries(kitsByCategory).map(([category, kits]) => (
                  <div key={category}>
                    <Caption color="lighter" text={category} />
                    {kits.map((kit) => (
                      <button
                        className="builder-kit-button"
                        key={kit.name}
                        onClick={() => addKit(kit)}
                        type="button"
                      >
                        <Flex align="center" gap="sm">
                          <Icon icon="plus" />
                          <Flex orientation="column" align="start">
                            <Body text={kit.label} />
                            <Caption color="lighter" text={formatKitName(kit.name)} />
                          </Flex>
                        </Flex>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="full-playground-center">
            <Card className="full-playground-canvas" padding="md">
              <Flex justify="between" align="center" marginBottom="md">
                <Title size={3} text="Demo" />
                <Badge text={`${instanceCount} kits`} variant="primary" />
              </Flex>
              <div className="builder-stage" onClick={() => setSelectedId(null)}>
                {instances.length === 0 ? (
                  <div className="builder-empty-canvas">
                    <Icon icon="plus" />
                    <Body color="light" text="Add a kit to start composing." />
                  </div>
                ) : (
                  instances.map((instance) => (
                    <BuilderPreviewItem
                      globalProps={global_props_schema?.props}
                      instance={instance}
                      isSelected={instance.id === selectedId}
                      key={instance.id}
                      kitsByName={kitsByName}
                      onSelect={handleSelectInstance}
                      selectedId={selectedId}
                    />
                  ))
                )}
              </div>
            </Card>

            <div className="full-playground-code-panel">
              <CodePanel code={generatedCode} />
            </div>
          </div>

          <div className="full-playground-right">
            <Card padding="md">
              <Title marginBottom="sm" size={4} text="Inspector" />
              {instanceOptions.length > 0 && (
                <label className="builder-field">
                  <span>Selected kit</span>
                  <select
                    onChange={(event) => {
                      const id = event.target.value;
                      if (id) handleSelectInstance(id);
                      else setSelectedId(null);
                    }}
                    value={selectedId ?? ""}
                  >
                    <option value="">Choose a placed kit</option>
                    {instanceOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
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
                <Flex orientation="column" gap="sm">
                  <Flex justify="between" align="center">
                    <Flex orientation="column">
                      <Detail color="light" text="Editing" />
                      <Body text={selectedKit.label} />
                    </Flex>
                    <Button
                      icon="trash"
                      onClick={removeSelected}
                      size="sm"
                      text="Remove"
                      variant="secondary"
                    />
                  </Flex>

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
                    <label className="builder-field">
                      <span>Data</span>
                      <select
                        onChange={(event) => {
                          const dataPresetKey = event.target.value || null;

                          updateInstance(selectedInstance.id, (instance) => ({
                            ...instance,
                            dataPresetKey,
                            props: {
                              ...instance.props,
                              ...getRuntimeProps(selectedKit, dataPresetKey),
                            },
                          }));
                        }}
                        value={selectedInstance.dataPresetKey ?? ""}
                      >
                        {selectedDataPresetOptions.map((option) => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}

                  {selectedStructureModeOptions.length > 1 && (
                    <label className="builder-field">
                      <span>Structure</span>
                      <select
                        onChange={(event) => {
                          const structureMode = event.target.value || null;

                          updateInstance(selectedInstance.id, (instance) => ({
                            ...instance,
                            structureMode,
                            configuredChildren: getConfiguredChildren(
                              selectedKit,
                              structureMode,
                              null
                            ),
                            props: {
                              ...instance.props,
                              ...getStructureModeProps(selectedKit, structureMode),
                            },
                          }));
                        }}
                        value={selectedInstance.structureMode ?? ""}
                      >
                        {selectedStructureModeOptions.map((option) => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
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

                  <div className="builder-prop-list">
                    {getGroupedEditableProps(selectedKit).map((group) => (
                      <div className="builder-prop-group" key={group.name || "props"}>
                        {group.name && <Title size={4} text={group.name} />}
                        {group.props.map(([name, definition]) => (
                          <PropControl
                            definition={definition as any}
                            isRequired={selectedRequiredPropNames.has(name)}
                            key={name}
                            name={name}
                            onChange={handlePropChange}
                            value={getPropValue(selectedInstance, selectedKit, name)}
                          />
                        ))}
                      </div>
                    ))}

                    {Object.keys(selectedGlobalProps).length > 0 && (
                      <div className="builder-prop-group">
                        <Title size={4} text="Global Props" />
                        {Object.entries(selectedGlobalProps).map(([name, definition]) => (
                          <PropControl
                            definition={definition as any}
                            key={name}
                            name={name}
                            onChange={handlePropChange}
                            value={getPropValue(selectedInstance, selectedKit, name)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Flex>
              )}
            </Card>
          </div>
        </div>
      </Flex>
    </PageContainer>
  );
}
