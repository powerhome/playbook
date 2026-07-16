import React from "react";
import { Background, Body, Flex, Icon } from "playbook-ui";

import { BuilderPreviewItem } from "./BuilderPreviewItem";
import type { BuilderInstance, PlaygroundKit, PropDefinition } from "./types";
import { ROOT_TARGET_ID } from "./types";

export type PlaygroundPreviewStageProps = {
  dragOverTargetId: string | null;
  draggingInstanceId: string | null;
  globalProps?: Record<string, PropDefinition>;
  instances: BuilderInstance[];
  kitsByName: Record<string, PlaygroundKit>;
  minHeight?: string;
  selectedId: string | null;
  canDropIntoTarget: (targetId: string) => boolean;
  onCanvasClick: () => void;
  onCanvasDragLeave: (event: React.DragEvent<HTMLElement>) => void;
  onCanvasDragOver: (event: React.DragEvent<HTMLElement>) => void;
  onCanvasDrop: (event: React.DragEvent<HTMLElement>) => void;
  onDragEndDrag: () => void;
  onDragOverTarget: (
    targetId: string | null,
    label?: string,
    event?: React.DragEvent<HTMLElement>
  ) => void;
  onDragSourceChange: (sourceElement: HTMLElement | null) => void;
  onDragStartInstance: (id: string) => void;
  onDropKit: (kitName: string, targetId: string) => void;
  onHoverDragTarget: (
    targetId: string,
    label: string,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onLeaveDragTarget: (targetId: string) => void;
  onMoveInstance: (instanceId: string, targetId: string) => void;
  onSelect: (id: string) => void;
};

export const PlaygroundPreviewStage = ({
  canDropIntoTarget,
  dragOverTargetId,
  draggingInstanceId,
  globalProps,
  instances,
  kitsByName,
  minHeight = "360px",
  selectedId,
  onCanvasClick,
  onCanvasDragLeave,
  onCanvasDragOver,
  onCanvasDrop,
  onDragEndDrag,
  onDragOverTarget,
  onDragSourceChange,
  onDragStartInstance,
  onDropKit,
  onHoverDragTarget,
  onLeaveDragTarget,
  onMoveInstance,
  onSelect,
}: PlaygroundPreviewStageProps) => (
  <Background
      backgroundColor="light"
      borderRadius="md"
      className={`builder-stage playground-preview-container ${
      dragOverTargetId === ROOT_TARGET_ID ? "is-drop-target" : ""
    }`}
      display="flex"
      flexDirection="column"
      htmlOptions={{
      onClick: onCanvasClick,
      onDragLeave: onCanvasDragLeave,
      onDragOver: onCanvasDragOver,
      onDrop: onCanvasDrop,
    }}
      maxWidth="100%"
      minHeight={minHeight}
      minWidth="0"
      width="100%"
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
        <Body
            color="light"
            text="Add a kit to start composing."
        />
      </Flex>
    ) : (
      instances.map((instance) => (
        <BuilderPreviewItem
            canDropIntoTarget={canDropIntoTarget}
            dragOverTargetId={dragOverTargetId}
            draggingInstanceId={draggingInstanceId}
            globalProps={globalProps}
            instance={instance}
            isSelected={instance.id === selectedId}
            key={instance.id}
            kitsByName={kitsByName}
            onDragEndDrag={onDragEndDrag}
            onDragOverTarget={onDragOverTarget}
            onDragSourceChange={onDragSourceChange}
            onDragStartInstance={onDragStartInstance}
            onDropKit={(kitName, targetId) => {
            onDragEndDrag();
            onDropKit(kitName, targetId);
          }}
            onHoverDragTarget={onHoverDragTarget}
            onLeaveDragTarget={onLeaveDragTarget}
            onMoveInstance={(instanceId, targetId) => {
            onDragEndDrag();
            onMoveInstance(instanceId, targetId);
          }}
            onSelect={onSelect}
            selectedId={selectedId}
        />
      ))
    )}
  </Background>
);
