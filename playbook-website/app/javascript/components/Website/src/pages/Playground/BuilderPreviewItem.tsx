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
  formatKitName,
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
  canDropIntoTarget?: (targetId: string) => boolean;
  dragOverTargetId?: string | null;
  dragSourceId?: string | null;
  draggingInstanceId?: string | null;
  globalProps?: Record<string, PropDefinition>;
  instance: BuilderInstance;
  isSelected: boolean;
  kitsByName: Record<string, PlaygroundKit>;
  onDragEndDrag?: () => void;
  onDragOverTarget?: (
    id: string | null,
    label?: string,
    event?: React.DragEvent<HTMLElement>
  ) => void;
  onDragStartInstance?: (id: string) => void;
  onDragSourceChange?: (id: string | null) => void;
  onHoverDragTarget?: (
    id: string,
    label: string,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onLeaveDragTarget?: (id: string) => void;
  onDropKit?: (kitName: string, targetId: string) => void;
  onMoveInstance?: (instanceId: string, targetId: string) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
};

export const BuilderPreviewItem = ({
  canDropIntoTarget,
  dragOverTargetId,
  dragSourceId,
  draggingInstanceId,
  globalProps,
  instance,
  isSelected,
  kitsByName,
  onDragEndDrag,
  onDragOverTarget,
  onDragStartInstance,
  onDragSourceChange,
  onHoverDragTarget,
  onLeaveDragTarget,
  onDropKit,
  onMoveInstance,
  onSelect,
  selectedId,
}: BuilderPreviewItemProps) => {
  const kit = kitsByName[instance.kitName];
  const Component = kit?.kit_schema?.name
    ? (Playbook as any)[kit.kit_schema.name]
    : null;
  const childNodes = instance.children.map((child) => (
    <BuilderPreviewItem
      canDropIntoTarget={canDropIntoTarget}
      dragOverTargetId={dragOverTargetId}
      dragSourceId={dragSourceId}
      draggingInstanceId={draggingInstanceId}
      globalProps={globalProps}
      instance={child}
      isSelected={child.id === selectedId}
      key={child.id}
      kitsByName={kitsByName}
      onDragEndDrag={onDragEndDrag}
      onDragOverTarget={onDragOverTarget}
      onDragStartInstance={onDragStartInstance}
      onDragSourceChange={onDragSourceChange}
      onHoverDragTarget={onHoverDragTarget}
      onLeaveDragTarget={onLeaveDragTarget}
      onDropKit={onDropKit}
      onMoveInstance={onMoveInstance}
      onSelect={onSelect}
      selectedId={selectedId}
    />
  ));
  const canRenderChildren = acceptsChildren(kit);
  const canAcceptDrop =
    canRenderChildren && (canDropIntoTarget ? canDropIntoTarget(instance.id) : true);
  const configuredChildren = instance.configuredChildren?.trim();
  const directChildren = childNodes.length > 0 ? childNodes : configuredChildren || undefined;
  const targetLabel = formatKitName(kit?.name ?? instance.kitName);
  const isInnermostEventTarget = (
    event:
      | React.DragEvent<HTMLElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLElement>
  ) => {
    const target = event.target as HTMLElement | null;
    const closestInstance = target?.closest<HTMLElement>(".builder-instance");

    return closestInstance?.dataset.builderInstanceId === instance.id;
  };

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
      } ${
        draggingInstanceId === instance.id ? "is-dragging" : ""
      } ${
        canAcceptDrop && dragOverTargetId === instance.id ? "is-drop-target" : ""
      }`}
      data-builder-instance-id={instance.id}
      draggable={dragSourceId === instance.id}
      onDragEnd={(event) => {
        event.stopPropagation();
        onDragEndDrag?.();
      }}
      onDragLeave={(event) => {
        if (!canAcceptDrop) return;
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onDragOverTarget?.(null);
        }
      }}
      onDragOver={(event) => {
        if (!canAcceptDrop) return;
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = draggingInstanceId ? "move" : "copy";
        onDragOverTarget?.(instance.id, targetLabel, event);
      }}
      onDragStart={(event) => {
        event.stopPropagation();
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("application/playbook-instance", instance.id);
        event.dataTransfer.setData("text/plain", instance.id);
        onSelect(instance.id);
        onDragStartInstance?.(instance.id);
      }}
      onMouseLeave={(event) => {
        if (!isInnermostEventTarget(event)) return;
        onDragSourceChange?.(null);
        onLeaveDragTarget?.(instance.id);
      }}
      onMouseMove={(event) => {
        if (!isInnermostEventTarget(event)) return;
        onDragSourceChange?.(instance.id);
        onHoverDragTarget?.(instance.id, targetLabel, event);
      }}
      onPointerDown={(event) => {
        if (!isInnermostEventTarget(event)) return;
        onDragSourceChange?.(instance.id);
      }}
      onDrop={(event) => {
        if (!canAcceptDrop) return;
        event.preventDefault();
        event.stopPropagation();
        onDragOverTarget?.(null);
        const plainValue = event.dataTransfer.getData("text/plain");
        const instanceId =
          event.dataTransfer.getData("application/playbook-instance") ||
          (draggingInstanceId === plainValue ? draggingInstanceId : "");
        const kitName =
          event.dataTransfer.getData("application/playbook-kit") ||
          (instanceId ? "" : plainValue);

        if (instanceId) onMoveInstance?.(instanceId, instance.id);
        else if (kitName) onDropKit?.(kitName, instance.id);
      }}
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
