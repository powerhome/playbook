import React from "react";
import { Background, Badge, Body, Card, Flex, Icon, Title } from "playbook-ui";

import { CodePanel, ResponsivePreviewFrame } from "../KitShow/Tabs/Playground";
import { BuilderPreviewItem } from "./BuilderPreviewItem";
import type { BuilderInstance, PlaygroundKit, PropDefinition } from "./types";
import { ROOT_TARGET_ID } from "./types";

type PlaygroundCanvasProps = {
  dragOverTargetId: string | null;
  draggingInstanceId: string | null;
  generatedCode: string;
  globalProps?: Record<string, PropDefinition>;
  instanceCount: number;
  instances: BuilderInstance[];
  kitsByName: Record<string, PlaygroundKit>;
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

export const PlaygroundCanvas = ({
  dragOverTargetId,
  draggingInstanceId,
  generatedCode,
  globalProps,
  instanceCount,
  instances,
  kitsByName,
  selectedId,
  canDropIntoTarget,
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
}: PlaygroundCanvasProps) => (
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
      <Flex
          align="center"
          justify="between"
          marginBottom="md"
      >
        <Title
            size={3}
            text="Demo"
        />
        <Badge
            text={`${instanceCount} kits`}
            variant="primary"
        />
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
            onClick: onCanvasClick,
            onDragLeave: onCanvasDragLeave,
            onDragOver: onCanvasDragOver,
            onDrop: onCanvasDrop,
          }}
            maxWidth="100%"
            minHeight="360px"
            minWidth="0"
            padding="sm"
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
);
