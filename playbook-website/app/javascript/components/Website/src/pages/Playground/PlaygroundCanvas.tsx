import React, { useState } from "react";
import {
  Badge,
  Button,
  Caption,
  Card,
  Flex,
  FullScreen,
  Title,
  Toggle,
} from "playbook-ui";

import {
  CodePanel,
  PlaygroundPreview,
  ResponsivePreviewFrame,
} from "../KitShow/Tabs/Playground";
import { PlaygroundPreviewStage } from "./PlaygroundPreviewStage";
import type { PlaygroundPreviewStageProps } from "./PlaygroundPreviewStage";
import type { BuilderInstance, PlaygroundKit, PropDefinition } from "./types";

type PlaygroundCanvasProps = {
  dragOverTargetId: string | null;
  draggingInstanceId: string | null;
  generatedCode: string;
  generatedPreviewCode: string;
  globalProps?: Record<string, PropDefinition>;
  instanceCount: number;
  instances: BuilderInstance[];
  isSelectMode: boolean;
  kitsByName: Record<string, PlaygroundKit>;
  selectedIds: string[];
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
  onSelect: (id: string, multi?: boolean) => void;
  onToggleSelectMode: (isSelectMode: boolean) => void;
};

export const PlaygroundCanvas = ({
  dragOverTargetId,
  draggingInstanceId,
  generatedCode,
  generatedPreviewCode,
  globalProps,
  instanceCount,
  instances,
  isSelectMode,
  kitsByName,
  selectedIds,
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
  onToggleSelectMode,
}: PlaygroundCanvasProps) => {
  const [isDemoFullscreen, setIsDemoFullscreen] = useState(false);
  const previewStageProps: PlaygroundPreviewStageProps = {
    canDropIntoTarget,
    dragOverTargetId,
    draggingInstanceId,
    globalProps,
    instances,
    isSelectMode,
    kitsByName,
    selectedIds,
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
  };

  return (
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
          <Flex
              align="center"
              gap="xs"
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
          <Flex
              align="center"
              gap="sm"
          >
            <Flex
                align="center"
                className="builder-select-mode-toggle"
                gap="xs"
            >
              <Toggle
                  aria={{ label: "Select kits to wrap" }}
                  checked={isSelectMode}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  onToggleSelectMode(event.target.checked)
                }
              />
              <Caption
                  color="lighter"
                  text="Select kits to wrap"
              />
            </Flex>
            <Button
                icon="expand"
                onClick={() => setIsDemoFullscreen(true)}
                text="Full Screen"
                variant="secondary"
            />
          </Flex>
        </Flex>
        <ResponsivePreviewFrame showDragHint>
          <PlaygroundPreviewStage {...previewStageProps} />
        </ResponsivePreviewFrame>
      </Card>

      <FullScreen
          className={`playground-fullscreen-host ${
          isDemoFullscreen ? "is-open" : ""
        }`}
          contentPadding="md"
          headerText="Playground Demo"
          isFullscreen={isDemoFullscreen}
          onClose={() => setIsDemoFullscreen(false)}
      >
        <div className="playground-fullscreen-layout">
          <Flex
              className="playground-fullscreen-preview"
              minWidth="0"
              orientation="column"
          >
            <PlaygroundPreview code={generatedPreviewCode} />
          </Flex>
          <Flex
              className="playground-fullscreen-code"
              minWidth="0"
              orientation="column"
          >
            <CodePanel code={generatedCode} />
          </Flex>
        </div>
      </FullScreen>

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
};
