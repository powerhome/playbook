import React from "react";
import * as Playbook from "playbook-ui";
import { Body, Card } from "playbook-ui";

import { PlaygroundPreview } from "../KitShow/Tabs/Playground";
import {
  getAllPropDefinitionsWithGlobals,
  getRuntimeProps,
  getStructureModeProps,
  acceptsChildren,
  displayPropType,
} from "./kitUtils";
import {
  getLivePreviewCode,
  getRuntimeScope,
  shouldUseTemplatePreview,
} from "./codeGeneration";
import type { BuilderInstance, PlaygroundKit, PropDefinition } from "./types";

class RenderBoundary extends React.Component<
  { children: React.ReactNode; fallback: (error?: Error) => React.ReactNode },
  { error?: Error; hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { error, hasError: true };
  }

  componentDidUpdate(prevProps: { children: React.ReactNode }) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ error: undefined, hasError: false });
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback(this.state.error) : this.props.children;
  }
}

const getRenderableValue = (
  name: string,
  value: any,
  propDefinitions: Record<string, PropDefinition>
) => {
  const type = displayPropType(propDefinitions[name]);
  if (value === "" || value === null || value === undefined) return undefined;
  return type.includes("function") || type.includes("=>")
    ? () => undefined
    : value;
};

const getRenderableProps = (
  instance: BuilderInstance,
  kit?: PlaygroundKit,
  globalProps?: Record<string, PropDefinition>
) => {
  const propDefinitions = getAllPropDefinitionsWithGlobals(kit, globalProps);
  const props: Record<string, any> = {};

  Object.entries(kit?.playground_config?.defaults ?? {}).forEach(([name, value]) => {
    const renderableValue = getRenderableValue(name, value, propDefinitions);
    if (renderableValue !== undefined) props[name] = renderableValue;
  });

  Object.entries(getRuntimeProps(kit, instance.dataPresetKey)).forEach(([name, value]) => {
    const currentValue = instance.props[name] ?? value;
    const renderableValue = getRenderableValue(name, currentValue, propDefinitions);
    if (renderableValue !== undefined) props[name] = renderableValue;
  });

  Object.entries(getStructureModeProps(kit, instance.structureMode)).forEach(([name, value]) => {
    const currentValue = instance.props[name] ?? value;
    const renderableValue = getRenderableValue(name, currentValue, propDefinitions);
    if (renderableValue !== undefined) props[name] = renderableValue;
  });

  Object.entries(instance.enabledProps).forEach(([name, enabled]) => {
    if (!enabled) return;

    const value = instance.props[name];
    const renderableValue = getRenderableValue(name, value, propDefinitions);
    if (renderableValue !== undefined) props[name] = renderableValue;
  });

  return props;
};

type BuilderPreviewItemProps = {
  globalProps?: Record<string, PropDefinition>;
  instance: BuilderInstance;
  isSelected: boolean;
  kitsByName: Record<string, PlaygroundKit>;
  onSelect: (id: string) => void;
  selectedId: string | null;
};

export const BuilderPreviewItem = ({
  globalProps,
  instance,
  isSelected,
  kitsByName,
  onSelect,
  selectedId,
}: BuilderPreviewItemProps) => {
  const kit = kitsByName[instance.kitName];
  const Component = kit?.kit_schema?.name
    ? (Playbook as any)[kit.kit_schema.name]
    : null;
  const childNodes = instance.children.map((child) => (
    <BuilderPreviewItem
      globalProps={globalProps}
      instance={child}
      isSelected={child.id === selectedId}
      key={child.id}
      kitsByName={kitsByName}
      onSelect={onSelect}
      selectedId={selectedId}
    />
  ));
  const canRenderChildren = acceptsChildren(kit);
  const configuredChildren = instance.configuredChildren?.trim();
  const directChildren = childNodes.length > 0 ? childNodes : configuredChildren || undefined;

  const rendered = kit && shouldUseTemplatePreview(instance, kit) ? (
    <PlaygroundPreview
      bare
      code={getLivePreviewCode(instance, kit, kitsByName, globalProps)}
      extraScope={getRuntimeScope(instance, kit, kitsByName)}
    />
  ) : Component ? (
    <RenderBoundary
      fallback={(error) => (
        <Card padding="sm">
          <Body text={error?.message ?? `${kit?.label ?? instance.kitName} needs more props to render.`} />
        </Card>
      )}
    >
      {React.createElement(
        Component,
        getRenderableProps(instance, kit, globalProps),
        canRenderChildren ? directChildren : undefined
      )}
    </RenderBoundary>
  ) : (
    <Card padding="sm">
      <Body text={`${kit?.label ?? instance.kitName} is not exported by playbook-ui.`} />
    </Card>
  );

  return (
    <div
      className={`builder-instance ${isSelected ? "is-selected" : ""} ${
        canRenderChildren && instance.children.length === 0 ? "is-empty-container" : ""
      }`}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(instance.id);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          onSelect(instance.id);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="builder-instance-render">{rendered}</div>
    </div>
  );
};
