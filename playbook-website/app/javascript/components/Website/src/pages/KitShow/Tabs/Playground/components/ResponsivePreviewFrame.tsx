import React, { useRef } from "react";
import {
  Background,
  Button,
  Caption,
  Card,
  Flex,
  Icon,
} from "playbook-ui";

import {
  getBreakpointLabel,
  RESPONSIVE_PREVIEW_PRESETS,
} from "../responsivePreviewUtils";
import { useResponsivePreviewWidth } from "../hooks/useResponsivePreviewWidth";
import { IframePreviewPortal } from "./IframePreviewPortal";
import "./ResponsivePreviewFrame.scss";

type ResponsivePreviewFrameProps = {
  children: React.ReactNode;
  /** When true, shows a note that external drag-and-drop needs full width. */
  showDragHint?: boolean;
};

export const ResponsivePreviewFrame: React.FC<ResponsivePreviewFrameProps> = ({
  children,
  showDragHint = false,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    activePreset,
    customWidth,
    frameWidth,
    isFullWidth,
    resizeHandleProps,
    selectPreset,
  } = useResponsivePreviewWidth({ containerRef: canvasRef });

  const sizeLabel = isFullWidth
    ? "Full width · matches browser"
    : `${frameWidth}px · ${getBreakpointLabel(frameWidth ?? 0)}`;

  const previewContent = isFullWidth ? (
    <Flex className="responsive-preview__content" minWidth="0" width="100%">
      {children}
    </Flex>
  ) : (
    <IframePreviewPortal fillHeight title="Responsive preview">
      <Flex
        className="responsive-preview__content playground-preview-container responsive-preview__content--fill"
        flexDirection="column"
        minWidth="0"
        width="100%"
      >
        {children}
      </Flex>
    </IframePreviewPortal>
  );

  return (
    <Flex
      className="responsive-preview"
      flex="1"
      flexDirection="column"
      minWidth="0"
      width="100%"
    >
      <Flex
        align="center"
        gap="xs"
        justify="between"
        marginBottom="sm"
        wrap
      >
        <>
          {RESPONSIVE_PREVIEW_PRESETS.map((preset) => (
            <Button
              key={preset.id}
              onClick={() => selectPreset(preset.id)}
              size="sm"
              text={preset.label}
              variant={
                customWidth === null && activePreset === preset.id
                  ? "primary"
                  : "secondary"
              }
            />
          ))}
        </>
        <Caption color="lighter" size="xs" text={sizeLabel} />
      </Flex>

      <Background
        backgroundColor="light"
        borderRadius="md"
        className="responsive-preview__canvas"
        htmlOptions={{ ref: canvasRef }}
        padding="md"
        width="100%"
      >
        {isFullWidth ? (
          previewContent
        ) : (
          <Card
            className="responsive-preview__frame"
            flexDirection="column"
            htmlOptions={{
              style: {
                width: `${frameWidth}px`,
                maxWidth: "100%",
                margin: "0 auto",
              },
            }}
            margin="none"
            padding="none"
          >
            <Card.Header headerColor="neutral_subtle" paddingY="xxs">
              <Caption color="lighter" size="xs" text={sizeLabel} />
            </Card.Header>
            <Card.Body className="responsive-preview__body" padding="none">
              {previewContent}
            </Card.Body>
            <div
              aria-label="Resize preview width"
              className="responsive-preview__resize-handle"
              role="separator"
              {...resizeHandleProps}
            >
              <Icon icon="grip-lines-vertical" size="xs" />
            </div>
          </Card>
        )}
      </Background>

      {showDragHint && !isFullWidth && (
        <Caption
          color="lighter"
          marginTop="xs"
          size="xs"
          text="Drag-and-drop from Add Kits works in Full width mode. Use click to add kits at other sizes."
        />
      )}
    </Flex>
  );
};
